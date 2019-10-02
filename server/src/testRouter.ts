import Koa from "koa";
import KoaRouter from "koa-router";

const testRouter = new KoaRouter();

testRouter.get("/getTest", (ctx) => {
  ctx.body = "GET-OK!!";
  ctx.status = 200;
});

testRouter.post("/postTest", (ctx: Koa.Context) => {
  const body = JSON.parse(ctx.request.body);

  ctx.body = body.client + " world!!";
  ctx.status = 200;
});

export default testRouter;
