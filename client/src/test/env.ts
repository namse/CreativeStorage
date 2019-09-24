import path from "path";

export const port = 12345;
export const settingsPath = path.join(__dirname, "./browserTest/settings");
export const testEnvPath = path.join(settingsPath, "testEnv.ts");
