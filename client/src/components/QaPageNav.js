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
					<Link to="/qaList">
						<button className="button" type="button">QA</button>
					</Link>
				</div>

				<div className="v12_12">
					<Link to="/login">
						<button className="button_green" type="button">login</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

function Logined() {
	return (
		<div id="nav">
			<div className="v12_13 padding">
				<div>
					<Link to="/main">
						<button className="button" type="button">Lecture</button>
					</Link>
				</div>
				<div>
					<Link to="/qaList">
						<button className="button" type="button">QA</button>
					</Link>
				</div>

				<div className="v12_12">

					<Link to="/userInfo">
						<button className="button_green" type="button">MY</button>

					</Link>

                    <Link to="/qaWrite">
                        <button className="button_green" type="button">작성하기</button>
                    </Link>
			
				</div>
			</div>
		</div>
	);
}

const QaPageNav = (props) => {

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

export default QaPageNav;