import KoaRouter from "koa-router";
import StorageService from "./storageService";
import FileApiRouter from "./FileApiRouter";

const router = new KoaRouter();
const storageService = new StorageService();
const fileApiRouter = new FileApiRouter(storageService);

router.get("/fileMetadataList", fileApiRouter.listFiles);
router.post("/uploadFile", fileApiRouter.writeFile);
router.get("/downloadFile", fileApiRouter.readFile);

export default router;
