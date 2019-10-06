export type FileMetadata = {
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

export default interface IFileManager {
  getDownloadUrl(filename: string): Promise<string>;
  uploadFile(files: File): Promise<void>;
  getFileMetadataList(): Promise<FileMetadata[]>;
}
