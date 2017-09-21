## 클라이언트
- src/index.js - store 연결(최종 렌더)
- src/App.js - components 폴더 연결

- components/Routes.js - 라우팅
- components/lib/ - 필요 라이브러리 

- components/pages/ - URL 렌더 (네이밍: 'URL'Page)
- components/views/ - 컴포넌트(컨테이너 포함)

## 서버
- src/index.js - db연결, node
- src/app.js - express

- db/ - db 설정, 스키마
- api/ - api 설정 (로직 : ctrl.js, 라우팅 : index.js)