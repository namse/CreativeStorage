import Koa from "koa";
import compose from "koa-compose";
import StorageService from "./storageService";
import FileApiRouter from "./FileApiRouter";
import serverlessRouter from "./testRouter";

const storageService = new StorageService();
const fileApiRouter = new FileApiRouter(storageService);

fileApiRouter.router.get("/fileMetadataList", (ctx: Koa.Context) => fileApiRouter.listFiles(ctx));
fileApiRouter.router.post("/uploadFile", (ctx: Koa.Context) => fileApiRouter.writeFile(ctx));
fileApiRouter.router.get("/downloadFile", (ctx: Koa.Context) => fileApiRouter.readFile(ctx));

const router = compose([
  fileApiRouter.router.routes(),
  fileApiRouter.router.allowedMethods(),
  serverlessRouter.routes(),
  serverlessRouter.allowedMethods(),
]);

export default router;
