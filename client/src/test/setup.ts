import fs, { Dirent } from "fs";
import path from "path";
import { startBundleSever } from "./browserTest/settings/bundleServer";
import { port, settingsPath, testEnvPath } from "./env";
// tslint:disable-next-line:no-var-requires
const { setup: setupPuppeteer } = require("jest-environment-puppeteer");
import puppeteer from "puppeteer";

function readdir(directory: string): Promise<Dirent[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(
      directory,
      {
        withFileTypes: true,
      },
      (error, dirents) => {
        if (error) {
          reject();
          return;
        }

        resolve(dirents);
      },
    );
  });
}

async function getFilesEndsWithRecursively(
  directory: string,
  endsOfPaths: string[],
): Promise<string[]> {
  const items = await readdir(directory);
  const testCodePaths: string[] = [];
  await Promise.all(
    items.map(async (item) => {
      const itemPath = path.join(directory, item.name);
      if (!itemPath) {
        return;
      }
      if (item.isFile() && endsOfPaths.some((x) => itemPath.endsWith(x))) {
        testCodePaths.push(itemPath);
      }
      if (item.isDirectory()) {
        const codePaths = await getFilesEndsWithRecursively(
          itemPath,
          endsOfPaths,
        );
        testCodePaths.push(...codePaths);
      }
    }),
  );

  return testCodePaths;
}

async function setRequires() {
  const browserTestDirectoryPath = path.join(__dirname, "browserTest");

  const browserTestCodePaths = await getFilesEndsWithRecursively(
    browserTestDirectoryPath,
    [".browsertest.ts", ".browsertest.tsx"],
  );
  const requiresFilePath = path.join(settingsPath, "requires.ts");

  const requiresFileContent = browserTestCodePaths
    .map((browserTestCodePath) =>
      path.relative(settingsPath, browserTestCodePath),
    )
    .map(
      (browserTestCodePath) =>
        `console.log(require("${browserTestCodePath.replace(/\\/g, "/")}"));`,
    )
    .join("\n");

  await new Promise((resolve, reject) => {
    fs.writeFile(requiresFilePath, requiresFileContent, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

async function setTestEnv() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`);
  await page.waitForSelector("#root");

  const itTestCaseNames = (await page.evaluate(() => {
    return (window as any).itTestCaseNames;
  })) as string[];

  const testEnvContent = `export const itTestCaseNames = ${JSON.stringify(
    itTestCaseNames,
    null,
    2,
  )};`;
  await new Promise((resolve, reject) => {
    fs.writeFile(testEnvPath, testEnvContent, { encoding: "utf-8" }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });

  await browser.close();
}

module.exports = async (globalConfig: any) => {
  await setupPuppeteer(globalConfig);

  await setRequires();

  await startBundleSever(port);

  await setTestEnv();
};
