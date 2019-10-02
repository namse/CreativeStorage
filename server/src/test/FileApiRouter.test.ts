import { getUploadFileUrl, getDownloadFileUrl, getFileMetadataList, uploadFile, downloadFile } from "./testFunctions";
import http from "http";
import { app } from "../index";

describe("FileApiRouter test", () => {
  let server: http.Server;
  beforeEach(() => {
    server = app.listen(4002);
  });

  afterEach(() => {
    server.close();
  });

  it(`should upload file and get FileMetadatalist from server and check it in downloads files`, async () => {
    const imageInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    const contentType = "image/jpeg";
    const filename = "test.jpeg";

    const presignedPostData = await getUploadFileUrl(filename, contentType);
    uploadFile(presignedPostData);
    const objectMetadata = await getFileMetadataList();
    if (!objectMetadata.Contents) {
      throw new Error();
    }

    let filenameFromS3: Array<string | undefined>;
    filenameFromS3 = objectMetadata.Contents.map((fileMetadata) => {
      return fileMetadata.Key;
    });

    const presignedDownloadFileUrl = await getDownloadFileUrl(filename);
    const downloadFiles: string[] = await Promise.all(filenameFromS3.map(async (filenameToBeDownloaded) => {
      const downloadedFile = await downloadFile(filenameToBeDownloaded);
      const downloadedFileInBase64 = downloadedFile.toString("base64");
      return downloadedFileInBase64;
    }));

    expect(downloadFiles).toEqual(expect.arrayContaining([imageInBase64]));
  });
});
