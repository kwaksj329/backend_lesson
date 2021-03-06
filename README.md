# backend_lesson

## HTTP Protocol

### HTTP Method

***HTTP 메소드는 클라이언트가 웹 서버에게 사용자 요청의 목적이나 종류를 알리는 수단이다.***  

* `GET` - 웹 브라우저를 통해서 가져올 수 있는 일반적인 것, url 창으로 어떤 정보를 가져올 수 있는 HTTP Method
    * 리소스 조회
    * GET은 뭔가를 보낼 때 path에 parameter를 줘서 보낼 수 있다.
    * GET 명령은 웹 브라우저의 url 창으로 보낼 수 있는 거의 유일한 HTTP method이다.

* GET 말고 아래 method들은 웹 브라우저의 url 창으로는 정보를 가져올 수 없다. (중요!)
* 읽고있는 HTML 파일 안의 javascript 코드로 명령을 내리며 정보를 가져올 수 있다.
* POST나 PUT도 GET처럼 path에 parameter를 줘서 보낼수도 있지만 json 형태의 data를 따로 보낼 수 있다.

* `PUT` - 정보 수정, 리소스를 대체, 해당 리소스가 없으면 생성
* `POST` - 정보 생성, 요청 데이터 처리, 주로 데이터 등록에 사용
* `DELETE` - 리소스 삭제

* 같은 주소에, 같은 url에, 같은 port에 웹서버가 연결되어 있으면  
    * 같은 url = 서버의 주소뿐만 아니라 웹 주소 밑에 폴더의 위치일수도 있고 해당하는 정보를 접속할 수 있는 굉장히 많은 정보의 구분자  

ex) https://itunes.apple.com/search?item=blackpink.. 에서 .com까지는 웹서버 주소, search 이후는 정보를 추적해서 들어갈 수 있는 path  

같은 path, 주소, url에 대해서도 여러 method 줄 수 있음  

```md
Q) 로그인 페이지에서 id와 password를 받아들여서 처리하는 역할을 GET method로 하는 것이 맞을까?
A) NO
```

* GET이라는 메소드는 웹 브라우저 url 창으로 정보를 전달할 때 parameter를 전달하는데 예를 들어 url?id=tommy&pass=kkk 이런식으로 전달할 수 있기 때문에 보안상 위험함 (할 수는 있지만 바람직하지 않음), 따라서 보통 POST 메소드 사용  

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

* 내가 만든 웹 페이지의 path가 정해지지 않고 사이트 이름만 GET 메소드로 루트를 접근하는 request가 있었다 하면 그 request에 대해서는 response로 헬로 월드를 실행하는 코드  

---

```js
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

* listen이 있어야 서버 돌아감!!
* node app.js 로 실행시키고 있어야 http://localhost:3000/ 로 확인 가능

---

```js
// In zsh, u should try curl "http://localhost:{port}/user?id={ur-id}"
app.get('/user', (req, res) => {
  res.send(`User id is ${req.query.id}`);
})
```

* http://localhost:3000/user?id=kwaksj329 가 아니라 http://localhost:3000/user?key=kwaksj329 이런식으로 접근하면 User id is undefined 가 출력된다.
    * id는 있지만 query parameter로 key는 없음!

---

* 웹 브라우저에서는 POST 메소드 실험 불가 - curl command 사용 또는 POSTMAN 사용

```bash
curl -X POST localhost:3000/user -d '{"id" : "jyc", "name" : "Jae Young"}' -H "Content-Type: application/json"
```

* 여기서 -d는 data, {} 안에는 key와 value, -H는 헤더 (컨텐트 데이터 타입 꼭 지정해줘야함)  

* POST /user 200 4.116ms - 31 = POST 메소드로 왔고, url은 /user 이며 response에 대한 status code는 200으로 success이다 걸린 시간은 4.116ms

---

* 옛날 웹 프로그래밍 방식) 어떤 요청이 왔을 때 HTML 파일 다시 보내줬었음

* 요즘은 웹서버에서 데이터만 받는 형식으로 변함 (데이터를 던져주는 효과적인 방법은 json 데이터 보내주기, res.json())

```js
app.get('/musicSearch/:term', async (req, res) => {
  const params = {
    term : req.params.term,
    entity : "album",
  }
  var response = await axios.get('https://itunes.apple.com/search', {params : params});
  console.log(response.data);
  res.json(response.data);
});
```

* path param으로 term을 받고 json 객체를 만들어서 term과 entity 설정

* axios 모듈에다가 get이라는 HTTP 메소드로 parameter와 url로 요청 -> await (요청 완료까지 기다림) -> 결과 나오면 그 response 저장 -> response에 있는 data 뿌려줌

---

* index.html에 포함된 react.js 로 만든 프로그램에서 웹서버에서 어떤 요청이 있을 땐 fetch 로 요청

```js
fetch('/musicSearch/').then((r)=> r.json()).then((d) => {console.log(d.data)})
```

* 호출해서 받아온거를 json으로 바꾸고 그것에 대해 어떤 일을 할것인지 정함

---

### 배운 내용 정리

1. 루트 -> index.html 보여줌
2. GET 메소드 -> path parameter
3. GET 메소드 -> query parameter
4. POST 메소드 -> massege body가 들어왔을 때 처리
5. json 데이터 보내는 방법
6. 다른 사이트에 접속해서 response 받아서 그 데이터를 json으로 보내는 방법

* front 웹에서 바로 firebase 접속하는 것이 아닌 front 웹에서 일어난 일이 서버에 전달이 되고 그 웹 서버에서 firebase에 접속해서 변화를 주게끔 변경
  * WHY? firebase라는 모듈을 자바스크립트에 포함시키면 사이즈가 매우 크고 무겁고 network bandwidth에 영향을 주기도 하기 때문  
  * firebase api key와 같은 정보들이 프론트에 있으면 보안상 좋지 않음

---

### 과제

* 프론트에서 좋아요 누르면 서버를 통해 firebase 접속해서 좋아요가 반영이 되도록함
  * 제출 시 firebase key 파일들 포함되어야 실행 확인 가능

```js
app.get('/likes/:id', async (req, res) => {
  /* 목록에 있으면 삭제, 
  목록에 없으면, 추가
  프론트앱은 고치지 않아도 됨*/
})
```