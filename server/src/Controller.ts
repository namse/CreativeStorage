import Koa from "koa";
import Router from "./RouterClass";
import IStorageService from "./IStorageService";

export default class Controller extends Router {
  constructor(private readonly storageService: IStorageService) {
    super();
  }

  public async getFileMetadataList(ctx: Koa.Context) {
    ctx.body = await this.storageService.getFileMetadataList();
    ctx.status = 200;
  }

  public getUploadFileUrl(ctx: Koa.Context) {
    ctx.body = this.storageService.getUploadPresginedPostData(
      ctx.request.query.filename,
      ctx.request.query.contentType,
    );
    ctx.status = 200;
  }

  public getDownloadFileUrl(ctx: Koa.Context) {
    ctx.body = this.storageService.getDownloadFileUrl(
      ctx.request.query.filename,
    );
    ctx.status = 200;
  }
}
