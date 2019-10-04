import compose from "koa-compose";
import Koa from "koa";
import RouterS3 from "./RouterS3";
import StorageServiceS3 from "./StorageServiceS3";

const storageServiceS3 = new StorageServiceS3();
const routerS3 = new RouterS3(storageServiceS3);

routerS3.router.get("/filemetadatalist", (ctx: Koa.Context) =>
  routerS3.getFileMetadataList(ctx),
);
routerS3.router.get("/uploadfileurl", (ctx: Koa.Context) =>
  routerS3.getUploadFileUrl(ctx),
);
routerS3.router.get("/downloadfileurl", (ctx: Koa.Context) =>
  routerS3.getDownloadFileUrl(ctx),
);

const router = compose([
  routerS3.router.routes(),
  routerS3.router.allowedMethods(),
]);

export default router;
