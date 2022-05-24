import React from "react";
import styled from "styled-components";
import { useState } from 'react';

const PageUl = styled.ul`

//   display: flex;
//   flex-direction: row;
//   width: auto;
//   height: 19px;

//   align-items: center;

//   list-style: none;
//   text-align: center;
//   border-radius: 3px;

//   padding: 1px;
// //   border-top: 3px solid #186ead;
// //   border-bottom: 3px solid #186ead;

display: flex;
justify-content: center;
align-items: center;
gap: 4px;
margin: 16px;
  
`;

const PageLi = styled.li`
  display: block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 10px;
  margin: 5px;
  
  &:hover {
    cursor: pointer;
    color: black;
    background-color: #ebebeb;
  }
  &:focus::after {
    color: white;
    background-color: #B1CE91;
  }


`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #B1CE91;
  }
`;
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / (postsPerPage)); i++) {
    pageNumbers.push(i);
  }

const [curPage, setCurPage] = useState(0);

const currentPage = (curPage) => {

  paginate(curPage);

}

  return (
    <div>
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={() => currentPage(number)} className="page-link" >
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;