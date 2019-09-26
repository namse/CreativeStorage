import Koa from "koa";
import { fileApiRouter } from "./router";
import koaBody from "koa-body";

const app = new Koa();

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
