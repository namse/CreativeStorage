export type FileMetadata = {
  key: string;
  lastModified?: Date;
  eTag?: string;
  size?: number;
  storageClass?: string;
  owner?: {
    displayName?: string;
    id?: string;
  };
};

export default interface IFileManager {
  getDownloadUrl(filename: string): Promise<string>;
  uploadFile(files: File): Promise<void>;
  getFileMetadataList(): Promise<FileMetadata[]>;
  deleteFile(filename: string): Promise<void>;
}
