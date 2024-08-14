import React from 'react'
import styled from "styled-components";
import {FaCircleChevronLeft, FaCircleChevronRight} from "react-icons/fa6";
import {AiOutlineLogout} from "react-icons/ai";

const Nav = styled.div`
  background: #002b36;
  height: 80px;
  display: flex;
  //justify-content: flex-start;
  //align-items: center;
  padding-left: 10rem;
`;
function Navbar() {
    return (
        <>
            <Nav className="navbar navbar-expand-lg " data-bs-theme="dark">
                <div className={"collapse navbar-collapse"}>
                    <FaCircleChevronLeft></FaCircleChevronLeft>
                    <FaCircleChevronRight></FaCircleChevronRight>
                </div>

                <div className="collapse navbar-collapse justify-content-end p-2">
                    <ul className="navbar-nav">
                        <button className={"btn btn-primary col-md-12"}><AiOutlineLogout className="icon"/></button>
                    </ul>
                </div>
            </Nav>
        </>
    )
}

export default Navbar
