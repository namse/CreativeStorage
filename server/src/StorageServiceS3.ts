import IStorageService, {
  preSignedPostData,
  fileMetadata,
  parameterForSDKMethod,
} from "./IStorageService";
import AWS from "aws-sdk";
import { envModule } from "../.env";

export const s3 = new AWS.S3({
  accessKeyId: envModule.AWS_ACCESS_KEY,
  secretAccessKey: envModule.AWS_SECRET_ACCESS_KEY,
  endpoint: envModule.AWS_S3_BUCKET_ENDPOINT,
  // s3ForcePathStyle: true, // needed with minio
  signatureVersion: "v4",
});

const params: parameterForSDKMethod = {
  Bucket: "testbucket-creativstorage",
  region: "ap-northeast-2",
};

export default class StorageService implements IStorageService {
  public getUrlForDownloadFile(filename: string): string {
    params.Key = filename;
    params.Expires = 3600;
    params.ResponseContentDisposition = "attatchment";
    const presignedUrl: string = s3.getSignedUrl("getObject", params);
    return presignedUrl;
  }

  public getUrlForDeleteFile(filename: string): string {
    params.Key = filename;
    params.Expires = 3600;
    const presignedUrl: string = s3.getSignedUrl("deleteObject", params);
    return presignedUrl;
  }

  public getPresginedPostDataForUpload(
    filename: string,
    contentType: string,
  ): preSignedPostData {
    params.Fields = {
      "Key": filename,
      "Content-Type": contentType,
    };
    params.Expires = 3600;
    const presignedPostData = s3.createPresignedPost(params);
    return presignedPostData;
  }

  public getFileMetadataList(): Promise<fileMetadata[]> {
    return new Promise((resolve, reject) => {
      params.MaxKeys = 1000;
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
