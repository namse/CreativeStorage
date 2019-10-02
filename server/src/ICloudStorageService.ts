import { S3 } from "aws-sdk";

export default interface ICloudStorageService {
  readFile(filename: string): Promise<string>;
  writeFile(filename: string, contentType: string): Promise<S3.PresignedPost>;
  listFiles(): Promise<S3.ListObjectsV2Output>;
}
