# Title: Upload and downalod file using FS

# Tag: Backend

# Content

- Provide rest api for upload and download file
- Use http for interface
  - No express. use koa.
    - express doesn't handle Promise error
  - koa, koa-router
- Use fs or fs-extra (fs.writeFile, fs.readFile)
- Use Promise, async and await
- Create test for whole process and pass it
  - Test only upload and download file simplely
  - It's better to create test code by frontend developer


Test Code Sample
```
import fetch from "node-fetch";
import FormData from 'form-data';
import uuid from 'uuid/v4';

async function uploadFile(filename: string, file: Buffer): Promise<void> {
    const form = new FormData();
    form.append('file', file);

    const uploadImageUrl = TODO;
    const response = await fetch(uploadImageUrl, {
        method: 'POST',
        body: form,
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

async function downloadFile(filename: string): Promise<Buffer> {
    const uploadImageUrl = TODO;
    const response = await fetch(uploadImageUrl);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const buffer = await response.buffer();
    return buffer;
}

test("upload and download file", async () => {
    runServer();
    const iamgeInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    const imageBuffer = Buffer.from(iamgeInBase64, 'base64');

    const filename = uuid();

    await uploadFile(filename, imageBuffer);

    const downloadedFile = await downloadFile(filename);
    const downloadedFileInBase64 = downloadFile.toString('base64');
    expect(downloadedFileInBase64).equals(iamgeInBase64);
});
```
