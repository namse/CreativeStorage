import "./requires";
import { itTestCaseList } from "./it";
export { itTestCaseNames } from "./it";

async function runTest(testCaseName: string): Promise<void> {
  await itTestCaseList[testCaseName]();
}

if (typeof window !== "undefined") {
  (window as any).runTest = runTest;
}
