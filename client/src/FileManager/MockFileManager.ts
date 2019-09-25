import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

export default class MockFileManager implements IFileManager {
  private mockFileRepository: {
    [filename: string]: {
      metadata: FileMetadata;
      blob: Blob;
    };
  } = {};

  public async getDownloadUrl(filename: string): Promise<string> {
    const fileInfo = this.mockFileRepository[filename];
    if (!fileInfo) {
      throw new Error(`file ${filename} doesn't exists`);
    }

    const { blob } = fileInfo;

    const dataUrl = await this.convertFileToDataUrl(blob);

    return dataUrl;
  }

  public async uploadFile(filename: string, file: Blob): Promise<void> {
    this.mockFileRepository[filename] = {
      metadata: {
        filename,
      },
      blob: file,
    };
  }

  public async getFileMetadataList(): Promise<FileMetadata[]> {
    return Object.values(this.mockFileRepository).map((info) => info.metadata);
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
