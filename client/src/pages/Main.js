import '../css/mainPage.css'
import React from 'react';
import MainPageNav from '../components/MainPageNav'
import MainPageLecture from "../components/MainPageLecture";





function Main() {


	const getUserInfo = () => {
		var token = sessionStorage.getItem("ACCESS_TOKEN");
		return token;
	};



	return (
		<div>

			<div id="app">
				<div className="wrap">

					<div id="upper" className="v12_13 v12_13_1">
						<div className="v12_12">
							<div className="v5_26">
								<span>ABOUT US</span>
							</div>
						</div>
					</div>

					<header className="mp_h_1">
						<div className="mp_c_1">
							<span className="v5_33">CrawlLearn</span><br />
							<span className="v5_26_3">파이썬 기초부터 크롤링 심화까지! 모든 강의와 실습을 한번에 즐겨보세요.</span>
						</div>
					</header>


					<div className="mp_c_1">

						<MainPageNav sessionV={getUserInfo()}></MainPageNav>
						<MainPageLecture sessionV={getUserInfo()}></MainPageLecture>

					</div>


				</div>

				<footer className="mp_f_1">
					<div className="v12_14">
						<div className="v12_14_2 v5_26">
							<span className="v5_26_3">CrawlLearn</span>
						</div>
						<div className="v12_14_2 v5_26">
							<div className="v5_26_2">
								<span>주소: 경기도 수원시 장안구 서부로 2066</span>
							</div>
							<div className="v5_26_2">
								<span>Email: xxxx@gmail.com</span>
							</div>
						</div>
					</div>
					<div className="v12_13 v12_13_1">
						<div>
							<div className="v5_26">
								<span>All Rights Reserved</span>
							</div>
						</div>
						<div className="v12_12">
							<div className="v5_26">
								<span>이용약관</span>
							</div>
							<div className="v5_26">
								<span>개인정보</span>
							</div>
							<div className="v5_26">
								<span>도움말</span>
							</div>
						</div>
					</div>
				</footer>
			</div>

		</div>
	);

}

export default Main;
