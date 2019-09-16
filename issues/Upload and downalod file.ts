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
    const iamgeInBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    const imageBuffer = Buffer.from(iamgeInBase64, 'base64');

    const filename = uuid();

    await uploadFile(filename, imageBuffer);

    const downloadedFile = await downloadFile(filename);
    const downloadedFileInBase64 = downloadFile.toString('base64');
    expect(downloadedFileInBase64).equals(iamgeInBase64);
});
