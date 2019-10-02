import Koa from "koa";
import Router from "./RouterClass";
import IMinioS3 from "./IMinioS3";

export default class S3minioRouter extends Router {
  constructor(private readonly storageService: IMinioS3) {
    super();
  }

  public async listFiles(ctx: Koa.Context) {
    ctx.body = await this.storageService.listFiles();
    ctx.status = 200;
  }

  public async writeFile(ctx: Koa.Context) {
    ctx.body = await this.storageService.writeFile(ctx.request.query.filename, ctx.request.query.contentType);
    ctx.status = 200;
  }

  public async readFile(ctx: Koa.Context) {
    console.log("filename: ", ctx.request.query.filename);
    ctx.body = await this.storageService.readFile(ctx.request.query.filename);
    ctx.status = 200;
  }
}
