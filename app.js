//import와 같음, express modle이 필요할 때 사용, express 호출 시 app 생성됨
const express = require('express')
const app = express()
const port = 3000

//app 자체 = 백엔드 서버, app.get = 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
