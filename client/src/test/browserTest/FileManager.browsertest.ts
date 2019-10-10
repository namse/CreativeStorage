import { it, describe } from "src/test/browserTest/settings/it";
import expect from "expect";
import uuid from "uuid/v4";
import IFileManager from "src/FileManager/IFileManager";
import S3FileManager from "src/FileManager/S3FileManager";

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

const testTargetFileManagers: IFileManager[] = [new S3FileManager()];
const filename = uuid() + ".txt";

testTargetFileManagers.forEach((fileManager) => {
  describe(`File Manager(${fileManager.constructor.name})`, () => {
    it(`should upload file and download(${fileManager.constructor.name})`, async () => {
      const testBlob = await generateTestBlob();
      const file = new File([testBlob], filename);
      await fileManager.uploadFile(file);

      const url = await fileManager.getDownloadUrl(filename);
      const response = await fetch(url);
      const blob = await response.blob();
      expect(testBlob).toEqual(blob);
    });

    it(`should be file in list(${fileManager.constructor.name})`, async () => {
      const fileMetadataList = await fileManager.getFileMetadataList();

      const actualMetadata = fileMetadataList.find(
        (metadata) => metadata.key === filename,
      );

      expect(actualMetadata).toHaveProperty("key");
      expect(actualMetadata).toHaveProperty("lastModified");
      expect(actualMetadata).toHaveProperty("eTag");
      expect(actualMetadata).toHaveProperty("size");
      expect(actualMetadata).toHaveProperty("storageClass");
      expect(actualMetadata).toHaveProperty("owner");
      expect(actualMetadata).not.toBeUndefined();
    });

    it(`should delete file(${fileManager.constructor.name})`, async () => {
      await fileManager.deleteFile(filename);
      const fileMetadataList = await fileManager.getFileMetadataList();

      const actualMetadata = fileMetadataList.find(
        (metadata) => metadata.key === filename,
      );

      expect(actualMetadata).toBe(undefined);
    });
  });
});
