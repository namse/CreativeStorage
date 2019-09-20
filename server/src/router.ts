import Koa from "koa";
import Router from "koa-router";
import * as fs from "fs";

const router = new Router();

function readFile(filename: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/uploads/${filename}`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function renameFile(path: string, filename: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.rename(path, `${__dirname}/uploads/${filename}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

router.post("/uploadFile", async (ctx: Koa.Context, next) => {
  if (ctx.request.files) {
    await renameFile(ctx.request.files.file.path, ctx.request.files.file.name);
  }
  ctx.status = 200;
});

router.get("/downloadFile", async (ctx: Koa.Context, next) => {
  ctx.body = await readFile(ctx.request.query.filename);
  ctx.status = 200;
});

export default router;
