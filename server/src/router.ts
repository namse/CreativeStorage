import Router from "koa-router";
import fs from "fs";
import { Context } from "koa";
import { Files } from "formidable";

const router = new Router();

(() => {
  return new Promise((resolve, reject) => {
    fs.mkdir(`${__dirname}/temp`, (err) => {
      if (!err || err.code === "EEXIST") {
        return Promise.resolve();
      } else {
        return Promise.reject(err);
      }
    });
  });
})();

(() => {
  return new Promise((resolve, reject) => {
    fs.mkdir(`${__dirname}/uploads`, (err) => {
      if (!err || err.code === "EEXIST") {
        return Promise.resolve();
      } else {
        return Promise.reject(err);
      }
    });
  });
})();

const readFile = (filename: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/temp/${filename}`, (err, data) => {
      if (err) {
         reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const renameFile = (path: string, name: string) => {
  return new Promise((resolve, reject) => {
    fs.rename(path, `${__dirname}/temp/${name}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

router.post("/uploadFile", async (ctx: Context) => {
  try {
    if (ctx.request.files) {
      console.log(ctx.request.files);
      await renameFile(ctx.request.files.file.path, ctx.request.files.file.name);
      ctx.status = 200;
      ctx.body = "uploadFile";
    }
  } catch (e) {
    console.error(e);
    ctx.status = 500;
  }
});

router.get("/downloadFile", async (ctx: Context) => {
    try {
      ctx.body = await readFile(ctx.request.query.filename);
      ctx.status = 200;
    } catch (e) {
      console.error(e);
      ctx.status = 500;
    }

});

router.get("/", async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = "root path";
});

export default router;
