import Router from "koa-router";
import fs from "fs";

const router = new Router();

const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + "/uploads/data", "utf8", (err, data) => {
      if (err) {
         reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFile = (data: Buffer) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(__dirname + "/uploads/data", data, "utf8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

router.post("/uploadFile", async (ctx) => {
  ctx.status = 200;
  const obj = ctx.request.body;
  console.log('ctx.request.body',obj);
  await writeFile(obj.file);
  ctx.body = "uploadFile";
});

router.get("/downloadFile", async (ctx) => {
    console.log("다운로드!!");
    ctx.status = 200;
    ctx.body = await readFile();
});

router.get("/", async (ctx) => {
  // i don't know what to do
  ctx.status = 200;
  ctx.body = "루트 경로!";
});

export default router;
