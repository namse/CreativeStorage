import { it, describe } from "src/test/browserTest/settings/it";
import expect from "expect";
import uuid from "uuid/v4";
import IFileManager, { FileMetadata } from "src/FileManager/IFileManager";
import MockFileManager from "src/FileManager/MockFileManager";
import FileManager from "src/FileManager/FileManager";

export function b64EncodeUnicode(value: string) {
  return btoa(
    encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, function toSolidBytes(
      _,
      p1,
    ) {
      return String.fromCharCode(parseInt(`0x${p1}`, 16));
    }),
  );
}

export async function generateTestBlob(
  content: string = uuid(),
): Promise<Blob> {
  const url = `data:text/plain;base64,${b64EncodeUnicode(content)}`;
  const response = await fetch(url);
  return response.blob();
}

const testTargetFileManagers: IFileManager[] = [
  new MockFileManager(),
  new FileManager(),
];

testTargetFileManagers.forEach((fileManager) => {
  describe(`File Manager(${fileManager.constructor.name})`, () => {
    it(`should upload file without error(${fileManager.constructor.name})`, async () => {
      const testBlob = await generateTestBlob();
      const filename = uuid();
      const file = new File([testBlob], filename);
      await fileManager.uploadFile(file);
    });

    it(`should upload file and download(${fileManager.constructor.name})`, async () => {
      const testBlob = await generateTestBlob();
      const filename = uuid();
      const file = new File([testBlob], filename);
      await fileManager.uploadFile(file);

      const url = await fileManager.getDownloadUrl(filename);

      const response = await fetch(url);
      const blob = await response.blob();

      expect(testBlob).toEqual(blob);
    });

    it(`should upload file and check it in list(${fileManager.constructor.name})`, async () => {
      const testBlob = await generateTestBlob();
      const filename = uuid();
      const file = new File([testBlob], filename);
      await fileManager.uploadFile(file);

      const fileMetadataList = await fileManager.getFileMetadataList();

      const expectedMetadata: FileMetadata = {
        Key: filename,
      };
      const actualMetadata = fileMetadataList.find(
        (metadata) => metadata.Key === filename,
      );
      expect(actualMetadata).not.toBeUndefined();
      expect(expectedMetadata).toEqual(actualMetadata);
    });
  });
});
