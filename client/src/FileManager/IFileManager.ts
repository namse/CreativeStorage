export default interface IFileManager {
  startDownloadFile(filename: string): any;
  uploadFile(filename: string, file: Blob): Promise<void>;
}
