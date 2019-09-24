import Koa from "koa";
import Router from "koa-router";
import StorageService from "./storageService";

const router = new Router();
const storageService = new StorageService();

router.get("/fileMetadataList", async (ctx: Koa.Context, next) => {
  ctx.body = await storageService.listFiles();
  ctx.status = 200;
});

router.post("/uploadFile", async (ctx: Koa.Context, next) => {
  if (!ctx.request.files || !ctx.request.files.file) {
    ctx.status = 400;
    ctx.body = "request has no file";
    return;
  }
  const { path, name } = ctx.request.files.file;
  await storageService.writeFile(path, name);
  ctx.status = 200;
});

router.get("/downloadFile", async (ctx: Koa.Context, next) => {
  ctx.body = await storageService.readFile(ctx.request.query.filename);
  ctx.status = 200;
});

export default router;
