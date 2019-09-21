export type FileMetadata = {
  filename: string;
};

export default interface IFileManager {
  getDownloadUrl(filename: string): Promise<string>;
  uploadFile(filename: string, file: Blob): Promise<void>;
  getFileMetadataList(): Promise<FileMetadata[]>;
}
