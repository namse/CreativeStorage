import "./requires";
import { testCaseMap } from "./it";
export { testCaseNames } from "./it";

async function runTest(testCaseName: string): Promise<void> {
  await testCaseMap[testCaseName]();
}

if (typeof window !== "undefined") {
  (window as any).runTest = runTest;
}
