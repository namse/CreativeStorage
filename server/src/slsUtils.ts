import { spawn } from "child_process";

let slsProcess: any;
const start = () => {
  return new Promise((resolve, reject) => {
    slsProcess = spawn("npm", ["run", "sls-offline", "--noTimeout"]);
    slsProcess.stdout.on("data", (data: any) => {
      if (data.includes("Offline listening on")) {
        resolve();
      }
    });
    slsProcess.stderr.on("data", (err: any) => {
      reject(err);
    });
  });
};
export const stop = () => {
  slsProcess.kill();
};

export default start;
