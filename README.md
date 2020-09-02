## Code on Board


## I. 프로젝트 소개



![캡처](https://user-images.githubusercontent.com/17774917/83146930-ed9a4000-a131-11ea-9035-8ee1bd74d214.JPG)



**알고리즘 보드게임 플랫폼 코드 온 보드(Code on board)**


본 프로젝트는 일정수준의 코딩이 가능하고 기본적인 알고리즘이 숙지된 사람들을 대상으로 한다.
8x8 보드판에서 게임에 대한 알고리즘 대전을 제공하는 웹사이트를 개발하는 것이 목표다.
사용자는 본 서비스를 통해 작성한 코드로 사람들과의 대전을 하고 점수 경쟁을 통해 알고리즘 트레이닝을 지속할 수 있는 동기를 얻을 수 있다.
또한 리플레이 기능과 내 코드와의 대전을 통해 자신의 코드를 리뷰할 수 있는 기회를 시각적으로 얻을 수 있다.

  
  
**Algorithm Board Game Platform Code On Board**

The goal of this project is to develop a web service that provides algorithm warfare for games on 8x8 board to people who can code at a certain level and have studied basic algorithms.
With codes written through this service, users can have an incentive to compete against people and to continue algorithm training through score competitions, and to review their codes visually through replays and battle with my codes.

## II. 사용법

### API 서버
```
  1. pip install requirements.txt 를 사용하여 필요한 모듈을 설치한다.
  2. capstone-2020-16/api 위치에서 다음 명령어를 실행한다.
  3. python3.6 manage.py runserver 0.0.0.0:port
  4. 설정한 포트로 API서버를 배포할 수 있다.
```

### Core 서버
```
  1. Docker, Celery와 redis를 설치한다.
  2. capstone-2020-16/core 디렉토리에서 sudo docker build -t core . 명령어를 통해 docker imgae를 생성한다.
  3. 터미널 창에서 redis-server를 통해 redis를 켠다
  4. capstone-2020-16/core 디렉토리에서 Celery -A tasks worker –loglevel=info 명령어를 통해 Celery를 실행한다.
```

### 클라이언트 서버
* Installation
```
  # clone the repo
  $ git clone https://github.com/kookmin-sw/capstone-2020-16.git
  
  # go to app's directory
  $ cd capstone-2020-16/front/
  
  # install app's dependencies
  $ yarn install
```
      
* Create React App
```
  # dev server with hot reload at http://localhost:3000
  $ yarn start
```


* Build
```
  # build for production with minification
  $ yarn build
```
