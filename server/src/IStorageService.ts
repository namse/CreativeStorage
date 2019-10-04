export type preSingnedPostData = {
  url: string;
  fields: {
    [index: string]: string;
  };
};
export default interface ICloudStorageService {
  getDownloadFileUrl(filename: string): string;
  getUploadPresginedPostData(
    filename: string,
    contentType: string,
  ): preSingnedPostData;
  getFileMetadataList(): Promise<object[]>;
}
