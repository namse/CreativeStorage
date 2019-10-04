import { start, stop } from "../slsUtils";
import fetch from "node-fetch";

async function getTest(): Promise<string> {
  const url = "http://localhost:4002/getTest";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const temp = await response.text();
  return temp;
}

async function postTest(): Promise<string> {
  const url = "http://localhost:4002/postTest";
  const sampleData = { client: "hello" };
  const settings = {
    method: "post",
    header: {
      "Accept": "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sampleData),
  };
  const response = await fetch(url, settings);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const temp = await response.text();
  return temp;
}

async function healthCheck(): Promise<boolean> {
  const url = "http://localhost:4002/getTest";

  const response = await fetch(url);
  let status: boolean = false;

  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    status = true;
  }
  return status;
}

describe("serverelss", () => {

  beforeEach( async () => {
    jest.setTimeout(30000);
    await start();
  });

  afterEach(() => {
    stop();
  });

  it("http get request response test", async () => {
    const serverStatus = await healthCheck();
    if (serverStatus) {
      const test: string = await getTest();
      expect(test).toEqual("GET-OK!!");
    } else {
      expect(true).toEqual(false);
    }
  });

  it("http post request response test", async () => {
    const serverStatus = await healthCheck();
    if (serverStatus) {
      const test = await postTest();
      expect(test).toEqual("hello world!!");
    } else {
      expect(true).toEqual(false);
    }
  });
});
