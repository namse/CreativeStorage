import fetch from "node-fetch";
import FormData from "form-data";
import uuid from "uuid/v4";

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

async function getFileIdList(): Promise<void> {
  const url = "http://localhost:4002/getFileIdList";
  const response = await fetch(url);

}

test("upload and get list of files", async () => {
  // tslint:disable-next-line: max-line-length
  const imagesInBase64 = [
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==",
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=",
  ];
  const imagesToBeUploadedInBuffer = imagesInBase64.map((el) => {
    return {
      imageBuffer: Buffer.from(el, "base64"),
      filename: uuid(),
    };
  });

  await Promise.all(imagesToBeUploadedInBuffer.map((el) => {
    uploadFile(el.filename, el.imageBuffer);
  }));

  const fileIdList = await getFileIdList();
  it("matches even if received contains additional elements", () => {
    expect(fileIdList).toEqual(expect.arrayContaining(imagesToBeUploadedInBuffer.map((el) => el.filename)));
  });
  it("does not match if received does not contain expected elements", () => {
    expect([imagesToBeUploadedInBuffer[0].filename, uuid()])
      .not.toEqual(expect.arrayContaining(imagesToBeUploadedInBuffer.map((el) => el.filename)));
  });
});
