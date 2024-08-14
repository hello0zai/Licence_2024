import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {SidebarData} from './SidebarData';
import SubMenu from './SubMenu';
import {IconContext} from 'react-icons/lib';
import Logo from "../images/just_art_school_logo.png";
import HeaderText from "../images/headerArtSchool.png";
import useAuth from "../hooks/useAuth";
import {FaCircleChevronLeft, FaCircleChevronRight} from "react-icons/fa6";
import useGlobal from "../hooks/useGlobal";
import { TbLogout2 } from "react-icons/tb";
import LogoutComponent from "../../components/public/logout/LogoutComponent";

const Nav = styled.div`
  box-shadow: 10px 5px 15px 1px #031a21 !important;
  background: #002b36;
  height: 70px;
  display: flex;
  align-items: center;
  padding-left: ${props => (props.is_active ? '250px' : '100px')};
  transition: padding-left 1s;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

const NavIcon = styled(Link)`
  padding-left: 15px !important;
  font-size: 2rem;
  text-decoration-color: white;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderImage = styled.img`
  padding-top: 50px;
  height: 250px;
  margin-left: 20px;
`;

const LogoutButton = styled(Link)`
  margin-left: auto;
  margin-right: 20px;
  background-color: #002b36;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &:hover {
    font-size: 1.7rem;
  }
`;

const SidebarNav = styled.nav`
  width: ${props => (props.is_active ? '250px' : '100px')};
  display: flex;
  flex-direction: column;
  transition: width 1s;
  justify-content: start;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  background: #002b36;
  overflow-y: auto;
  scrollbar-width: none;
  box-shadow: 10px 5px 15px 1px #031a21 !important;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Sidebar = () => {
    const [sidebarState, setSidebarState] = useState(false);
    const {auth} = useAuth();
    const {setGlobal} = useGlobal();
    const [visible, setVisible] = useState(false);
    const showSidebar = () => {
        setSidebarState(!sidebarState);
        setGlobal({sidebarState});
    };

    const handleLogoutVisibility = function (state) {
        setVisible(state);
    };

    return (<div style={{minHeight: '100%'}}>
        <IconContext.Provider value={{color: '#b58900'}}>
            <Nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark"
                 is_active={sidebarState ? sidebarState.toString() : null}>

                <NavIcon is_active={sidebarState ? sidebarState.toString() : null} to='#'>
                    {sidebarState ? <FaCircleChevronLeft onClick={showSidebar}></FaCircleChevronLeft> :
                        <FaCircleChevronRight onClick={showSidebar}></FaCircleChevronRight>}
                </NavIcon>

                <HeaderImage src={HeaderText} alt="Header Text Image" />
                <LogoutButton onClick={() => handleLogoutVisibility(true)}>
                    <TbLogout2 />
                </LogoutButton>
            </Nav>
        </IconContext.Provider>
        <LogoutComponent visible={visible} onClose={handleLogoutVisibility} />
        <SidebarNav is_active={sidebarState ? sidebarState.toString() : null} className="bg-dark">
            <SidebarWrap>
                <div className={"d-flex justify-content-center"}>
                    <img src={Logo} width="150" height="120" alt="logo"/>
                </div>
                <hr/>
                {SidebarData.map((item, index) => {
                    return auth?.userAuthenticated?.roles?.find(role => item.authorization.includes(role)) ?
                        <SubMenu className={"collapse"} sideBarOpen={sidebarState} item={item}
                                 key={index}/> : null;
                })}
            </SidebarWrap>
        </SidebarNav>
    </div>);
};

export default Sidebar;