import Koa from "koa";
import Controller from "./Controller";
import IStorageService from "./IStorageService";

export default function ApplyRouter(
  app: Koa,
  storageService: IStorageService,
): void {
  const controller = new Controller(storageService);

  controller.router.get("/filemetadatalist", (ctx: Koa.Context) =>
    controller.getFileMetadataList(ctx),
  );
  controller.router.get("/uploadfileurl", (ctx: Koa.Context) =>
    controller.getUploadFileUrl(ctx),
  );
  controller.router.get("/downloadfileurl", (ctx: Koa.Context) =>
    controller.getDownloadFileUrl(ctx),
  );

  app.use(controller.router.routes());
  app.use(controller.router.allowedMethods());
}
