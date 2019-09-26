import Koa from "koa";
import IStorageService from "./IStorageService";
import { Router } from "./RouterClass";

class FileApiRouter extends Router {
  constructor(private readonly storageService: IStorageService) {
    super();
    this.storageService = storageService;

    this.listFiles = this.listFiles.bind(this);
    this.writeFile = this.writeFile.bind(this);
    this.readFile = this.readFile.bind(this);
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

export default FileApiRouter;
