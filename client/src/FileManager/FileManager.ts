import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

export default class FileManager implements IFileManager {
  public async getDownloadUrl(filename: string): Promise<string> {
    const response = await fetch(
      `http://localhost:4002/downloadfile?filename=${filename}`,
    );
    const file = await response.blob();

    const dataUrl = await this.convertFileToDataUrl(file);

    return dataUrl;
  }

  public async uploadFile(file: File): Promise<void> {
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("http://localhost:4002/uploadfile", {
      method: "POST",
      body: form,
    });
  }
  public async getFileMetadataList(): Promise<FileMetadata[]> {
    const response = await fetch("http://localhost:4002/filemetadatalist");
    const fileMetadataList = await response.json();
    return fileMetadataList;
  }

  private async convertFileToDataUrl(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.onerror = () => {
        reject();
      };

      fileReader.readAsDataURL(file);
    });
  }
}
