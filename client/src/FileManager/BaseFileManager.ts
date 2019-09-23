import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

export default abstract class BaseFileManager implements IFileManager {
  public abstract getDownloadUrl(filename: string): Promise<string>;
  public abstract uploadFile(filename: string, file: Blob): Promise<void>;
  public abstract getFileMetadataList(): Promise<FileMetadata[]>;

  protected letBrowserStartDownload(filename: string, url: string): void {
    const link = document.createElement("a");

    link.download = filename;
    link.href = url;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }
}
