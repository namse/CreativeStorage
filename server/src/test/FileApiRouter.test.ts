import { Server } from "http";
import app from "../index";
import uuid from "uuid/v4";
import { uploadFile, downloadFile } from "./uploadAndDownloadFile.test";
import { getFileMetadataList } from "./uploadAndGetFileMetadataList.test";

describe(`FileApiRouter test`, () => {

  let server: Server;

  beforeAll((done) => {
    console.log("서버 열어요~");
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
    console.log("서버 닫아요~");
  });

  it(`should upload file and get FileMetadatalist from server and check it in downloads files`, async () => {
    const imageInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    const imageBuffer = Buffer.from(imageInBase64, "base64");
    const filename = uuid();

    console.log("업로드 테스트 바로 전", filename);
    await uploadFile(filename, imageBuffer);

    const fileMetadataList = await getFileMetadataList();
    console.log("리스트 메타데이터", fileMetadataList);
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
