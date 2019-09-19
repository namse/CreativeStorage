// // no needs
// import fs from "fs";
// import path from "path";

// const downloadFile = async (): Promise<string> => {
//   const sourceFile: string = path.join(__dirname, "source/downloadFile.mov");
//   const destFile: string = path.join(__dirname, "destination/downloadFile.mov");
//   const readStream: fs.ReadStream = await fs.createReadStream(sourceFile);
//   const writeStream: fs.WriteStream = await fs.createWriteStream(destFile);
//   readStream.pipe(writeStream);

//   return "OK";
// };

// test("download file from server(via fs)", async () => {
//   const result: string = await downloadFile();
//   const sourceFile: string = path.join(__dirname, "source/downloadFile.mov");
//   const destFile: string = path.join(__dirname, "destination/downloadFile.mov");
//   if (result === "OK") {
//     const sourceFileBuffer: Buffer = Buffer.from(sourceFile, "base64");
//     const destFileBuffer: Buffer = Buffer.from(destFile, "base64");

//     try {
//       fs.unlinkSync(destFile);
//     } catch (err) {
//       console.log(err);
//     }
//     console.log(destFileBuffer);
//     expect(sourceFileBuffer).toEqual(destFileBuffer);
//   } else {
//     expect("fail").not.toEqual("fail");
//   }
// });
