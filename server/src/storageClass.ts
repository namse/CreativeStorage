import fs from "fs";

export type FileMetadata = {
  filename: string,
};

class StorageClass {

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

  public renameFile(path: string, filename: string): Promise<Buffer> {
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

  public listFile(): Promise<FileMetadata[]> {
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

export default StorageClass;
