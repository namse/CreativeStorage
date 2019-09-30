import Koa from "koa";
import { fileApiRouter } from "./router";
import koaBody from "koa-body";
import AWS from "aws-sdk";

const s3 = new AWS.S3();
const app = new Koa();

const params = { Bucket: "testbucket", Key: "testobject", Body: "Hello from MinIO!!" };
s3.putObject(params, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully uploaded data to testbucket/testobject");
  }
});

const PORT: number = process.env.NODE_ENV === "production" ? 4001 : 4002;
app.use(koaBody({
  multipart: true,
}));

app.use(fileApiRouter.router.routes());
app.use(fileApiRouter.router.allowedMethods());
app.use(async (ctx, next) => {
  ctx.status = 404;
});

app.on("error", (err, ctx) => {
  console.log(err);
  ctx.status = 500;
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`);
  });
}
export { app };
