import Koa from "koa";
import KoaBody from "koa-body";
import api from "./router";

const app = new Koa();

// app.use(KoaBody({
//   multipart: true,
//   formidable: {
//     uploadDir: __dirname + "/uploads/",
//   },
// }));

app.use(KoaBody());
app.use(api.routes());
app.use(api.allowedMethods());

app.listen(4000, () => {
    console.log("heurm server is listening to port 4000");
});
