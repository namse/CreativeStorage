import * as bundleServer from "src/test/browserTest/settings/bundleServer";

const portTagIndex = process.argv.findIndex((arg) => arg === "--port");
if (portTagIndex < 0 || process.argv.length <= portTagIndex + 1) {
  console.log("provide port : --port {{port}}");
  process.exit();
}

const port = parseInt(process.argv[portTagIndex + 1], 10);

async function runBundleServer() {
  await bundleServer.startBundleSever(port);
}

runBundleServer().catch((err) => console.error(err));
