import React, {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';


const SidebarLink = styled(Link)`
  display: flex;
  color: ${props => (props.is_active_item ? "#b58900" : "#e1e9fc")};
  justify-content: space-between;
  align-items: center;
  margin-left: ${props => (props.is_sidebar_active ? 10 : 30)}px;
  padding: 20px 20px 20px 0;
  list-style: none;
  height: 55px;
  text-decoration: none;
  font-size: ${props => (props.is_sidebar_active ? 18 : 22)}px;
  
  &:hover {
    margin-left: 0;
    background: #002b36;
    border-left: 4px solid #002b36;
    cursor: pointer;
    justify-content: ${props => (props.is_sidebar_active? null:"center")};
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  height: 45px;
  padding-left: ${props => (props.is_sidebar_active? "10px": "30px")};
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${props => (props.is_active_item ? "#b58900" : "#e1e9fc")};
  font-size: 18px;

  &:hover {
    margin-left: 0;
    background: #002b36;
    border-left: 4px solid #002b36;
    cursor: pointer;
  }
`;

const SubMenu = ({item, sideBarOpen}) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    const location = useLocation();

    return (
        <>
            <SidebarLink is_sidebar_active={sideBarOpen? sideBarOpen.toString():null} to={item.subNav? item.subNav[0].path : item.path} onClick={item.subNav && showSubnav}
                         is_active_item={(location.pathname).startsWith(item.path)? (location.pathname).toString():null }>
                <div>
                    {item.icon}
                    <SidebarLabel>{sideBarOpen ? item.title : null}</SidebarLabel>
                </div>

                <div>
                    {sideBarOpen ? item.subNav && subnav
                            ? item.iconOpened
                            : item.subNav
                                ? item.iconClosed
                                : null
                        : null}
                </div>
            </SidebarLink>

            {sideBarOpen ? subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <DropdownLink to={item.path} key={index} is_active_item={item.path === location.pathname? (item.path).toString():null}>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </DropdownLink>
                    );
                }) :
                subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <DropdownLink is_sidebar_active={sideBarOpen? sideBarOpen.toString():null} to={item.path} key={index} is_active_item={item.path === location.pathname}>
                            {item.icon}
                        </DropdownLink>
                    );
                })
            }
        </>
    );
};

export default SubMenu;