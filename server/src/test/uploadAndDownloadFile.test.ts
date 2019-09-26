import fetch from "node-fetch";
import FormData from "form-data";
import uuid from "uuid/v4";
import http from "http";
import { app } from "../index";

async function uploadFile(filename: string, file: Buffer): Promise<void> {
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

async function downloadFile(filename: string): Promise<Buffer> {
  const uploadImageUrl = `http://localhost:4002/downloadFile?filename=${filename}`;

  const response = await fetch(uploadImageUrl);
  if (!response.ok) {
    throw new Error(response.type);
  }

  const buffer = await response.buffer();
  return buffer;
}

describe("upload and download file test", () => {
  let server: http.Server;
  beforeEach(() => {
    server = app.listen(4002);
  });

  afterEach(() => {
    server.close();
  });

  it("upload and download file", async () => {
    // tslint:disable-next-line: max-line-length
    const imageInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    const imageBuffer = Buffer.from(imageInBase64, "base64");

    const filename = uuid();

    await uploadFile(filename, imageBuffer);

    const downloadedFile = await downloadFile(filename);
    const downloadedFileInBase64 = downloadedFile.toString("base64");
    expect(downloadedFileInBase64).toEqual(imageInBase64);
  });
});

export { uploadFile, downloadFile };
