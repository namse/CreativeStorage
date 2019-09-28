import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

export default class FileManager implements IFileManager {
  public getDownloadUrl(filename: string): Promise<string> {
    return new Promise((resolve, rejcet) => {});
  }
  public uploadFile(filename: string, file: Blob): Promise<void> {
    return new Promise((resolve, rejcet) => {});
  }
  public async getFileMetadataList(): Promise<FileMetadata[]> {
    const response = await fetch("http://localhost:4002/filemetadatalist");
    const fileMetadataList = await response.json();
    return fileMetadataList;
  }
}
