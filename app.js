//import와 같음, express modle이 필요할 때 사용, express 호출 시 app 생성됨
var express = require('express')
const logger = require('morgan');
var app = express()
const port = 3000

app.use(express.json)
app.use(express.urlencoded({extended : true}));
app.use(logger('dev'));

//app 자체 = 백엔드 서버
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 1) path parameter 방식, user/ 다음에 바로 유저의 id 들어옴
//curl localhost:3000/user/tommy
app.get('/user/:id', (req, res) => {
  res.send(`User id is ${req.params.id}`); // Or res.send('User id is ' + req.params.id); 
})

// 2) query string 방식
// In zsh, u should try curl "http://localhost:{port}/user?id={ur-id}" //curl "http://localhost:3000/user?id=tommy"
app.get('/user', (req, res) => {
  res.send(`User id is ${req.query.id}`);
})

// curl -X POST localhost:3000/user -d '{"id" : "jyc", "name" : "Jae Young"}' -H "Content-Type: application/json"
app.post('/user', (req, res) => {
  console.log(req.body.name);
  res.send(req.body);    
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
