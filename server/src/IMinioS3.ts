import { S3 } from "aws-sdk";

export default interface IMinioS3 {
  readFile(filename: string): Promise<string>;
  writeFile(filename: string, contentType: string): Promise<S3.PresignedPost>;
  listFiles(): Promise<S3.ListObjectsV2Output>;
}
