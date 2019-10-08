import koaBody from "koa-body";
import Koa from "koa";
import applyRouter from "./router";
import cors from "@koa/cors";
import StorageServiceS3 from "./StorageServiceS3";

const PORT: number = process.env.NODE_ENV === "production" ? 4001 : 4002;

export const app = new Koa();

app.use(cors());
app.use(
  koaBody({
    multipart: true,
  }),
);

applyRouter(app, new StorageServiceS3());

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
