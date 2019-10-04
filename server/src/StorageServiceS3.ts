import IStorageService, { preSingnedPostData } from "./IStorageService";
import { s3 } from "./index";

export default class StorageService implements IStorageService {
  public getDownloadFileUrl(filename: string): string {
    const params = { Bucket: "testbucket", Key: filename, Expires: 60 };
    const presignedUrl: string = s3.getSignedUrl("getObject", params);
    return presignedUrl;
  }

  public getUploadPresginedPostData(
    filename: string,
    contentType: string,
  ): preSingnedPostData {
    const params = {
      Bucket: "testbucket",
      Fields: {
        "Key": filename,
        "Content-Type": contentType,
      },
      Expires: 60,
    };
    const presignedPostData = s3.createPresignedPost(params);
    return presignedPostData;
  }

  public getFileMetadataList(): Promise<object[]> {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: "testbucket",
        MaxKeys: 1000,
      };
      s3.listObjectsV2(params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data.Contents);
      });
    });
  }
}
