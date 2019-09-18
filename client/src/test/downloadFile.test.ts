import App from "../App";

test("download file from server(via koa)", () => {
  const result = App.downloadFile("testfile.mp4");
  expect(result).toEqual(3);
});
