import React, { Component, useEffect, useState } from 'react';
import '../css/mainPage.css'
import { call } from '../service/APIService';
import { Link } from "react-router-dom";



function NotLogined() {
	return (
		<div id="nav">
			<div className="v12_13 padding">
				<div>
					<Link to="/main">
						<button className="button" type="button">Lecture</button>
					</Link>
				</div>
				<div>
					<Link to="/login">
						<button className="button" type="button">Q&A</button>
					</Link>
				</div>

				<div className="v12_12">
					<Link to="/login">
						<button className="button_green" type="button" >login</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

function Logined() {
	const [isLecture, setIsLecture] = useState(false);
	const lecture_content_title = "자유질문";


	return (
		<div id="nav">
			<div className="v12_13 padding">
				<div>
					<Link to="/main">
						<button className="button" type="button">Lecture</button>
					</Link>
				</div>
				<div>
					
					<Link to ={{
					pathname: "/qaList",
					state: {
						isLecture: isLecture,
						lecture_content_title: lecture_content_title,
					}
				
					}}>
						<button className="button" type="button">Q&A</button>
					</Link>
				</div>

				<div className="v12_12">

					<Link to="/userInfo">
						<button className="button_green" type="button">MY</button>

					</Link>
					<Link to ="/main">
						<button className="button_green" type="button" onClick={logout}>logout</button>
					</Link>
					
				</div>
			</div>
		</div>
	);
}

const logout = () =>{
	sessionStorage.clear()
}

const MainPageNav = (props) => {

	const isLoggedIn = props.sessionV;
	if (isLoggedIn != null) {
		return (
			<div>
				<Logined></Logined>
			</div>
		);
	}
	else {
		return (
			<div>
				<NotLogined></NotLogined>
			</div>
		);
	}

};


export default MainPageNav;