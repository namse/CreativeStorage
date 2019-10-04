import http from "http";
import { app } from "../index";
import StorageServiceS3 from "../StorageServiceS3";
import fetch from "node-fetch";
import FormData from "form-data";
import { S3 } from "aws-sdk";

describe("S3Router test", () => {
  let server: http.Server;
  beforeEach(() => {
    server = app.listen(4002);
  });

  afterEach(() => {
    server.close();
  });

  const stroageServiceS3 = new StorageServiceS3();

  const filename = "test.jpeg";
  const contentType = "image/jpeg";

  const serviceName = "s3";
  const serviceUrl = "http://127.0.0.1:9000";
  const accessKey = "testman";
  const bucket = "testbucket";
  const region = "us-east-1";

  const yyyymmdd = new Date()
    .toISOString()
    .replace(/-/gi, "")
    .split("T")[0];
  const hhmm = new Date()
    .toISOString()
    .replace(/:/gi, "")
    .split("T")[1]
    .substring(0, 4);

  it("should get presigned post data for uploading file", async () => {
    const presignedPostData = stroageServiceS3.getUploadFileUrl(
      filename,
      contentType,
    );
    const desiredPresignedPostData = {
      url: `${serviceUrl}/${bucket}`,
      fields: {
        "Key": filename,
        "Content-Type": contentType,
        "bucket": bucket,
        "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
        "X-Amz-Credential": `${accessKey}/${yyyymmdd}/${region}/${serviceName}/aws4_request`,
        "X-Amz-Date": expect.stringMatching(
          new RegExp(`${yyyymmdd}T${hhmm}[0-5][0-9]Z`),
        ), // RegExp constructor is used to put variable in regular expression // "seconds" can be differnt
        "Policy": expect.stringMatching(/.{1,}/),
        "X-Amz-Signature": expect.stringMatching(/.{1,}/),
      },
    };
    expect(presignedPostData).toMatchObject(desiredPresignedPostData);
  });

  it("should get presigned url for download file", async () => {
    const presignedDownloadFileurlExpiry = 60;
    const presignedDownloadFileUrl = stroageServiceS3.getDownloadFileUrl(
      filename,
    );
    const expected: string[] = [
      `${serviceUrl}/${bucket}/${filename}?X-Amz-Algorithm=AWS4-HMAC-SHA256`,
      `X-Amz-Credential=${accessKey}%2F${yyyymmdd}%2F${region}%2F${serviceName}%2Faws4_request`,
      expect.stringMatching(
        new RegExp(`X-Amz-Date=${yyyymmdd}T${hhmm}[0-5][0-9]Z`),
      ), // RegExp constructor is used to put variable in regular expression // "seconds" can be differnt
      `X-Amz-Expires=${presignedDownloadFileurlExpiry}`,
      expect.stringMatching(/X-Amz-Signature=.{1,}/),
      "X-Amz-SignedHeaders=host",
    ];
    expect(presignedDownloadFileUrl.split("&")).toEqual(
      expect.arrayContaining(expected),
    );
  });

  it("should get bucket meta data which include meta data of objects", async () => {
    let contents = await stroageServiceS3.getFileMetadataList();
    if (contents.length === 0) {
      const imageInBase64 =
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
      const imageBuffer = Buffer.from(imageInBase64, "base64");
      const presignedPost = (stroageServiceS3.getUploadFileUrl(
        filename,
        contentType,
      ) as any) as S3.PresignedPost;
      const form = new FormData();
      Object.keys(presignedPost.fields).forEach((key) => {
        form.append(key, presignedPost.fields[key]);
      });
      form.append(filename, imageBuffer);
      const response = await fetch(presignedPost.url, {
        method: "POST",
        body: form,
      });
      contents = await stroageServiceS3.getFileMetadataList();
    }
    expect(Array.isArray(contents)).toBe(true);
    expect(contents.length).not.toBe(0);
  });
});

// expect.extend({
//   toBeGreaterThanOrEqual(actual: number, expected: number) {
//     ensureNumbers(actual, expected, ".toBeGreaterThanOrEqual");
//     const pass = actual >= expected;
//     if (pass){
//       return {
//         message: ()=> `expected ${actual} is not greater than ${expected}`
//       }
//     }
//     const message = () =>
//       matcherHint(".toBeGreaterThanOrEqual", undefined, undefined, {
//         isNot: this.isNot,
//       }) +
//       "\n\n" +
//       `Expected: ${printExpected(expected)}\n` +
//       `Received: ${printReceived(actual)}`;
//     return { message, pass };
//   },
// });  // extend toBeGreaterThanOrEqual as assymetric matcher for number test in toMatchObject test
