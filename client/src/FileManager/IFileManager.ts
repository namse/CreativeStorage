export default interface IFileManager {
  uploadFile(filename: string, file: File): Promise<void>;
  startDownloadFile(filename: string): any;
}
