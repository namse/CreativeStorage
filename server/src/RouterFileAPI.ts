import Koa from "koa";
import IStorageService from "./IStorageService";
import Router from "./RouterClass";

export default class RouterFileAPI extends Router {
  constructor(private readonly storageService: IStorageService) {
    super();
  }

  public async listFiles(ctx: Koa.Context) {
    ctx.body = await this.storageService.listFiles();
    ctx.status = 200;
  }

  public async writeFile(ctx: Koa.Context) {
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
    ctx.body = await this.storageService.readFile(ctx.request.query.filename);
    ctx.status = 200;
  }
}
