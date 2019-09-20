import * as fs from "fs";

class StorageClass {
  
  public readFile(filename: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(`${__dirname}/uploads/${filename}`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public renameFile(path: string, filename: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.rename(path, `${__dirname}/uploads/${filename}`, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public getFileList(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(`${__dirname}/uploads/`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}

export default StorageClass;