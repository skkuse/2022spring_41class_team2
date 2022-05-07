import { Link } from "react-router-dom"
import '../css/mainPage.css'
import React, { Component, useEffect, useState } from 'react';
import LectureCard from './LectureCard'
import MainPagination from "./MainPagination";
import { call } from '../service/APIService';





const MainPageLecture = (props) => {

	const [limit, setLimit] = useState(9);
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;
	const [loading, setLoading] = useState(false);
	const [lectures, setlectures] = useState([]);
	const [lecture_seq_num, setLecture_seq_num] = useState(1);
	const [lectureSort, setLectureSort] = useState("");
	const [lectureSearchQtext, setLectureSearchQtext] = useState("");

	const getUserInfo = () => {
		var token = sessionStorage.getItem("ACCESS_TOKEN");
		return token;
	};

	async function fetchData() {
		setLoading(true)
		let queryString = '/lectures?lecture_seq=' + lecture_seq_num;
		call(queryString, "GET")
			.then(
				response => {
					setlectures(response['data'])
					setLectureSort("")
				}
			)
		setLoading(false);
	}


	const sortLecture = (e) => {
		//e.preventDefault();
		setLectureSort(e.target.value);		
	}

	const lectureSearchQSm = (e) => {
		e.preventDefault();
		console.log(lectureSearchQtext);
		//let queryString = '/lectures?lecture_content=' + lectureSearchQtext;
		let queryString = '/lectures?lecture_seq=3' //<- work well the only problem is query above
		setLoading(true)
		call(queryString, "GET")
			.then(
				response => {
					setlectures(response['data'])
					setLectureSort("")
					setLectureSearchQtext("")
				}
		)
		setLoading(false);
	}

	const lectureSearchQ = (e) => {
		e.preventDefault();

		setLectureSearchQtext(e.target.value);
		return false;
	}

	

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (lectureSort != "") {
			var ar = lectures;
			ar.sort(function (a, b) {
				if (lectureSort == 'lecture_content_difficulty') return (b.lecture_content_difficulty - a.lecture_content_difficulty) != 0 ? (b.lecture_content_difficulty - a.lecture_content_difficulty) : (a.lecture_content_seq - b.lecture_content_seq)
				else if (lectureSort == 'create_time') return (Date.parse(b.create_time) - Date.parse(a.create_time)) != 0 ? (Date.parse(b.create_time) - Date.parse(a.create_time)) : (a.lecture_content_seq - b.lecture_content_seq)
				else if (lectureSort == 'like_count') return (b.like_count - a.like_count) != 0 ? (b.like_count - a.like_count) : (a.lecture_content_seq - b.lecture_content_seq)
				else return (a.lecture_content_seq - b.lecture_content_seq)
			});
			setlectures(ar);
			setLectureSort("")
        }
		
	}, [lectureSort]);


	useEffect(() => {
		//console.log('/lectures?lecture_seq=' + lecture_seq_num);
		//console.log(lectures);
		fetchData();
	}, [lecture_seq_num]);




    return (
        
        <div>
			<div id="search" className="mp_c_1">
				<div style={{ padding: '0 2em' }}>
					
						<div className="v12_13">
						<div className="v12_12 padding">
							<form onSubmit={lectureSearchQSm}>
								<div className="search_box">
									<input className="mp_i_1 search_box" type="text" onChange={lectureSearchQ} value={lectureSearchQtext || ''} placeholder="Search Lecture." />
								</div>
							</form>
								<div className="search_box">
									<select className="search_box2" id="pet-select" value={ lectureSort } onChange={sortLecture }>
										<option value="" >--order--</option>
										<option value="create_time">date</option>
										<option value="like_count">like</option>
										<option value="lecture_content_difficulty">hard</option>
									</select>
								</div>
							</div>
						</div>
					
				</div>
			</div>
			<div id="lectureContents">
				<div id="lectureList" style={{ padding: '1rem' }}>
					<div style={{ fontSize: '1.2rem' }}><span>Lecture List</span></div>
					<ul className="mp_u_1">
						<li><a href="#" className="lecture_sequence_list" onClick={() => setLecture_seq_num(1)}>Basic Python</a></li>
						<li><a href="#" className="lecture_sequence_list" onClick={() => setLecture_seq_num(2)}>Web Page Structure</a></li>
						<li><a href="#" className="lecture_sequence_list" onClick={() => setLecture_seq_num(3)}>Web Crawling</a></li>
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
        
        );

};

export default MainPageLecture;