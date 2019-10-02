import StorageService from "./StorageService";
import RouterFileAPI from "./RouterFileAPI";
import compose from "koa-compose";
import Koa from "koa";
import RouterS3 from "./RouterS3";
import StorageServiceS3 from "./StorageServiceS3";

const storageService = new StorageService();
const routerFileAPI = new RouterFileAPI(storageService);

routerFileAPI.router.get("/fileMetadataList", (ctx: Koa.Context) =>
  routerFileAPI.listFiles(ctx),
);
routerFileAPI.router.post("/uploadFile", (ctx: Koa.Context) =>
  routerFileAPI.writeFile(ctx),
);
routerFileAPI.router.get("/downloadFile", (ctx: Koa.Context) =>
  routerFileAPI.readFile(ctx),
);

const storageServiceS3 = new StorageServiceS3();
const routerS3 = new RouterS3(storageServiceS3);

// routerS3.router.all("/s3", (ctx: Koa. Context) => );

routerS3.router.get("FileMetadataList", (ctx: Koa.Context) =>
  routerS3.listFiles(ctx),
);
routerS3.router.get("/s3UploadFileUrl", (ctx: Koa.Context) =>
  routerS3.writeFile(ctx),
);
routerS3.router.get("/s3DownloadFileUrl", (ctx: Koa.Context) =>
  routerS3.readFile(ctx),
);
const router = compose([
  routerFileAPI.router.routes(),
  routerFileAPI.router.allowedMethods(),
  routerS3.router.routes(),
  routerS3.router.allowedMethods(),
]);

export default router;
