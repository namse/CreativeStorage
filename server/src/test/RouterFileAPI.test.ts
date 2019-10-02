import http from "http";
import FormData from "form-data";
import { app } from "../index";
import uuid from "uuid/v4";
import fetch from "node-fetch";
import { FileMetadata } from "../IStorageService";

export async function uploadFile(
  filename: string,
  file: Buffer,
): Promise<void> {
  const form = new FormData();
  form.append("file", file, filename);
  const uploadImageUrl = "http://localhost:4002/uploadFile";

  const response = await fetch(uploadImageUrl, {
    method: "POST",
    body: form,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export async function downloadFile(filename: string): Promise<Buffer> {
  const uploadImageUrl = `http://localhost:4002/downloadFile?filename=${filename}`;

  const response = await fetch(uploadImageUrl);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const buffer = await response.buffer();
  return buffer;
}

export default async function getFileMetadataList(): Promise<FileMetadata[]> {
  const url = "http://localhost:4002/fileMetadataList";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = await response.json();
  return result;
}

describe("FileApiRouter test", () => {
  let server: http.Server;
  beforeEach(() => {
    server = app.listen(4002);
  });

  afterEach(() => {
    server.close();
  });

  it(`should upload file and get FileMetadatalist from server and check it in downloads files`, async () => {
    const imageInBase64 =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    const imageBuffer = Buffer.from(imageInBase64, "base64");
    const filename = uuid();

    await uploadFile(filename, imageBuffer);

    const fileMetadataList = await getFileMetadataList();
    const filenameFromApi = fileMetadataList.map((fileMetadata) => {
      return fileMetadata.filename;
    });

    const downloadFiles: string[] = await Promise.all(
      filenameFromApi.map(async (filenameToBeDownloaded: string) => {
        const downloadedFile = await downloadFile(filenameToBeDownloaded);
        const downloadedFileInBase64 = downloadedFile.toString("base64");
        return downloadedFileInBase64;
      }),
    );

    expect(downloadFiles).toEqual(expect.arrayContaining([imageInBase64]));
  });
});
