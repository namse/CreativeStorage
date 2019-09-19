import Koa from "koa";
import Router from "koa-router";
import * as fs from "fs";

const router = new Router();

const readFile = (filename: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/uploads/${filename}`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const renameFile = (path: string, filename: string) => {
  return new Promise((resolve, reject) => {
    fs.rename(path, `${__dirname}/uploads/${filename}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const getFileList = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(`${__dirname}/uploads/`, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

router.post("/uploadFile", async (ctx: Koa.Context, next) => {
  try {
    await renameFile(ctx.request.files.file.path, ctx.request.files.file.name);
    ctx.status = 200;
  } catch (err) {
    console.log(err.message);
    ctx.status = 500;
  }
});

router.get("/downloadFile/:id", async (ctx: Koa.Context, next) => {
  try {
    const filename = await ctx.params.id;
    ctx.body = await readFile(filename);
    ctx.status = 200;
  } catch (err) {
    console.log(err.message);
    ctx.status = 500;
  }
});

router.get("/getFileIdList", async (ctx: Koa.Context, next) => {
  try {
    ctx.body = await getFileList();
    console.log("ctx.body, which is filelist array: ", ctx.body);
    ctx.status = 200;
  } catch (err) {
    console.log(err.message);
    ctx.status = 500;
  }
});

export default router;
