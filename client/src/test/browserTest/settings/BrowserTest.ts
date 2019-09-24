import "./requires";
import { itTestCaseList, itTestCaseNames } from "./it";

async function runTest(testCaseName: string): Promise<void> {
  await itTestCaseList[testCaseName]();
}

(window as any).runTest = runTest;
(window as any).itTestCaseNames = itTestCaseNames;
