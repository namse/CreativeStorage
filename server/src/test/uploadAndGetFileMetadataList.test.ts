import fetch from "node-fetch";
import uuid from "uuid/v4";
import fs from "fs";
import path from "path";
import { uploadFile } from "./uploadAndDownloadFile.test";

type FileMetadata = {
  filename: string,
};

async function getFileMetadataList(): Promise<FileMetadata[]> {
  const url = "http://localhost:4002/fileMetadataList";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = await response.json();
  return result;
}

function readDir(uploadsDirectory: string, resolve: any, reject: any) {
  fs.readdir(uploadsDirectory, (err, data) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data);
  });
}

it("getlist file", async () => {
  const imageInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
  const imageBuffer = Buffer.from(imageInBase64, "base64");
  const filename = uuid();
  await uploadFile(filename, imageBuffer);

  const apiFileMetadataList = await getFileMetadataList();
  const filenameFromApi = apiFileMetadataList.map((el: FileMetadata) => {
    return el.filename;
  });

  const filenameFromFs = await new Promise((resolve, reject) => {
    const uploadsDirectory = path.join(__dirname, "..", "..", "/dist/uploads");
    readDir(uploadsDirectory, resolve, reject);
  });

  expect(filenameFromApi).toEqual(filenameFromFs);
});
