//import와 같음, express modle이 필요할 때 사용, express 호출 시 app 생성됨
const express = require('express')
const app = express()
const port = 3000

//app 자체 = 백엔드 서버, app.get = 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 1) path parameter 방식, user/ 다음에 바로 유저의 id 들어옴
app.get('/user/:id', (req, res) => {
  res.send(`User id is ${req.params.id}`); // Or res.send('User id is ' + req.params.id); 
})

// 2) query string 방식
// In zsh, u should try curl "http://localhost:{port}/user?id={ur-id}"
app.get('/user', (req, res) => {
  res.send(`User id is ${req.query.id}`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
