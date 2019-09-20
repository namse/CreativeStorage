import fetch from "node-fetch";
import FormData from "form-data";
import uuid from "uuid/v4";
import fs from 'fs';
import path from 'path';

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

type FileMetadata = {
  filename: string;
}

async function getFileIdList(): Promise<FileMetadata[]> {
  const url = "http://localhost:4002/getFileIdList";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const result = await response.json();
  return result;

}

it("getlist file", async (done) => {
  const imageInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
  const imageBuffer = Buffer.from(imageInBase64, "base64");
  const filename = uuid();
  await uploadFile(filename, imageBuffer);

  let fileIdList = await getFileIdList();
  let files = fileIdList.map((value: FileMetadata) => {
    return value.filename;
  });

  (function () {
    return new Promise((resolve, reject) => {
      fs.readdir(path.join(__dirname, "..", "..", "/dist/uploads"), (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
  })().then((value: any) => {
    expect(files).toEqual(value);
    done();
  })
});
