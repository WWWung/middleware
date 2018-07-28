//to use
const app = require('./lib/core')()
const SERVER_CONFIG = {
  host: process.env.IP || 'localhost',
  port: process.env.PORT || 8888
}
app.use('/', function(req, res, next) {
  //MiddleWare
  next()
})
app.get('/', function(req, res) {
  //handler
})
app.get('/user/:id', function(req,res) {
  //to user params
  const _id = req.params.id
})
app.listen(SERVER_CONFIG.port, SERVER_CONFIG.host);
