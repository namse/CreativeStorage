export const itTestCaseList: { [testCaseName: string]: () => any } = {};

export const itTestCaseNames: string[] = [];
export const describeNames: string[] = [];

export function it(text: string, testMethod: () => any) {
  itTestCaseList[text] = testMethod;
  itTestCaseNames.push(text);
}

export function test(text: string, testMethod: () => any) {
  itTestCaseList[text] = testMethod;
  itTestCaseNames.push(text);
}

export function describe(text: string, testMethod: () => any) {
  describeNames.push(text);
  testMethod();
}
