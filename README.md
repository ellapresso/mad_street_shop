# `MAD-STREET-#(shop)`

## SYSTEM

### 요구사항

- 권장요구사항: 노드 v10.16.0
- 최소요구사항: 노드 v10 이상

## 스크립트 명령어

### 프로젝트 실행

```
$ npm start
```

<br>

## 환경설정 (.env)

```
SSS_DATABASE_TYPE={데이터베이스 타입}
SSS_DATABASE_HOST={데이터베이스 호스트}
SSS_DATABASE_PORT={데이터베이스 포트}
SSS_DATABASE_USERNAME={데이터베이스 접속 유저이름}
SSS_DATABASE_PASSWORD={데이터베이스 접속 비밀번호}
SSS_DATABASE_DBNAME={데이터베이스 이름}
SSS_DATABASE_PATH={데이터베이스 패스}
```

<br>

## git flow 사용방법

> develop 브랜치로부터 feature브랜치를 생성한다. 주요기능은 feature 브랜치를 , master나 develop에서 발생한 버그는 bugfix를 생성하여 사용한다. master에서 bugfix를 생성하여 merge하는 경우, develop에도 merge해 준다.

사용 예시 :

- git flow feature  
  : feature 리스트보기
- git flow feature start [브랜치명]  
  : feature 브랜치 생성
- git flow feature finish [브랜치명]  
  : 브랜치 종료 및 develop 브랜치에 merge
- git flow bugfix [브랜치명]  
  : bugfix 브랜치 생성
- git flow -help  
  : 그 외 명령어 확인
