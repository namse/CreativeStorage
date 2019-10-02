import Koa from "koa";
import KoaRouter from "koa-router";

const serverlessRouter = new KoaRouter();

serverlessRouter.get("/getTest", (ctx: Koa.Context) => {
  ctx.body = "GET-OK!!";
  ctx.status = 200;
});

serverlessRouter.post("/postTest", (ctx: Koa.Context) => {
  const body = JSON.parse(ctx.request.body);

  ctx.body = body.client + " world!!";
  ctx.status = 200;
});

export default serverlessRouter;
