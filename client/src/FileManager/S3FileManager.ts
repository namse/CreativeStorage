import IFileManager, {
  FileMetadata,
  LifecycleRule,
} from "src/FileManager/IFileManager";
import uuid from "uuid/v5";
import { envModule } from "src/config/.env";

export default class S3FileManager implements IFileManager {
  public async getDownloadUrl(filename: string): Promise<string> {
    const response = await fetch(
      `${envModule.SERVER_ENDPOINT}/downloadfileurl?filename=${filename}`,
    );
    const downloadUrl = await response.text();
    return downloadUrl;
  }

  public async uploadFile(file: File): Promise<void> {
    const response = await fetch(
      `${envModule.SERVER_ENDPOINT}/uploadfileurl?filename=${file.name}&contentType=${file.type}`,
    );
    const presignedPost = JSON.parse(await response.text());
    const form = new FormData();

    Object.keys(presignedPost.fields).forEach((key) => {
      form.append(key, presignedPost.fields[key]);
    });
    form.append("file", file);

    const progressTagClassName = uuid(file.name, Array(16))
      .replace(/\./g, "")
      .replace(/\-/g, "");

    const targetTag = document.getElementsByClassName(
      `${progressTagClassName}`,
    )[0];
    if (targetTag !== null) {
      await new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable && targetTag !== undefined) {
            targetTag.innerHTML =
              "percentage : " + ((event.loaded / event.total) * 100).toFixed(2);
          }
        });
        req.upload.addEventListener("load", (event) => {
          resolve(req.response);
        });
        req.upload.addEventListener("error", (event) => {
          reject(req.response);
        });

        req.open("POST", presignedPost.url);
        req.send(form);
      });
    }
  }

  public async getFileMetadataList(): Promise<FileMetadata[]> {
    const response = await fetch(
      `${envModule.SERVER_ENDPOINT}/filemetadatalist`,
    );
    const fileMetadataList = await response.json();
    return fileMetadataList;
  }

  public async changeLifecycle(days: number): Promise<void> {
    const response = await fetch(
      `${envModule.SERVER_ENDPOINT}/putbucketlifecycle/?days=${days}`,
    );
    console.log(await response.json());
  }

  public async deleteFile(filename: string): Promise<void> {
    const response = await fetch(
      `${envModule.SERVER_ENDPOINT}/deletefileurl?filename=${filename}`,
    );
    const deleteUrl = await response.text();
    const deleteResponse = await fetch(deleteUrl, { method: "DELETE" });
  }

  public async getLifecycleConfiguration(): Promise<LifecycleRule> {
    const response = await fetch(
      `${envModule.SERVER_ENDPOINT}/getbucketlifecycle`,
    );
    const lifeCycleRule = await response.json();
    return lifeCycleRule as LifecycleRule;
  }
}
