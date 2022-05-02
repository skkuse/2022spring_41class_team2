import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../css/QuestionPage.css';
import { Link } from "react-router-dom";

function QuestionPage() {

  return (
    <div className="whole">
      <body>
        <header>
          <h1 className="question-header">Q&A</h1>
        </header>
        <main>
            <div className="question-body">
              <Link to="/questionList">
                <button className="return-button"> &lt;목록가기</button>
              </Link>
              <div className='form-wrapper'>
                <div className="question-route">
                  <div>질문 경로</div>
                  <input className="route-input" type='text' placeholder='특별한 경로 없음' />
                  <select id="select-course-name">  
                    <option value="course-name">강의명</option>
                    <option value="c1">course1</option>
                    <option value="c2">course2</option>
                    <option value="c3">course3</option>
                    <option value="c4">course4</option>
                  </select>
              
                </div>
                <div className="title">
                  <div>제목</div>
                    <input className="title-input" type='text' placeholder='제목' />
                  </div>
                  <div>내용</div>
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor);
                    }}
                  />
                <div className="assign-button">
                  <button className="cancel-button">취소</button>
                  <button className="submit-button">등록</button>
                </div>
              </div>

            </div>
        </main>
     </body>
  </div>
  );
}

export default QuestionPage;
