import { it } from "./settings/it";
import uuid from "uuid/v4";
import IFileManager from "src/FileManager/IFileManager";
import MockFileManager from "src/FileManager/MockFileManager";
import expect from "expect";

function b64EncodeUnicode(value: string) {
  return btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(_, p1) {
      return String.fromCharCode(parseInt(`0x${p1}`, 16));
    }));
}

async function generateTestBlob(content: string): Promise<Blob> {
  const url = `data:text/plain;base64,${b64EncodeUnicode(content)}`;
  const response = await fetch(url);
  return response.blob();
}

it("should upload file", async () => {
  const filename = uuid();
  const file = await generateTestBlob(filename);

  const fileManager: IFileManager = new MockFileManager();

  await fileManager.uploadFile(filename, file);

  expect(true).toBe(true);
});
