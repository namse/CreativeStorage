import IFileManager from "./IFileManager";

export default abstract class BaseFileManager implements IFileManager {
  abstract startDownloadFile(filename: string);
  abstract uploadFile(filename: string, file: File);
  abstract getFileMetadataList();

  protected letBrowserStartDownload(filename: string, url: string): void {
    const link = document.createElement("a");

    link.download = filename;
    link.href = url;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }
}
