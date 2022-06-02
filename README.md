# 2022spring_41class_team2

성균관대 학생등을 대상으로 하는 파이썬 교육 웹사이트 제작 프로젝트 입니다.

http://ec2-3-34-43-169.ap-northeast-2.compute.amazonaws.com/

# 프로그램 세팅 방법

## 버전
- Node : 17.5
- Python : 3.7

## Install Dependencies

### 프로그램 실행 관련
```shell
npm install concurrently
```
### 프론트 엔드 환경
```shell
cd client
npm install .
```
### 벡엔드 환경 설정
```shell
conda create env -n {env_name} python=3.7
cd server
pip install -r requirement.txt
```
<br>

# 프로그램 실행 방법
```shell
conda activate {env_name}
npm run dev
```
