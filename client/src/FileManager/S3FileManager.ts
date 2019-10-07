import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

export default class S3FileManager implements IFileManager {
  public async getDownloadUrl(filename: string): Promise<string> {
    const response = await fetch(
      `http://localhost:4002/downloadfileurl?filename=${filename}`,
    );
    const downloadUrl = await response.text();
    return downloadUrl;
  }

  public async uploadFile(file: File): Promise<void> {
    const response = await fetch(
      `http://localhost:4002/uploadfileurl?filename=${file.name}&contentType=${file.type}`,
    );
    const presignedPost = JSON.parse(await response.text());
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

  public async deleteFile(filename: string): Promise<void> {
    const response = await fetch(
      `http://localhost:4002/deletefileurl?filename=${filename}`,
    );
    const deleteUrl = await response.text();
    const deleteResponse = await fetch(deleteUrl, { method: "DELETE" });
  }
}
