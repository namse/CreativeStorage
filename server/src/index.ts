import Koa from "koa";
import router from "./router";
import koaBody from "koa-body";

const app = new Koa();
const PORT: number = process.env.NODE_ENV === "production" ? 4001 : 4002;
app.use(koaBody({
  multipart: true,
}));

app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx, next) => {
  ctx.status = 404;
});

app.on("error", (err, ctx) => {
  console.log(err.message);
  ctx.status(err.status || 500);
});

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

export default app;
