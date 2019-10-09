import Koa from "koa";
import Controller from "./Controller";
import IStorageService from "./IStorageService";

export default function applyRouter(
  app: Koa,
  storageService: IStorageService,
): void {
  const controller = new Controller(storageService);

  controller.router.get("/filemetadatalist", (ctx: Koa.Context) =>
    controller.getFileMetadataList(ctx),
  );
  controller.router.get("/uploadfileurl", (ctx: Koa.Context) =>
    controller.getPresginedPostDataForUpload(ctx),
  );
  controller.router.get("/downloadfileurl", (ctx: Koa.Context) =>
    controller.getUrlForDownloadFile(ctx),
  );
  controller.router.get("/deletefileurl", (ctx: Koa.Context) =>
    controller.getUrlForDeleteFile(ctx),
  );
  controller.router.get("/", (ctx, next) => {
    ctx.status = 200;
  });

  app.use(controller.router.routes());
  app.use(controller.router.allowedMethods());
}
