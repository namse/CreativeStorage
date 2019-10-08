export type preSignedPostData = {
  url: string;
  fields: {
    [index: string]: string;
  };
};

export type fileMetadata = {
  key?: string;
  lastModified?: Date;
  eTag?: string;
  size?: number;
  storageClass?: string;
  owner: {
    displayName?: string;
    id?: string;
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
