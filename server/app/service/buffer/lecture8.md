## 8. for 반복문
#### for in 반복문
 코드를 필요한만큼 반복해서 실행
##### for in list
```shell
for pattern in patterns:
    print (pattern)
```
- 리스트 patterns의 값을 하나씩 꺼내 pattern으로 전달
- 리스트의 길이만큼 print (pattern) 실행
##### for in range
 range 함수: 필요한 만큼의 숫자를 만들어내는 기능
```shell
for i in range(5):
    print(i)
```
##### for in enumerate
```shell
names = ['철수', '영희', '영수']
for i, name in enumerate(names):
    print('{}번: {}'.format(i + 1, name))
```


