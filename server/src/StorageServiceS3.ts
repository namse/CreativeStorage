import IStorageService, {
  preSignedPostData,
  fileMetadata,
} from "./IStorageService";
import AWS from "aws-sdk";
import { envModule } from "./config/.env";

const s3 = new AWS.S3({
  accessKeyId: envModule.AWS_ACCESS_KEY,
  secretAccessKey: envModule.AWS_SECRET_ACCESS_KEY,
  // endpoint: envModule.AWS_S3_BUCKET_ENDPOINT, // why doesn't need option-endpoint
  region: envModule.AWS_REGION,
  signatureVersion: "v4",
});

export default class StorageService implements IStorageService {
  public getUrlForDownloadFile(filename: string): string {
    const params = {
      Bucket: envModule.AWS_BUCKETNAME,
      Key: filename,
      Expires: 60,
      ResponseContentDisposition: "attatchment",
    };

    const presignedUrl: string = s3.getSignedUrl("getObject", params);
    return presignedUrl;
  }

  public getUrlForDeleteFile(filename: string): string {
    const params = {
      Bucket: envModule.AWS_BUCKETNAME,
      Key: filename,
      Expires: 60,
    };
    const presignedUrl: string = s3.getSignedUrl("deleteObject", params);
    return presignedUrl;
  }

  public getPresginedPostDataForUpload(
    filename: string,
    contentType: string,
  ): preSignedPostData {
    const params = {
      Bucket: envModule.AWS_BUCKETNAME,
      Key: filename,
      Expires: 60,
      Fields: {
        "Key": filename,
        "Content-Type": contentType,
      },
    };

    const presignedPostData = s3.createPresignedPost(params);
    return presignedPostData;
  }

  public async getFileMetadataList(): Promise<fileMetadata[]> {
    const params = {
      Bucket: envModule.AWS_BUCKETNAME,
      MaxKeys: 1000,
    };
    return new Promise((resolve, reject) => {
      s3.listObjectsV2(params as AWS.S3.ListObjectsV2Request, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data.Contents);
      });
    });
  }
}
