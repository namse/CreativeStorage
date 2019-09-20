import Bundler, { ParcelOptions } from "parcel-bundler";
import path from "path";
import os from "os";
import { Server } from "http";

const outDir = os.tmpdir();

const file = path.join(__dirname, "./index.html");

const options: ParcelOptions = {
  outDir,
  outFile: "index.html",
  watch: false,
};

const bundler = new Bundler(file, options);

let server: Server;

export async function startBundleSever(port: number): Promise<void> {
  server = await bundler.serve(port);
}

export function stopBundleServer() {
  server.close();
}
