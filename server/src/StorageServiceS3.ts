import ICloudStorageService from "./ICloudStorageService";
import { s3 } from "./index";
import { S3 } from "aws-sdk";

export default class StorageServiceS3 implements ICloudStorageService {
  public readFile(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const params = { Bucket: "testbucket", Key: filename, Expires: 60 };
      const presignedUrl: string = s3.getSignedUrl("getObject", params);
      resolve(presignedUrl);
    });
  }

  public writeFile(
    filename: string,
    contentType: string,
  ): Promise<S3.PresignedPost> {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: "testbucket",
        Fields: {
          Key: filename,
          "Content-Type": contentType,
        },
        Expires: 60,
      };
      s3.createPresignedPost(params, (err, presignedUrl) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(presignedUrl);
      });
    });
  }

  public listFiles(): Promise<S3.ListObjectsV2Output> {
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
        resolve(data);
      });
    });
  }
}
