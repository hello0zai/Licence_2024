import {TabPanel, TabView} from "primereact/tabview";
import {useEffect, useState} from "react";
import ArtSchoolApi from "../../../../api/art_school_api";
import useAuth from "../../../../utils/hooks/useAuth";
import {FaUsers} from "react-icons/fa";
import SecretaryAddComponent from "./SecretaryAddComponent";
import TeacherAddComponent from "./TeacherAddComponent";
import inputsUtils from "../../../../utils/functions/inputsProcessing";
import useToast from "../../../../utils/hooks/useToast";

function UserAddComponent() {
    const {auth} = useAuth();
    const [roles, setRoles] = useState([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    useEffect(() => {
        (function getData() {
             ArtSchoolApi().roleApi.getAll(auth?.userAuthenticated?.token)
                .then(function (roles) {
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
    }, [auth]);

    const handleTabChange = (event) => {
        setActiveTabIndex(event.index);
    };

    return (
        <>
            <div className={"pt-5"}>
                <TabView
                    activeIndex={activeTabIndex}
                    onTabChange={handleTabChange}
                >
                    {roles.map(function (role, index) {
                        return <TabPanel autoFocus className={'tab-panel'}
                                         header={inputsUtils.rolesTranslate(role.name).toLocaleUpperCase()}
                                         leftIcon={<FaUsers className={"header-container"} key={role.name + '_ADD'}/>}>
                            <div className={"p-3"}>
                                <div className={"pt-3"}>
                                    {(role.name).toString() === "SECRETARY" ?
                                        <SecretaryAddComponent role={role}/> : null}
                                    {(role.name).toString() === "TEACHER" ? <TeacherAddComponent role={role}/> : null}
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

export default UserAddComponent;