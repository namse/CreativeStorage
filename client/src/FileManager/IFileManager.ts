export type FileMetadata = {
  filename: string;
};

export default interface IFileManager {
  getDownloadUrl(filename: string): Promise<string>;
  uploadFiles(files: File[]): Promise<void>;
  getFileMetadataList(): Promise<FileMetadata[]>;
}
