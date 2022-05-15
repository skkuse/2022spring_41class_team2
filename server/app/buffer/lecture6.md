## 6.자료형
### format
#### 문자열.format()
#### 문자열의 대괄호 자리에 format 뒤의 괄호안에 들어있는 값을 하나씩 넣는다.
#### 문자열에 포함된 대괄호 개수 보다 format안에 들어 있는 값의 수가 많으면 정상 동작
#### print('{} 번 손님'.format(number,greeting))
#### 문자열에 포함된 대괄호 개수 보다 format안에 들어 있는 값의 수가 적으면 에러
#### print('{} 번 손님 {}'.format(number))
#### number = 20
#### welcome = '환영합니다'
#### base = '{} 번 손님 {}'
#### 아래 3개의 print는 같은 값을 출력 (20 번 손님 환영합니다)
#### print(number,'번 손님',welcome)
#### print(base.format(number,welcome))
#### print('{} 번 손님 {}'.format(number,welcome))
####
### 정수
#### 영어로 integer, 줄여서 파이썬에서는 int라고 표현
#### 실수를 정수로 바꾸려면 int를 이용
#### a=int(5.4)라고 하면 a는 5를 값으로 가지게 된다.
### 실수
#### 부동소수점이라는 표현법을 이용해 소숫점을 표시할 수 있는 숫자
#### 계산에 있어서 완벽한 정확성은 가지지 않는다.
#### 0.1+0.1+0.1 == 0.3 #FALSE
#### 정수를 실수로 바꾸려면 float를 사용
#### a=float(5)라고 하면 a는 5.0을 값으로 가지게 된다.