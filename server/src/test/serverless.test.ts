import { start, stop } from "../ServerlessUtil";
import fetch from "node-fetch";

export async function getTest(testUrl: string): Promise<boolean> {
  const response = await fetch(testUrl);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.ok;
}

async function healthCheck(): Promise<boolean> {
  const url = "http://localhost:4002/";

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
      const status: boolean = await getTest("http://localhost:4002/filemetadatalist");
      expect(status).toEqual(true);
    } else {
      expect(true).toEqual(false);
    }
  });

});
