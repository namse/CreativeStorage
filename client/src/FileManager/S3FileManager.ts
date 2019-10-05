import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

export default class FileManager implements IFileManager {
  public async getDownloadUrl(filename: string): Promise<string> {
    const response = await fetch(
      `http://localhost:4002/downloadfileurl?filename=${filename}`,
    );
    const s3Url = await response.text();

    return s3Url;
  }

  public async uploadFile(file: File): Promise<void> {
    const response = await fetch(
      `http://localhost:4002/uploadfileurl?filename=${file.name}&contentType=${file.type}`,
    );
    const presignedPost = JSON.parse(await response.text());
    console.log(presignedPost);
    const form = new FormData();
    Object.keys(presignedPost.fields).forEach((key) => {
      form.append(key, presignedPost.fields[key]);
    });
    form.append("file", file);
    const uploadResponse = await fetch(presignedPost.url, {
      method: "POST",
      body: form,
    });
  }

  public async getFileMetadataList(): Promise<FileMetadata[]> {
    const response = await fetch("http://localhost:4002/filemetadatalist");
    const fileMetadataList = await response.json();
    return fileMetadataList;
  }
}
