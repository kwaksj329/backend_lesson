//import와 같음, express modle이 필요할 때 사용, express 호출 시 app 생성됨
var express = require('express');
const logger = require('morgan');
const axios = require('axios');
const list = require('./data');
const firebase = require('./firebase');

var app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({'extended' : true}));
app.use(logger('dev'));
app.use(express.static('public'));   // html, image 등 정적파일 제공 폴더 지정

//app 자체 = 백엔드 서버
app.get('/', (req, res) => {
  res.sendFile('index.html')
});

// 1) path parameter 방식, user/ 다음에 바로 유저의 id 들어옴
//curl localhost:3000/user/tommy
app.get('/user/:id', (req, res) => {
  res.send(`User id is ${req.params.id}`); // Or res.send('User id is ' + req.params.id); 
});

// 2) query string 방식
// In zsh, u should try curl "http://localhost:{port}/user?id={ur-id}" //curl "http://localhost:3000/user?id=tommy"
app.get('/user', (req, res) => {
  res.send(`User id is ${req.query.id}`);
});

// curl -X POST localhost:3000/user -d '{"id" : "jyc", "name" : "Jae Young"}' -H "Content-Type: application/json"
app.post('/user', (req, res) => {
  console.log(req.body.name);
  res.send(req.body);    
});

app.get('/music_list', (req,res) => {
  res.json(list);
});

app.get('/likes', async (req, res) => {
  var db = firebase.firestore();
  const snapshot = await db.collection('likes').get().catch(e => console.log(e));
  var results = [];
  if (snapshot.empty){
    console.log("No result");
    res.json([]);
    return;
  }else{
    snapshot.forEach(doc => {
      results.push({id : doc.id, like : doc.data().like})
      console.log(doc.id, '=>', doc.data());
    })
    res.json(results);
  }
})

// curl localhost:3000/musicSearch/blackpink
// 비동기 함수, async 꼭 들어가야함, (npm install --save axios)
app.get('/musicSearch/:term', async (req, res) => {
  const params = {
    term : req.params.term,
    entity : "album",
  }
  var response = await axios.get('https://itunes.apple.com/search', {params : params}).catch(e => console.log(e));
  console.log(response.data);
  res.json(response.data);
});

app.get('/likes/:id' , async (req, res) => {

  let db = firebase.firestore();
  try {
    let ref = db.collection('likes').doc(String(req.params.id));
    ref.get().then((doc) => {
        if (doc.exists) {
            ref.delete();    
        }
        else {
            ref.set({like : true});
        }
        res.json({msg : "OK"});
    }).catch((e) => {
        console.log('Error while accessing Firestore : ' + e);
        res.json({msg : "Failed"});
    });
  }
  catch (e) {
    console.log('Error Occurred : '+ e);
    res.json({msg : "Failed"});
  } 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
