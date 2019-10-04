export default interface ICloudStorageService {
  getDownloadFileUrl(filename: string): string;
  getUploadFileUrl(filename: string, contentType: string): object;
  getFileMetadataList(): Promise<object[]>;
}
