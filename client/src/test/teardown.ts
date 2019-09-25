import {
  stopBundleServer,
} from "./browserTest/settings/bundleServer";
// tslint:disable-next-line:no-var-requires
const { teardown: teardownPuppeteer } = require("jest-environment-puppeteer");

module.exports = async (globalConfig: any) => {
  await teardownPuppeteer();
  await stopBundleServer();
};
