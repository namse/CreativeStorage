import IFileManager from "./IFileManager";

class MockFileManager implements IFileManager {
  private mockFileRepository: Map<string, File> = new Map();

  public async uploadFile(filename: string, file: File): Promise<void> {
    this.mockFileRepository.set(filename, file);
  }

  private convertFileToDataUrl(file: File): Promise<string> {
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

  public async startDownloadFile(filename: string) {
    const file = this.mockFileRepository.get(filename);
    if (!file) {
      throw new Error(`file ${filename} doesn't exist`);
    }
    const dataUrl = await this.convertFileToDataUrl(file);

    const link = document.createElement("a");

    link.download = filename;

    link.href = dataUrl;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }
}
