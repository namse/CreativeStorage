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

  public getPresginedPostDataForUpload(ctx: Koa.Context) {
    ctx.body = this.storageService.getPresginedPostDataForUpload(
      ctx.request.query.filename,
      ctx.request.query.contentType,
    );
    ctx.status = 200;
  }

  public getUrlForDownloadFile(ctx: Koa.Context) {
    ctx.body = this.storageService.getUrlForDownloadFile(
      ctx.request.query.filename,
    );
    ctx.status = 200;
  }

  public getUrlForDeleteFile(ctx: Koa.Context) {
    ctx.body = this.storageService.getUrlForDeleteFile(
      ctx.request.query.filename,
    );
    ctx.status = 200;
  }

  public putBucketLifecycleConfiguration(ctx: Koa.Context) {
    ctx.body = this.storageService.putBucketLifecycleConfiguration(
      ctx.request.query.days,
    );
    ctx.status = 200;
  }
}
