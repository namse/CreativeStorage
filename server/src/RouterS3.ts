import Koa from "koa";
import Router from "./RouterClass";
import ICloudStorageService from "./ICloudStorageService";

export default class RouterS3 extends Router {
  constructor(private readonly storageService: ICloudStorageService) {
    super();
  }

  public async getFileMetadataList(ctx: Koa.Context) {
    ctx.body = await this.storageService.getFileMetadataList();
    ctx.status = 200;
  }

  public getUploadFileUrl(ctx: Koa.Context) {
    ctx.body = this.storageService.getUploadFileUrl(
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
