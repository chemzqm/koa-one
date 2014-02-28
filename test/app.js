var koa = require('koa');
var redis = require('redis');
var m = require('..');

var app = koa();
app.proxy = true;
app.outputErrors = true;
app.keys = ['secret key', 'ha'];

app.use(m.favicon());
app.use(m.logger());
app.use(m.responseTime());
app.use(m.sess());
app.use(m.body());
app.use(m.compress());
app.use(m.session());
app.use(m.etag());
app.use(m.conditionalGet())
app.use(m.serve(__dirname));
app.use(m.ratelimit({
  db: redis.createClient(),
  duration: 60000,
  max: 100
}));
//app.use(m.rewrite(/^\/i(\w+)/, '/items/$1'));
//app.use(m.router(app));
//app.use(m.mount('/hello', a));

app.listen(3000, function () {
  console.log('server started at port 3000');
})
