import uuid from "uuid/v4";
import { uploadFile, downloadFile } from "./uploadAndDownloadFile.test";
import { getFileMetadataList } from "./uploadAndGetFileMetadataList.test";

describe(`upload and download and listFileMetadata test from StrageClass`, () => {

  it(`should upload file and get FileMetadatalist from server and check it in downloads files`, async () => {
    const imageInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    const imageBuffer = Buffer.from(imageInBase64, "base64");
    const filename = uuid();

    await uploadFile(filename, imageBuffer);

    const fileMetadataList = await getFileMetadataList();
    const filenameFromApi = fileMetadataList.map((fileMetadata) => {
      return fileMetadata.filename;
    });

    const downloadFiles: string[] = await Promise.all(filenameFromApi.map(async (filenameToBeDownloaded: string) => {
      const downloadedFile = await downloadFile(filenameToBeDownloaded);
      const downloadedFileInBase64 = downloadedFile.toString("base64");
      return downloadedFileInBase64;
    }));

    expect(downloadFiles).toEqual(expect.arrayContaining([imageInBase64]));
  });
});
