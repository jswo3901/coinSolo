## 클라이언트
- src/index.js : store 연결(최종 렌더링)

- URL - 폴더 이름 같게 (ex. localhost/user -> User)

- App/ : 라우팅 등 범용 파일

- lib/ : 라이브러리

- App/Routes.js : 라우팅파일

### */
- path : 컴포넌트 경로 변경(import Example from './path')

- index.js : 렌더링 컴포넌트

- UrlName.js : 부속 컴포넌트(컨테이너 포함, 주석으로 컴포넌트 구분)

- styles.css : 스타일파일

- controller.js : 액션 및 리듀서

## 서버
- index.js : db연결, node
- app.js : express

- db/ : db 설정, 스키마

- api/ : api 설정 (로직 : ctrl.js, 라우팅 : index.js)