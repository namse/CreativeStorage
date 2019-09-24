import Koa from "koa";
import Router from "koa-router";
import StorageClass from "./storageClass";

const router = new Router();
const storageClass = new StorageClass();

router.get("/fileMetadataList", async (ctx: Koa.Context, next) => {
  ctx.body = await storageClass.listFile();
  ctx.status = 200;
});

router.post("/uploadFile", async (ctx: Koa.Context, next) => {
  if (!ctx.request.files || !ctx.request.files.file) {
    ctx.status = 400;
    ctx.body = "request has no file";
    return;
  }
  const { path, name } = ctx.request.files.file;
  await storageClass.renameFile(path, name);
  ctx.status = 200;
});

router.get("/downloadFile", async (ctx: Koa.Context, next) => {
  ctx.body = await storageClass.readFile(ctx.request.query.filename);
  ctx.status = 200;
});

export default router;
