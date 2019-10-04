import { spawn, ChildProcessWithoutNullStreams } from "child_process";

const isWindows = /^win/.test(process.platform);
const npmCommand = isWindows ? "npm.cmd" : "npm";

let slsProcess: ChildProcessWithoutNullStreams;
export const start = () => {
  return new Promise((resolve, reject) => {
    slsProcess = spawn(npmCommand, ["run", "sls-offline", "--", "--noTimeout"]);
    slsProcess.stdout.on("data", (data) => {
      const log = (data as Buffer).toString("utf-8");
      if (log.includes("listening on")) {
        resolve();
      }
    });
    slsProcess.stderr.on("data", (data) => {
      const log = (data as Buffer).toString("utf-8");
      reject(log);
    });
    slsProcess.on("error", (data) => {
      reject(data);
    });
  });
};

export const stop = () => {
  slsProcess.kill();
};
