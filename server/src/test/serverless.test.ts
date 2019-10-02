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
  const settings = {
    method: "post",
    header: {
      "Accept": "text/plain",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "client": "hello",
    }),
  };
  const response = await fetch(url, settings);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const temp = await response.text();
  return temp;
}

describe("serverelss", () => {

  beforeEach( async () => {
    jest.setTimeout(30000);
    console.log("[Tests Bootstrap] Start");
    await start();
    console.log("[Tests Bootstrap] Done");
  });

  afterEach(() => {
    console.log("[Tests Teardown] Start");
    stop();
    console.log("[Tests Teardown] Done");
  });

  it("http get request response test", async () => {
    const test = await getTest();
    expect(test).toEqual("GET-OK!!");
  });

  it("http post request response test", async () => {
    const test = await postTest();
    expect(test).toEqual("hello world!!");
  });
});
