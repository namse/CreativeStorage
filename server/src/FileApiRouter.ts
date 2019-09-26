import Koa from "koa";
import IStorageService from "./IStorageService";

class FileApiRouter {
  public listFiles: any;
  public writeFile: any;
  public readFile: any;

  constructor(storageService: IStorageService) {
    this.listFiles = async (ctx: Koa.Context) => {
      ctx.body = await storageService.listFiles();
      ctx.status = 200;
    };

    this.writeFile = async (ctx: Koa.Context) => {
      if (!ctx.request.files || !ctx.request.files.file) {
        ctx.status = 400;
        ctx.body = "request has no file";
        return;
      }
      const { path, name } = ctx.request.files.file;
      await storageService.writeFile(path, name);
      ctx.status = 200;
    };

    this.readFile = async (ctx: Koa.Context) => {
      ctx.body = await storageService.readFile(ctx.request.query.filename);
      ctx.status = 200;
    };
  }
}

export default FileApiRouter;
