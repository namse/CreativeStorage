export const testCaseMap: { [testCaseName: string]: () => any } = {};

export const testCaseNames: string[] = [];

export function it(text: string, testMethod: () => any) {
  testCaseMap[text] = testMethod;
  testCaseNames.push(text);
}
