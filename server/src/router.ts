import StorageService from "./storageService";
import FileApiRouter from "./FileApiRouter";
import compose from "koa-compose";
import Koa from "koa";
import S3minioRouter from "./S3minioRouter";
import MinioS3 from "./MinioS3";

const storageService = new StorageService();
const fileApiRouter = new FileApiRouter(storageService);

fileApiRouter.router.get("/fileMetadataList", (ctx: Koa.Context) => fileApiRouter.listFiles(ctx));
fileApiRouter.router.post("/uploadFile", (ctx: Koa.Context) => fileApiRouter.writeFile(ctx));
fileApiRouter.router.get("/downloadFile", (ctx: Koa.Context) => fileApiRouter.readFile(ctx));

const minioS3 = new MinioS3();
const s3minioRouter = new S3minioRouter(minioS3);

s3minioRouter.router.get("/s3FileMetadataList", (ctx: Koa.Context) => s3minioRouter.listFiles(ctx));
s3minioRouter.router.get("/s3UploadFileUrl", (ctx: Koa.Context) => s3minioRouter.writeFile(ctx));
s3minioRouter.router.get("/s3DownloadFileUrl", (ctx: Koa.Context) => s3minioRouter.readFile(ctx));

const router = compose([
  fileApiRouter.router.routes(),
  fileApiRouter.router.allowedMethods(),
  s3minioRouter.router.routes(),
  s3minioRouter.router.allowedMethods(),
]);

export default router;
