import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

export default class FileManager implements IFileManager {
  public async getDownloadUrl(filename: string): Promise<string> {
    const response = await fetch(
      `http://localhost:4002/downloadfile?filename=${filename}`,
    );
    const body = await response.json();
    const url: string = body.url;
    return url;
  }

  public async uploadFile(file: File): Promise<void> {
    const uploadResponse = await fetch("http://localhost:4002/uploadfile", {
      method: "POST",
      body: JSON.stringify({ fileName: file.name }),
    });
    const body = await uploadResponse.json();
    const signedUrl: string = body.signedUrl;

    const form = new FormData();
    form.append("file", file);
    const response = await fetch(signedUrl, {
      method: "POST",
      body: form,
    });
  }
  public async getFileMetadataList(): Promise<FileMetadata[]> {
    const response = await fetch("http://localhost:4002/filemetadatalist");
    const fileMetadataList = await response.json();
    return fileMetadataList;
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

// import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";

// export default class FileManager implements IFileManager {
//   public async getDownloadUrl(filename: string): Promise<string> {
//     const response = await fetch(
//       `http://localhost:4002/downloadfileurl?filename=${filename}`,
//     );
//     const s3Url = await response.text();

//     return s3Url;
//   }

//   public async uploadFile(file: File): Promise<void> {
//     const response = await fetch(
//       `http://localhost:4002/uploadfileurl?filename=${file.name}&contentType=${file.type}`,
//     );
//     const presignedPost = JSON.parse(await response.text());
//     console.log(presignedPost);
//     const form = new FormData();
//     Object.keys(presignedPost.fields).forEach((key) => {
//       form.append(key, presignedPost.fields[key]);
//     });
//     form.append("file", file, file.name);
//     const uploadResponse = await fetch(presignedPost.url, {
//       method: "POST",
//       body: form,
//     });
//   }

//   public async getFileMetadataList(): Promise<FileMetadata[]> {
//     const response = await fetch("http://localhost:4002/filemetadatalist");
//     const fileMetadataList = await response.json();
//     return fileMetadataList;
//   }
// }
