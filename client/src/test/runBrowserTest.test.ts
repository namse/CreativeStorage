import { startBundleSever, stopBundleServer } from "./browserTest/settings/bundleServer";
import { testCaseNames } from "./browserTest/settings/BrowserTest";

describe("File Manager", () => {
  beforeAll(async () => {
    jest.setTimeout(20000);
    const port = 12345;
    await startBundleSever(port);

    page.on("console", (msg) => console.log(msg.location(), msg.text()));

    await page.goto(`http://localhost:${port}`);

    await page.waitForSelector("#root");
    jest.setTimeout(5000);
  });

  afterAll(async () => {
    stopBundleServer();
  });

  testCaseNames.forEach((testCaseName) => {
    it(testCaseName, async () => {
      await page.evaluate(`
        runTest("${testCaseName}");
      `);
    });
  });
});
