const Koa = require('koa');
var app = new Koa();
app.listen(3000,()=>{
    console.log("Server Started!");
});