import fs from "fs";
import IStorageService, { FileMetadata } from "./IStorageService";

export default class StorageService implements IStorageService {

  public readFile(filename: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/uploads/${filename}`, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }

  public writeFile(path: string, filename: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.rename(path, `${__dirname}/uploads/${filename}`, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

  public listFiles(): Promise<FileMetadata[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(`${__dirname}/uploads/`, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const fileMetadataList: FileMetadata[] = data.map((value) => {
          const fileMetadata: FileMetadata = { filename: value };
          return fileMetadata;
        });
        resolve(fileMetadataList);
      });
    });
  }

}
