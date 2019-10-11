import IStorageService, {
  preSignedPostData,
  fileMetadata,
  LifecycleRule,
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
    const params: AWS.S3.ListObjectsV2Request = {
      Bucket: envModule.AWS_BUCKETNAME,
      MaxKeys: 1000,
    };

    const data = await s3.listObjectsV2(params).promise();
    const returnDataList: fileMetadata[] = [];

    if (data.Contents !== undefined) {
      data.Contents.forEach((content, index) => {
        returnDataList[index] = { owner: { displayName: "", id: "" } };
        returnDataList[index].eTag = content.ETag;
        returnDataList[index].key = content.Key;
        returnDataList[index].lastModified = content.LastModified;
        if (
          content.Owner !== undefined &&
          returnDataList[index].owner !== undefined
        ) {
          returnDataList[index].owner.displayName = content.Owner.DisplayName;
          returnDataList[index].owner.id = content.Owner.ID;
        }
        returnDataList[index].size = content.Size;
        returnDataList[index].storageClass = content.StorageClass;
      });
    }

    return returnDataList;
  }

  public async putBucketLifecycleConfiguration(days: string) {
    const params: AWS.S3.PutBucketLifecycleConfigurationRequest = {
      Bucket: envModule.AWS_BUCKETNAME,
      LifecycleConfiguration: {
        Rules: [ /* required */
          {
            Prefix: "",
            Status: "Enabled",
            Expiration: {
              Days: 3560,
            },
            ID: "S3toDEEP_ARCHIVE",
            Transitions: [
              {
                Days: +days,
                StorageClass: "DEEP_ARCHIVE",
              },
            ],
          },
        ],
      },
    };

    const putObjectPromise = await s3.putBucketLifecycleConfiguration(params).promise();
    console.log(putObjectPromise);
    return putObjectPromise;
  }

  public async getBucketLifecycleConfiguration(): Promise<LifecycleRule | undefined> {

    const params: AWS.S3.GetBucketLifecycleConfigurationRequest = {
      Bucket: envModule.AWS_BUCKETNAME,
    };

    const getBucketLifecycleConfiguration = await s3.getBucketLifecycleConfiguration(params).promise();
    const data = getBucketLifecycleConfiguration.$response.data;

    let lifeCycle: LifecycleRule | undefined = {};
    if (data !== undefined) {
      const Rules: LifecycleRule[] | undefined = data.Rules;

      if (Rules !== undefined) {
        lifeCycle = Rules[0];
      }
    }
    return lifeCycle;
  }
}
