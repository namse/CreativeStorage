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
    // const uploadResponse = await fetch(presignedPost.url, {
    //   method: "POST",
    //   body: form,
    // });
    await new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          // const copy = { ...this.state.uploadProgress };
          // copy[file.name] = {
          //   state: "pending",
          //   percentage: (event.loaded / event.total) * 100,
          // };
          // this.setState({ uploadProgress: copy });
          console.log("percentage : ", (event.loaded / event.total) * 100);
        }
      });
      req.upload.addEventListener("load", (event) => {
        // const copy = { ...this.state.uploadProgress };
        // copy[file.name] = { state: "done", percentage: 100 };
        // this.setState({ uploadProgress: copy });
        resolve(req.response);
      });
      req.upload.addEventListener("error", (event) => {
        // const copy = { ...this.state.uploadProgress };
        // copy[file.name] = { state: "error", percentage: 0 };
        // this.setState({ uploadProgress: copy });
        console.log(req.response);
        reject(req.response);
      });
      req.open("POST", presignedPost.url);
      req.send(file);
      console.log(file);
      console.log(req.response);
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
