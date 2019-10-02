import { start } from "./slsUtils";

start().catch((err) => {
  console.log("error!");
  console.error(err);
  const buffer = err as Buffer;
  console.log(buffer.toString("utf-8"));
});
