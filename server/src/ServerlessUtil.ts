import { spawn, ChildProcessWithoutNullStreams } from "child_process";

const isWindows: boolean = /^win/.test(process.platform);
const npmCommand: string = isWindows ? "npm.cmd" : "npm";

let slsProcess: ChildProcessWithoutNullStreams;
export function start(): Promise<string | Error> {
  return new Promise((resolve, reject) => {
    slsProcess = spawn(npmCommand, ["run", "sls-offline", "--", "--noTimeout"]);
    slsProcess.stdout.on("data", (data) => {
      const log: string = (data as Buffer).toString("utf-8");
      if (log.includes("listening on")) {
        resolve(log);
      }
    });
    slsProcess.stderr.on("data", (data) => {
      const log: string = (data as Buffer).toString("utf-8");
      reject(log);
    });
    slsProcess.on("error", (data) => {
      reject(data);
    });
  });
}

export function stop(): void {
  slsProcess.kill();
}
