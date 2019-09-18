import Koa from "koa";
import router from "./router";
import koaBody from "koa-body";

const app = new Koa();
const PORT: number = process.env.NODE_ENV === "production" ? 4001 : 4002;

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: __dirname + "/uploads",
    },
  }),
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});

export default app;
