import { it, describe } from "./settings/it";
import uuid from "uuid/v4";
import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";
import MockFileManager from "src/FileManager/MockFileManager";
import expect from "expect";

function b64EncodeUnicode(value: string) {
  return btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(_, p1) {
      return String.fromCharCode(parseInt(`0x${p1}`, 16));
    }));
}

async function generateTestBlob(content: string = uuid()): Promise<Blob> {
  const url = `data:text/plain;base64,${b64EncodeUnicode(content)}`;
  const response = await fetch(url);
  return response.blob();
}

const testTargetFileManagers: IFileManager[] = [
  new MockFileManager(),
];

testTargetFileManagers.forEach((fileManager) => {
  describe(`File Manager(${fileManager.constructor.name})`, () => {
    it("should upload file without error", async () => {
      const file = await generateTestBlob();
      const filename = uuid();

      await fileManager.uploadFile(filename, file);
    });

    it("should upload file and download", async () => {
      const file = await generateTestBlob();
      const filename = uuid();
      await fileManager.uploadFile(filename, file);

      const url = await fileManager.getDownloadUrl(filename);

      const response = await fetch(url);
      const blob = await response.blob();

      expect(file).toEqual(blob);
    });

    it("should upload file and check it in list", async () => {
      const file = await generateTestBlob();
      const filename = uuid();
      await fileManager.uploadFile(filename, file);

      const fileMetadataList = await fileManager.getFileMetadataList();

      const expectedMetadata: FileMetadata = {
        filename,
      };

      const actualMetadata = fileMetadataList.find((metadata) => metadata.filename === filename);
      expect(actualMetadata).not.toBeUndefined();
      expect(expectedMetadata).toEqual(actualMetadata);
    });
  });
});
