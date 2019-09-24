export type FileMetadata = {
  filename: string;
};

export default interface IStorageService {
  readFile(filename: string): Promise<Buffer>;
  writeFile(path: string, filename: string): Promise<Buffer>;
  listFiles(): Promise<FileMetadata[]>;
}
