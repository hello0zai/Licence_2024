import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import AuthenticationComponent from "./components/public/authenticate/AuthenticationComponent";
import RequireAuth from "./auth/RequireAuth";
import Sidebar from "./utils/sidebar/Sidebar";
import React from "react";
import useAuth from "./utils/hooks/useAuth";
import styled from "styled-components";
import useGlobal from "./utils/hooks/useGlobal";
import routes from "./routes/ArtSchoolRoutes";
import Unauthorized from "./utils/statesAuthorization/Unauthorized";
import RegisterComponent from "./components/public/register/RegisterComponent";
import HomeComponent from "./components/public/HomeComponent";

const Content = styled.div`
  padding-top: ${props => (props.user ? 110 : 0)}px !important;
  margin-left: ${props => (props.user ? props.is_sidebar_open ? 150 : 300 : 0)}px;
  margin-right: 20px;
  //background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity)) !important;
  //background-color: #fff !important;
  transition: margin-left 1s;
  
  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;


function ArtSchoolApp() {
    const {auth} = useAuth();
    const {global} = useGlobal();

    const isUserAuthenticated = auth?.userAuthenticated;

    return (

        <div>
            {isUserAuthenticated ? <Sidebar/> : null}

            <Content user={isUserAuthenticated ? (isUserAuthenticated).toString() : null}
                     is_sidebar_open={global?.sidebarState ? (global?.sidebarState).toString() : null}>
                <Routes>
                    <Route path="/home" element={<HomeComponent/>}/>
                    <Route path="/register" element={<RegisterComponent/>}/>
                    <Route path="/login" element={<AuthenticationComponent/>}/>
                    <Route path="/toDoErrorPage" element={<Unauthorized/>}></Route>
                    <Route element={<RequireAuth allowedRoles={['ADMIN_ROLE']}/>}>
                        {routes.getAdminRoutes()}
                        <Route path="*" element={<Navigate to="/toDoErrorPage"/>}/>
                    </Route>

                    <Route element={<RequireAuth allowedRoles={['SECRETARY_ROLE']}/>}>
                        {routes.getSecretaryRoutes()}
                        <Route path="*" element={<Navigate to="/toDoErrorPage"/>}/>
                    </Route>

                    <Route element={<RequireAuth allowedRoles={['TEACHER_ROLE']}/>}>
                        {routes.getTeacherRoutes()}
                        <Route path="*" element={<Navigate to="/toDoErrorPage"/>}/>
                    </Route>

                    <Route element={<RequireAuth allowedRoles={['STUDENT_ROLE']}/>}>
                        {routes.getStudentRoutes()}
                        <Route path="*" element={<Navigate to="/toDoErrorPage"/>}/>
                    </Route>
                </Routes>
            </Content>
        </div>
    );
}

export default ArtSchoolApp;