import React from 'react';
import '../css/lectureCard.css'
import starImg from './image/icons8-star-32.png';
import thumbImg from './image/icons8-thumbs-up-32.png';


const LectureCard = (props) => {
	
	/*const lecture_name = props.lecture.lecture_name;
	const lecture_content_description = props.lecture.lecture_content_description;
	const lecture_content_difficulty = props.lecture.lecture_content_difficulty;
	const like_count = props.lecture.like_count;*/

	const lecture_name = props.lecture.lecture_content;
	//const lecture_content_description = props.lecture.lecture_content_description;
	//const lecture_content_difficulty = props.lecture.lecture_content_difficulty;
	//const like_count = props.lecture.like_count;

	return (

		<div id="lecture">
			<div id="lecture_card_top">
				<div id="lecture_name"><span><b>{lecture_name}</b></span></div>
				
			</div>

		</div>
		);
	

};

export default LectureCard;


/*
 <div id="lecture_content_description"><span>{lecture_content_description}</span></div>
 
 
 <div id="lecture_card_bottom">
				<div id="lecture_content_difficulty">
					<section>
						{Array.from({ length: lecture_content_difficulty }, (_, i) => <img src={starImg} alt="hard" />)}
					</section>
				</div>
				<div id="lecture_bar"></div>
				<div id="like_count">
					<img src={thumbImg} alt="like" /><div id="like_count_n">{like_count}</div>
				</div>
			</div>
 */

// key={ props.lecture_content_seq}