import { start, stop } from "../ServerlessUtil";
import fetch from "node-fetch";
import { envModule } from "../config/.env";
import { fileMetadata } from "src/IStorageService";

const endpoint: string = envModule.LOCALTESTIP;

export async function getTest(testUrl: string): Promise<boolean> {
  const response = await fetch(testUrl);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.ok;
}

async function getFileMetadataList(): Promise<fileMetadata[]> {
  const response = await fetch(endpoint + "/filemetadatalist");
  const fileMetadataList = await response.json();
  return fileMetadataList;
}

async function healthCheck(): Promise<boolean> {
  const url = endpoint;

  const response = await fetch(url);
  let status: boolean = false;

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  status = true;
  return status;
}

describe("servereless", () => {

  beforeEach(async () => {
    jest.setTimeout(30000);
    await start();
  });

  afterEach(() => {
    stop();
  });

  it("/filemetadatalist api get request response test", async () => {
    const serverStatus: boolean = await healthCheck();
    if (serverStatus) {
      const status: boolean = await getTest(`${endpoint}/filemetadatalist`);
      expect(status).toEqual(true);
    } else {
      expect(true).toEqual(false);
    }
  });

  it("/uploads api get request response test", async () => {
    const serverStatus: boolean = await healthCheck();
    if (serverStatus) {
      const filename = `${123456789}.txt`;
      const response = await fetch(`${endpoint}/uploadfileurl?filename=${filename}&contentType=text/plain`);
      expect(response.status).toEqual(200);
    } else {
      expect(true).toEqual(false);
    }
  });

  it("/downloads api get request response test", async () => {
    const serverStatus: boolean = await healthCheck();
    if (serverStatus) {
      const fileMetadataList: fileMetadata[] = await getFileMetadataList();
      const filename: string | undefined = fileMetadataList[0].key;
      const response = await fetch(encodeURI(`${endpoint}/downloadfileurl?filename=${(filename)}`));
      expect(response.status).toEqual(200);
    } else {
      expect(true).toEqual(false);
    }
  });

});
