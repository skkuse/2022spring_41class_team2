import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../css/QuestionWritePage.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { call } from '../service/APIService';


function QuestionWritePage() {

  const [qaContent, setQaContent] = useState({
    title: '',
    content: ''
  });

  const getValue = e => {
    const { name, value } = e.target;
    setQaContent({
      ...qaContent,
      [name]: value
    })
    console.log(qaContent);
  };

  const SendingQa = () =>{
   
    alert('질문 등록 완료.')
      call("/lectures/1/lectureContent/-1/userSeq/2/qa", "POST", 
      {"qa_title" : qaContent.title, "qa_content" : qaContent.content})
      .then(
          response => {
            console.log("qa_title", qaContent.title); //제목만 뽑기 가능!
          }
      )
  }

  return (
    <div className="QuestionPage">
      <body>
          <div id="upper" className="v12_13 v12_13_1">
                <div className="v12_12">
                  <div className="v5_26">
                    <span></span>
                  </div>
                </div>
          </div>

          <header className="mp_h_1">
              <div className="mp_c_1">
                <span className="v5_33">Q&A</span>
                <br></br>
                <br></br>
              </div>
          </header>

        
        <Link to="/qaList">
                <button className="return-button"> &lt;목록가기</button>
        </Link>
        <main>
            <div className="question-body">
      
              <div className='form-wrapper'>
                <div className="question-route">
                  <div>질문 경로</div>
                  <input className="route-input" type='text' placeholder='특별한 경로 없음' />
                  {/* <select id="select-course-name">  
                    <option value="course-name">강의명</option>
                    <option value="c1">course1</option>
                    <option value="c2">course2</option>
                    <option value="c3">course3</option>
                    <option value="c4">course4</option>
                  </select> */}
              
                </div>
                <div className="title">
                  <div>제목</div>
                  <input className="title-input"
                    type='text'
                      placeholder='제목'
                      onChange={getValue}
                      name='title'
                  />
 
                  </div>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      removePlugins: ["EasyImage","ImageUpload","MediaEmbed"]
                    }}
                  
                    data=""
                    onReady={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log('Editor is ready to use!', editor);
                    }}
                    
                    onBlur={(event, editor) => {
                      console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor);
                    }}

                    onChange={(event, editor) => {
                      const data = editor.getData();
                      //console.log({ event, editor, data });
                      setQaContent({
                        ...qaContent,
                        content: data
                      })
                      console.log(qaContent);
                    }}
                  />

                <div className="assign-button">
                  <button className="cancel-button">취소</button>
                  <button className="submit-button" onClick = {SendingQa}>등록</button>
                </div>
              </div>

            </div>
        </main>
     </body>
  </div>
  );
}


export default QuestionWritePage;
