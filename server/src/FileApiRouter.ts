import Koa from "koa";
import IStorageService from "./IStorageService";

class FileApiRouter {
  private storageService: IStorageService;

  constructor(storageService: IStorageService) {
    this.storageService = storageService;
  }

  public async listFiles(ctx: Koa.Context) {
    console.log("리스트파일");
    ctx.body = await this.storageService.listFiles();
    ctx.status = 200;
  }

  public async writeFile(ctx: Koa.Context) {
    console.log("라이트파일");
    if (!ctx.request.files || !ctx.request.files.file) {
      ctx.status = 400;
      ctx.body = "request has no file";
      return;
    }
    const { path, name } = ctx.request.files.file;
    await this.storageService.writeFile(path, name);
    ctx.status = 200;
  }

  public async readFile(ctx: Koa.Context) {
    console.log("리드파일");
    ctx.body = await this.storageService.readFile(ctx.request.query.filename);
    ctx.status = 200;
  }
}

export default FileApiRouter;
