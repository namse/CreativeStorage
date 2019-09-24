import { itTestCaseNames } from "./browserTest/settings/testEnv";
import { port } from "./env";

describe("Test in browser", () => {
  beforeAll(async () => {
    jest.setTimeout(20000);

    await page.goto(`http://localhost:${port}`);

    await page.waitForSelector("#root");
    jest.setTimeout(5000);
  });

  itTestCaseNames.forEach((testCaseName) => {
    it(testCaseName, async () => {
      await page.evaluate(`
        console.log(runTest);
        runTest("${testCaseName}");
      `);
    });
  });
});
