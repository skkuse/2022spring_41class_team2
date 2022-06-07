import React from 'react';
import '../css/lecture_intro_nav.css'
import { Link } from "react-router-dom";

const LectureIntroNav = () => {

	return (
        <div id="nav">
			<div>
                <Link to="/main">
                    <button className="button" type="button">CrawlLearn</button>
                </Link>
            </div>
		</div>
    );

};


export default LectureIntroNav;