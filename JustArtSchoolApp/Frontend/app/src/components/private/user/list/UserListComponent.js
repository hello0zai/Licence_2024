import useAuth from "../../../../utils/hooks/useAuth";
import React, {useEffect, useState} from "react";
import ArtSchoolApi from "../../../../api/art_school_api";
import {TabPanel, TabView} from "primereact/tabview";
import inputsUtils from "../../../../utils/functions/inputsProcessing";
import {FaUsers} from "react-icons/fa";
import TeacherDataTable from "./TeacherDataTable";
import SecretaryDataTable from "./SecretaryDataTable";
import useToast from "../../../../utils/hooks/useToast";
import {Button, Stack} from "@mui/material";
import {IoPersonAddSharp} from "react-icons/io5";
import routes from "../../../../routes/ArtSchoolRoutes";
import {useNavigate} from "react-router-dom";

function UserListComponent() {
    const {auth} = useAuth();
    const [roles, setRoles] = useState([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        (function getData() {
            ArtSchoolApi().roleApi.getAll(auth?.userAuthenticated?.token)
                .then(function (roles) {
                    console.log("Role api data: " + roles);
                    const rolesList = roles.filter(role => {
                        return !((role.name).toString() === "ADMIN" || (role.name).toString() === "STUDENT");
                    });
                    setRoles(rolesList);
                })
                .catch(function (err) {
                    showErrorToast("", "A aparut o eroare. Va rugam sa contactati un administrator.");
                    console.error(err);
                });
        }());

        if (roles) {
            setActiveTabIndex(0);
        }
    }, [auth]);

    const handleTabChange = (event) => {
        setActiveTabIndex(event.index);
    };

    const goToAdd = function () {
        navigate(routes.adminRoutes.UserAddComponent.path, {replace: true});
    };

    return (
        <>
            <div className={"pt-5"}>
                {/*<hr></hr>*/}
                <div className={"d-flex pb-3"}>
                    <div className={"col-md-10 p-0"}>
                        <h5>Utilizatori</h5>
                    </div>
                    <div className={"col-md-2 p-0 d-flex justify-content-end"}>
                        <Button variant="outlined"
                                startIcon={<IoPersonAddSharp/>}
                                onClick={goToAdd}>
                            Adaugă utilizator
                        </Button>
                    </div>
                </div>

                <TabView
                    activeIndex={activeTabIndex}
                    onTabChange={handleTabChange}
                >
                    {roles.map(function (role, index) {
                        return <TabPanel autoFocus className={'tab-panel'}
                                         header={inputsUtils.rolesTranslate(role.name).toLocaleUpperCase()}
                                         leftIcon={<FaUsers className={"header-container"}/>} key={role.roleId}>
                            <div className={"p-3"}>
                                <div className={"pt-3"}>
                                    {(role.name).toString() === "SECRETARY" ?
                                        <SecretaryDataTable/> : null}
                                    {(role.name).toString() === "TEACHER" ? <TeacherDataTable/> : null}
                                </div>
                            </div>
                        </TabPanel>
                    })
                    }
                </TabView>
            </div>
        </>
    );
}

export default UserListComponent;