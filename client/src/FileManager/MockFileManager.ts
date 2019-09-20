import IFileManager from "./IFileManager";

export default class MockFileManager implements IFileManager {
  private mockFileRepository: Map<string, Blob> = new Map();

  public async uploadFile(filename: string, file: Blob): Promise<void> {
    this.mockFileRepository.set(filename, file);
  }

  public async startDownloadFile(filename: string) {
    const file = this.mockFileRepository.get(filename);
    if (!file) {
      throw new Error(`file ${filename} doesn't exists`);
    }

    const dataUrl = await this.convertFileToDataUrl(file);

    const link = document.createElement("a");

    link.download = filename;
    link.href = dataUrl;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  private convertFileToDataUrl(file: Blob): Promise<string> {
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
