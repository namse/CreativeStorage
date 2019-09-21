import Koa from "koa";
import Router from "koa-router";
import fs from "fs";

const router = new Router();

function readFile(filename: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/uploads/${filename}`, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

function renameFile(path: string, filename: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.rename(path, `${__dirname}/uploads/${filename}`, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

type FileMetadata = {
  filename: string,
};

function listFile(): Promise<FileMetadata[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(`${__dirname}/uploads/`, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const fileMetadataList: FileMetadata[] = data.map((value) => {
        const fileMetadata: FileMetadata = { filename: value };
        return fileMetadata;
      });
      resolve(fileMetadataList);
    });
  });
}

router.get("/fileMetadataList", async (ctx: Koa.Context, next) => {
  ctx.body = await listFile();
  ctx.status = 200;
});

router.post("/uploadFile", async (ctx: Koa.Context, next) => {
  if (!ctx.request.files || !ctx.request.files.file) {
    ctx.status = 400;
    ctx.body = "request has no file";
    return;
  }
  const { path, name } = ctx.request.files.file;
  await renameFile(path, name);
  ctx.status = 200;
});

router.get("/downloadFile", async (ctx: Koa.Context, next) => {
  ctx.body = await readFile(ctx.request.query.filename);
  ctx.status = 200;
});

export default router;
