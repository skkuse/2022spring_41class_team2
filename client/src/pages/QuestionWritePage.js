import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../css/QuestionWritePage.css';
import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';
import { call } from '../service/APIService';


function QuestionWritePage() {

  const location = useLocation();
  const data = location.state;

  const [qaContent, setQaContent] = useState({
    title: '',
    content: ''
  });

  

  const [title, setTitle] = useState('');
  const [content,setContent] = useState('');
  const [route, setRoute] = useState(data.lecture_content_title);


  const getValue = e => {
    const { name, value } = e.target;
    setTitle(value);

    setQaContent({
      ...qaContent,
      [name]: value
    })

  };

  
const handleChange = (e) => {
   setQaContent({
    ...qaContent,
    content: e
                      })
  
}


  const SendingQa = () =>{
   
 
    ///lectures/{lecture_seq}/lectureContent/{lecture_content_seq}/userSeqs/{user_seq}/qa

    if(data.isLecture){
        //강의별 질문 등록 
        call("/lectureContent/"+data.lecture_content_title+"/qa", "POST", 
        {"qa_title" : qaContent.title, "qa_content" : qaContent.content})
        .then(
            response => {
              console.log("qa_title", qaContent.title); //제목만 뽑기 가능!
              console.log("강의별 질문 등록");
            }
        )

    }
    else{

      
      //자유질문 
      call("/lectureContent/-1/qa", "POST", 
      {"qa_title" : qaContent.title, "qa_content" : qaContent.content})
      .then(
          response => {
            console.log(response)
            console.log("qa_title", qaContent.title); //제목만 뽑기 가능!
            console.log("자유질문 등록");
          }
      )

    }

      setTitle('');

      alert('질문 등록 완료.')
  }

  const CancleQa = () => {

    setTitle('');
    //setContent('');

    
  }

  useEffect(() => {
    setRoute(location.state.lecture_content_title);  
    console.log(location.state.lecture_content_title);
  }, [route]);


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

        {/*뒤로가기를 넣으면 새로운 질문 업데이트가 안되므로 /qaList로 해야함 */}
          <Link to={{
                    pathname: "/qaList",
                    state: {
                        isLecture: location.state.isLecture,
                        lecture_content_seq: location.state.lecture_content_seq,
                        lecture_content_title: location.state.lecture_content_title,

                    }

                }}>
                <button className="return-button"> &lt;목록가기</button>
        </Link>
        <main>
            <div className="question-body">
      
              <div className='form-wrapper'>
                <div className="question-route">
                  <div>질문 경로</div>
                   <input className="route-input" type='text' placeholder='특별한 경로 없음'
                   value={location.state.lecture_content_title} /> 
                   {/* <select className="select-course" 
                   onChange={handleChangeSelect} key = {Selected}>  
                    {selectList.map((item) => (
                      <option value={item.name} key={item.key}>
                        {item.name}
                      </option>
                    ))}
                  </select>  */}
              
                </div>
                <div className="title">
                  <div>제목</div>
                  <input className="title-input"
                      type='text'
                      placeholder='제목'
                      onChange={getValue}
                      name='title'
                      value={title}
                  />
 
                  </div>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      removePlugins: ["EasyImage","ImageUpload","MediaEmbed"]
                    }}
                    
                    data={content}
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
                      handleChange(data);
                      
                    }}
                  />

                <div className="assign-button">
                  <button className="cancel-button" onClick = {CancleQa}>취소</button>
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
