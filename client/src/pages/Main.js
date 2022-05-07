import { Link } from "react-router-dom"
import '../css/mainPage.css'
import React, { Component, useEffect, useState } from 'react';
import MainPageNav from '../components/MainPageNav'
import LectureCard from '../components/LectureCard'
import MainPagination from "../components/MainPagination";
import { call } from '../service/APIService';


function Main() {

	const [limit, setLimit] = useState(9);
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;
	const [loading, setLoading] = useState(false);
	const [lectures, setlectures] = useState([]);
	const [lectures2, setlectures2] = useState([]);

	const getUserInfo = () => {
		var token = sessionStorage.getItem("ACCESS_TOKEN");
		return token;
	}

	/*call("/lectures?lecture_seq=1", "GET")
		.then(
			response => {
				setlectures(response['data'])
			}
	)*/

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			call("/lectures?lecture_seq=1", "GET")
				.then(
					response => {
						setlectures(response['data'])
					}
			)
			setLoading(false);
		}
		fetchData();
	}, []);

	



	console.log(lectures);


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


						<div id="search" className="mp_c_1">
							<div style={{ padding: '0 2em' }}>
								<form>
									<div className="v12_13">
										<div className="v12_12 padding">
											<div className="search_box">
												<input className="mp_i_1 search_box" type="text" name="lectureSearch" placeholder="강의를 검색하세요." />
											</div>
											<div className="search_box">
												<select className="search_box2" id="pet-select">
													<option value="">--정렬--</option>
													<option value="date">날짜</option>
													<option value="good">좋아요</option>
													<option value="signUp">수강자</option>
													<option value="difficulty">난이도</option>
												</select>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div id="lectureContents">
							<div id="lectureList" style={{ padding: '1rem' }}>
								<div style={{ fontSize: '1.2rem' }}><span>강의목차</span></div>
								<ul className="mp_u_1">
									<li>기초 파이썬</li>
									<li>웹 페이지 구조</li>
									<li>웹 크롤링</li>
								</ul>
							</div>
							<div className="lecturePlate">
								<div id="lectureTable">
									{lectures.slice(offset, offset + limit).map((lectureE) => <LectureCard loading={loading} key={lectureE.lecture_content_seq} lecture={lectureE}></LectureCard>)}
								</div>
								<div id="lectureTablePage">
									<MainPagination
										total={lectures.length}
										limit={limit}
										page={page}
										setPage={setPage}
									/>
								</div>
							</div>
						</div>
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