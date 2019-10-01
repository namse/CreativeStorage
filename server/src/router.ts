import StorageService from "./storageService";
import FileApiRouter from "./FileApiRouter";
import compose from "koa-compose";
import Koa from "koa";

const storageService = new StorageService();
const fileApiRouter = new FileApiRouter(storageService);

fileApiRouter.router.get("/fileMetadataList", (ctx: Koa.Context) => fileApiRouter.listFiles(ctx));
fileApiRouter.router.post("/uploadFile", (ctx: Koa.Context) => fileApiRouter.writeFile(ctx));
fileApiRouter.router.get("/downloadFile", (ctx: Koa.Context) => fileApiRouter.readFile(ctx));

const router = compose([
  fileApiRouter.router.routes(),
  fileApiRouter.router.allowedMethods(),
]);

export default router;
