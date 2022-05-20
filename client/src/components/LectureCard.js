import React from 'react';
import '../css/lectureCard.css'
import starImg from '../image/icons8-star-32.png';
import thumbImg from '../image/icons8-thumbs-up-32.png';
import { Link } from "react-router-dom";


const LectureCard = (props) => {


	const lecture_name = props.lecture.lecture_content_title;
	const lecture_content_description = props.lecture.lecture_content_description;
	const lecture_content_difficulty = props.lecture.lecture_content_difficulty;
	const like_count = props.lecture.like_count;

	return (

		<div id="lecture">
			<div id="lecture_card_top">
				<Link
					to={{
						pathname: "/lectureIntro",
						state: {
							data: props.lecture,
						}
					}}
				><div id="lecture_name"><span ><b className="lecture_title">{lecture_name}</b></span></div></Link>
				<div id="lecture_content_description"><span>{lecture_content_description}</span></div>
			</div>
			<div id="lecture_card_bottom">
				<div id="lecture_content_difficulty" style={{ width: `${lecture_content_difficulty ? lecture_content_difficulty * 2 + 'rem' : '10rem'}` }}>
					<section>
						{Array.from({ length: lecture_content_difficulty }, (_, i) => <img key={i} src={starImg} alt="hard" />)}
					</section>
				</div>
				<div id="lecture_bar"></div>
				<div id="like_count">
					<img src={thumbImg} alt="like" /><div id="like_count_n">{like_count}</div>
				</div>
			</div>
		</div>
	);


};

export default LectureCard;