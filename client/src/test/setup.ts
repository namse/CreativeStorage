import fs, { Dirent } from "fs";
import path from "path";
const { setup: setupPuppeteer } = require("jest-environment-puppeteer");

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

module.exports = async (globalConfig: any) => {
  await setupPuppeteer(globalConfig);

  const browserTestDirectoryPath = path.join(__dirname, "browserTest");

  const browserTestCodePaths = await getFilesEndsWithRecursively(
    browserTestDirectoryPath,
    [".browsertest.ts", ".browsertest.tsx"],
  );
  const settingsPath = path.join(__dirname, "./browserTest/settings");
  const requiresFilePath = path.join(settingsPath, "requires.ts");

  const requiresFileContent = browserTestCodePaths
    .map((browserTestCodePath) =>
      path.relative(settingsPath, browserTestCodePath),
    )
    .map(
      (browserTestCodePath) =>
        `require("${browserTestCodePath.replace(/\\/g, "/")}");`,
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
};
