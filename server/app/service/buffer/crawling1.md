크롤링(Crawling)이란?
1. 특정 페이지에 있는 정보들을 내가 원하는 포맷으로 가져오는것
2. WebScrapping을 자동으로 돌아다니며 분석 및 저장 등을 하는 행위

웹 페이지의 데이터 중에서 원하는 값만 가져오는 스크레이핑에 대해 알아보겠습니다. 스크레이핑은 웹에서 HTML 파일을 다운로드하는 과정과 다운로드한 HTML에서 원하는 데이 터를 파싱하는 두 단계로 진행합니다. 파이썬에서는 requests 모듈을 이용해 HTML 코드를 다운로드하 고 BeautifulSoup 모듈로 원하는 데이터를 파싱합니다.


HTML 코드를 활용해 BeautifulSoup을 사용해보겠습니다. 모듈을 사용하기 위해 먼저 BeautifulSoup을 임포트해야 합니다. bs4 모듈에 정의된 BeautifulSoup 클래스는 HTML 코드가 바인딩된 변수와 HTML을 파싱 할 것임을 알리는 문자열인 ‘html5lib’을 입력 받습니다. 생성된 soup 객체를 사용하면 클래스에 정의된 메서드를 사용할 수 있습니다. soup 객체에는 select 메서드가 있는데, 이 메서드는 HTML에서 특정 태그 값만 찾아주는 역할을 합니다. 즉, select('td')는 HTML에서 td 태그를 찾으라는 의미입니다.

```shell
from bs4 import BeautifulSoup

html = '''
<html>
    <table border=1> 
        <tr>
            <td> 항목 </td> 
            <td> 2013 </td> 
            <td> 2014 </td> 
            <td> 2015 </td>
        </tr> 
        <tr>
            <td> 매출액 </td> 
            <td> 100 </td> 
            <td> 200 </td>
            <td> 300 </td>
        </tr> 
    </table>
</html> 
'''
soup = BeautifulSoup(html, 'html5lib') 
result = soup.select('td') 
print(result)
```
이 코드를 실행하면 td 태그가 포함하는 모든 값이 출력됩니다. select 메서드가 반환하는 값은 리스트입니다.


이번에는 td로 둘러싸인 태그 중에서 첫 번째에 위치한 “항목” 문자열만 가져와 보겠습니다. 값을 선택 하는 select 메서드에 ":nth-of-type(1)"을 지정했습니다. 이것은 태그 중에서 첫 번째 값만 가져오라는 의미입니다. 인덱스가 파이썬과 달리 1부터 시작하는 것에 주의하세요. 따라서 두 번째 값을 가져오려면 (2)를 사용하면 됩니다.

```shell
from bs4 import BeautifulSoup

html = '''
<html>
    <table border=1> 
        <tr>
            <td> 항목 </td> 
            <td> 2013 </td> 
            <td> 2014 </td> 
            <td> 2015 </td>
        </tr> 
        <tr>
            <td> 매출액 </td> 
            <td> 100 </td> 
            <td> 200 </td>
            <td> 300 </td>
        </tr> 
    </table>
</html> 
'''
soup = BeautifulSoup(html, 'html5lib') 
result = soup.select('td:nth-of-type(1)') 
print(result)
```
해당 코드를 실행하면
```
[<td> 항목 </td>]
```
이 출력됩니다.


만약 ul 태그 안에 있는 li 태 그만 가져오고 싶다면 어떻게 해야 할까요? select 메서드는 하나 이상의 태그를 입력받을 수 있습니다. "ul 태그 안의 li 태그"를 코드로 표현하면 "ul li"와 같습니다. 단순히 두 개의 태그를 나열해서 select 메서드로 전달합니다. 앞에서 배운 ":nth-of-type()"을 응 용하면 ul 안에 있는 두 번째 li 값만 가져올 수 있습니다. "ul li:nth-of-type(2)"를 select 메서드 에 사용할 수 있습니다. 또한 태그 없이 태그 안의 값 만 출력하려면 text 속성을 사용해야 합니다. 다음 코드는 반복문을 사용해 리스트에 저장된 모든 태그에 접근하고, 각 태그의 text 속성을 출력합니다. 이를 적용시키면 다음과 같습니다.

```shell
from bs4 import BeautifulSoup
html = '''
<ul>
    <li> 100 </li> 
    <li> 200 </li>
</ul> 
<ol>
    <li> 300 </li> 
    <li> 400 </li>
</ol>
'''
soup = BeautifulSoup(html, 'html5lib') 
result = soup.select('ul li')
for r in result: 
    print(r.text).
```
