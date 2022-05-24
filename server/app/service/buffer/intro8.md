#### for문의 기본 구조
for문의 기본 구조는 다음과 같다.
```
for 변수 in 리스트(또는 튜플, 문자열):
    수행할 문장1
    수행할 문장2
    ...
```
리스트나 튜플, 문자열의 첫 번째 요소부터 마지막 요소까지 차례로 변수에 대입되어 "수행할 문장1", "수행할 문장2" 등이 수행된다.


다음 예시를 통해 for문 이해해보자
```
>>> test_list = ['one', 'two', 'three'] 
>>> for i in test_list: 
...     print(i)
... 
one 
two 
three
```
['one', 'two', 'three'] 리스트의 첫 번째 요소인 'one'이 먼저 i 변수에 대입된 후 print(i) 문장을 수행한다. 다음에 두 번째 요소 'two'가 i 변수에 대입된 후 print(i) 문장을 수행하고 리스트의 마지막 요소까지 이것을 반복한다.

##### for문과 continue
while문에서 살펴본 continue문을 for문에서도 사용할 수 있다. 즉 for문 안의 문장을 수행하는 도중에 continue문을 만나면 for문의 처음으로 돌아가게 된다.


앞에서 for문 응용 예제를 그대로 사용해서 60점 이상인 사람에게는 축하 메시지를 보내고 나머지 사람에게는 아무 메시지도 전하지 않는 프로그램을 에디터를 사용해 작성해 보자.
```
# marks2.py 
marks = [90, 25, 67, 45, 80]

number = 0 
for mark in marks: 
    number = number +1 
    if mark < 60:
        continue 
    print("%d번 학생 축하합니다. 합격입니다. " % number)
```
점수가 60점 이하인 학생일 경우에는 mark < 60이 참이 되어 continue문이 수행된다. 따라서 축하 메시지를 출력하는 부분인 print문을 수행하지 않고 for문의 처음으로 돌아가게 된다.
##### for문과 continue
while문에서 살펴본 continue문을 for문에서도 사용할 수 있다. 즉 for문 안의 문장을 수행하는 도중에 continue문을 만나면 for문의 처음으로 돌아가게 된다.


앞에서 for문 응용 예제를 그대로 사용해서 60점 이상인 사람에게는 축하 메시지를 보내고 나머지 사람에게는 아무 메시지도 전하지 않는 예제를 보자.
```
# marks2.py 
marks = [90, 25, 67, 45, 80]

number = 0 
for mark in marks: 
    number = number +1 
    if mark < 60:
        continue 
    print("%d번 학생 축하합니다. 합격입니다. " % number)
```
점수가 60점 이하인 학생일 경우에는 mark < 60이 참이 되어 continue문이 수행된다. 따라서 축하 메시지를 출력하는 부분인 print문을 수행하지 않고 for문의 처음으로 돌아가게 된다.
