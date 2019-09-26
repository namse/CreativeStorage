import StorageService from "./storageService";
import FileApiRouter from "./FileApiRouter";

const storageService = new StorageService();
const fileApiRouter = new FileApiRouter(storageService);

fileApiRouter.router.get("/fileMetadataList", fileApiRouter.listFiles);
fileApiRouter.router.post("/uploadFile", fileApiRouter.writeFile);
fileApiRouter.router.get("/downloadFile", fileApiRouter.readFile);

export { fileApiRouter };
