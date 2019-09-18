import "../importThisFirstPlease";
import fetch from "node-fetch";
import FormData from "form-data";
import uuid from "uuid/v4";

async function uploadFile(filename: string, file: Buffer): Promise<void> {
    const form = new FormData();
    form.append("file", file);

    const uploadImageUrl = "http://localhost:4000/uploadFile";
    const response = await fetch(uploadImageUrl, {
        method: "POST",
        body: form,
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

async function downloadFile(filename: string): Promise<Buffer> {
    const uploadImageUrl = "http://localhost:4000/downloadFile";
    const response = await fetch(uploadImageUrl);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const buffer = await response.buffer();
    return buffer;
}

test("upload and download file", async () => {
    // tslint:disable-next-line: max-line-length
    const imageInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    const imageBuffer = Buffer.from(imageInBase64);

    const filename = uuid();

    await uploadFile(filename, imageBuffer);

    const downloadedFile = await downloadFile(filename);
    const downloadedFileInBase64 = downloadedFile.toString();
    expect(downloadedFileInBase64).toEqual(imageInBase64);
});

// test("test code", async () => {
//     const hello = "world";
//     expect(hello).toEqual("world");
// });
