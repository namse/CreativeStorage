import ICloudStorageService from "./ICloudStorageService";
import { s3 } from "./index";

export default class StorageServiceS3 implements ICloudStorageService {
  public getDownloadFileUrl(filename: string): string {
    const params = { Bucket: "testbucket", Key: filename, Expires: 60 };
    const presignedUrl: string = s3.getSignedUrl("getObject", params);
    return presignedUrl;
  }

  public getUploadFileUrl(filename: string, contentType: string): object {
    const params = {
      Bucket: "testbucket",
      Fields: {
        "Key": filename,
        "Content-Type": contentType,
      },
      Expires: 60,
    };
    const presignedUrl = s3.createPresignedPost(params);
    return (presignedUrl as any) as object;
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
        resolve((data.Contents as any) as object[]);
      });
    });
  }
}
