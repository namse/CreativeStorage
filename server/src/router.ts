import Koa from "koa";
import RouterS3 from "./RouterS3";
import ICloudStorageService from "./ICloudStorageService";

export default function CreateRouter(
  app: Koa,
  storageService: ICloudStorageService,
): void {
  const routerS3 = new RouterS3(storageService);

  routerS3.router.get("/filemetadatalist", (ctx: Koa.Context) =>
    routerS3.getFileMetadataList(ctx),
  );
  routerS3.router.get("/uploadfileurl", (ctx: Koa.Context) =>
    routerS3.getUploadFileUrl(ctx),
  );
  routerS3.router.get("/downloadfileurl", (ctx: Koa.Context) =>
    routerS3.getDownloadFileUrl(ctx),
  );

  app.use(routerS3.router.routes());
  app.use(routerS3.router.allowedMethods());
}
