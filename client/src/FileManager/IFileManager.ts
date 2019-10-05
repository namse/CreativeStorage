export type FileMetadata = {
  Key: string;
};

export default interface IFileManager {
  getDownloadUrl(filename: string): Promise<string>;
  uploadFile(files: File): Promise<void>;
  getFileMetadataList(): Promise<FileMetadata[]>;
}
