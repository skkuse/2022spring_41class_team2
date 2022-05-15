### 실습4
#### 조건문
매 6시간마다 종이 울리는 시계를 구현하기 위해 hour에 저장된 현재 시간이 0,6,12,18시(6의 배수)일때만 코드3번째줄의 print문이 실행되도록 코드에 if문을 추가하세요. (%사용)
```shell from datetime import datetime 
hour = datetime.now().hour
#현재 시간이 6의 배수일 때만 print문이 실행되도록 아래줄에 if문을 추가하세요
	print('종이 울립니다.')
```
