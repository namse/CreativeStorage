import { S3 } from "aws-sdk";

export async function getUploadFileUrl(filename: string, contentType: string): Promise<S3.PresignedPost> {
  const url = `http://localhost:4002/s3UploadFileUrl?filename=${filename}&contentType=${contentType}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function getDownloadFileUrl(filename: string): Promise<string> {
  const url = `http://localhost:4002/downloadFile?filename=${filename}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function getFileMetadataList(): Promise<S3.ListObjectsV2Output> {
  const url = "http://localhost:4002/fileMetadataList";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

// export async function uploadFile(filename: string, file: Buffer): Promise<void> {
//   const form = new FormData();
//   form.append("file", file, filename);
//   const uploadImageUrl = "http://localhost:4002/uploadFile";

//   const response = await fetch(uploadImageUrl, {
//     method: "POST",
//     body: form,
//   });
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
// }

// export async function downloadFile(presignedDownloadUrl: string): Promise<Buffer> {
//   const response = await fetch(presignedDownloadUrl);
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }

//   const buffer = await response.buffer();
//   return buffer;
// }
