export type preSignedPostData = {
  url: string;
  fields: {
    [index: string]: string;
  };
};

export type fileMetadata = {
  Key?: string;
  LastModified?: Date;
  ETag?: string;
  Size?: number;
  StorageClass?: string;
  Owner?: {
    DisplayName?: string;
    ID?: string;
  };
};

export default interface IStorageService {
  getUrlForDownloadFile(filename: string): string;
  getUrlForDeleteFile(filename: string): string;
  getPresginedPostDataForUpload(
    filename: string,
    contentType: string,
  ): preSignedPostData;
  getFileMetadataList(): Promise<fileMetadata[]>;
}
