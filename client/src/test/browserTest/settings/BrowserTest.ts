import "src/test/browserTest/settings/requires";
import {
  itTestCaseList,
  itTestCaseNames,
} from "src/test/browserTest/settings/it";

async function runTest(testCaseName: string): Promise<void> {
  await itTestCaseList[testCaseName]();
}

(window as any).runTest = runTest;
(window as any).itTestCaseNames = itTestCaseNames;
