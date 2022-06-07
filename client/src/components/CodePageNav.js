import React from 'react';
import '../css/code_page_nav.css'
import { Link } from "react-router-dom";

const CodePageNav = (props) => {

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


export default CodePageNav;