const Koa = require('koa');
const Router = require('koa-router');
const render = require('koa-swig');
const serve= require('koa-static');
const path=require('path');
const co=require('co');
const axios=require('axios');
const bodyParser = require('koa-body');
var app = new Koa();
var router = new Router();

 
app.context.render = co.wrap(render({
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: 'memory', // disable, set to false 
  ext: 'html',
  writeBody:false
}));
 
app
  .use(serve('.'))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());
  // GET request for remote image
router
  .get('/', async(ctx, next) => {
    ctx.body=await ctx.render("index.html",{
      title:'图书管理系统-首页'
    });
    // ctx.body = 'Hello 1111';
  })
  .get('/list', async(ctx, next) => {
    ctx.body=await ctx.render("list.html",{
      title:'列表'
    });
  })
  .get('/login', async(ctx, next) => {
    ctx.body=await ctx.render("login.html",{
      title:'登陆页'
    });
  })
  .get('/edit', async(ctx, next) => {
    console.log(ctx.request.query);
    if(ctx.request.query){
      ctx.body=await ctx.render("edit.html",{
        title:'编辑'
      });
    }else{
      ctx.body=await ctx.render("edit.html",{
        title:'新增'
      });
    }
  })
  .get('/apiList',async(ctx, next) =>{
    const {data}=await axios.get('http://127.0.0.1:8080/index.php?r=site/get-books');
    console.log(data);
    ctx.body=data;
    // axios({
    //   method:'get',
    //   url:'http://127.0.0.1:8080/index.php?r=site/get-books',
    //   responseType: 'json'
    // })
    // .then(function(response) {
    //   // myData=response.data;
    //   console.log(response.data);
    //   // ctx.body=response.data;
    // });
  })
  .get('/apiListId',async(ctx, next) =>{
    const {data}=await axios.get('http://127.0.0.1:8080/index.php?r=site/get-book&id='+ctx.request.query.id);
    // console.log(data);
    ctx.body=data;
  })
  // 按id删除
  .get('/deleteId',async(ctx, next) =>{
    const {data}=await axios.get('http://127.0.0.1:8080/index.php?r=site/delete-book&id='+ctx.request.query.id);
    console.log(data);
    ctx.body=data;
  })
  // 新增&修改
  .post('/apiEdit', async(ctx, next) => {
    console.log(ctx.request.body);
    // ctx.body = ctx.request;
    const {data}=await axios.post('http://127.0.0.1:8080/index.php?r=site/edit-book',ctx.request.body);
    ctx.body=data;
  })
  .put('/users/:id', (ctx, next) => {
    // ...
  })
  .del('/users/:id', (ctx, next) => {
    // ...
  })
  .all('/users/:id', (ctx, next) => {
    // ...
  });
// // x-response-time

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   console.log(ctx);
//   await next();
//   const ms = Date.now() - start;
//   ctx.set('X-Response-Time', `${ms}ms`);
// });

// // logger

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}`);
// });

// // response

// app.use(async ctx => {
//   ctx.body = 'Hello koa';
// });
// app.on('error', err => {
//   log.error('server error', err)
// });
app.listen(3000,()=>{
  console.log("Server Started!");
});
app.listen(3001);