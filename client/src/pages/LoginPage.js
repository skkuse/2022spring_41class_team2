import GoogleLoginBtn from '../components/GoogleLoginBtn'
import '../css/loginPage.css'
import { Link } from "react-router-dom"
import React, { Component, useEffect, useState } from 'react';
import GoogleSignBtn from '../components/GoogleSignBtn'



function LoginPage() {

	const [clickedSignUp, setclickedSignUp] = useState(false);

	const changeCheck = () => {
		setclickedSignUp((check) => !check);
	};

	let lp_button_msg = "가입하기";

	if (!clickedSignUp) {
		lp_button_msg = "가입하기"
	}
	else {
		lp_button_msg = "취소";
	}

	return (
		<div>
			<div className="lp_b_1">
				<div style={{ margin: 'auto', height: '100vh' }}>
					<div className={`${clickedSignUp ? "lp_c_1" : "lp_d_1"}`} >
						<div className="lp_d_v5" style={{ fontSize: '1.5rem', margin: '3rem' }}><span>CrawlLearn에 로그인 하기</span></div>
						<div style={{ padding: '0.5rem' }}>
							<div className="lp_d_v5"><span>Google 계정으로 로그인</span></div>
							<div className="lp_d_v5" style={{ padding: '1rem' }}>
								<GoogleLoginBtn ></GoogleLoginBtn>
							</div>
						</div>
						<div className="v12_14" style={{ margin: '1rem' }}>
							<div className="lp_d_v5 " style={{ color: '#888888' }}><span>계정이 없으신가요?</span></div>
							<div className="lp_d_v5 v12_12">
								<button className="button" style={{ fontSize: '1rem', width: '6rem' }}
									onClick={changeCheck}
								>{lp_button_msg}</button>
							</div>
						</div>
						<div className={`${clickedSignUp ? "v12_14 lp_d_v5" : "lp_ds_1"}`} >
							<GoogleSignBtn></GoogleSignBtn>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;

