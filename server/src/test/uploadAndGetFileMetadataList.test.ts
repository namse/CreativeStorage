import fetch from "node-fetch";
import uuid from "uuid/v4";
import { uploadFile } from "./uploadAndDownloadFile.test";
import { FileMetadata } from "../IStorageService";

import http from "http";
import { app } from "../index";

export default async function getFileMetadataList(): Promise<FileMetadata[]> {
  const url = "http://localhost:4002/fileMetadataList";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = await response.json();
  return result;
}

describe("get FileMetadataList test", () => {
  let server: http.Server;
  beforeEach(() => {
    server = app.listen(4002);
  });

  afterEach(() => {
    server.close();
  });

  it("getlist file", async () => {
    const imageInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    const imageBuffer = Buffer.from(imageInBase64, "base64");
    const filename = uuid();
    await uploadFile(filename, imageBuffer);

    const fileMetadataList = await getFileMetadataList();
    const filenameFromApi = fileMetadataList.map((el) => {
      return el.filename;
    });

    expect(filenameFromApi).toEqual(expect.arrayContaining([filename]));
  });
});
