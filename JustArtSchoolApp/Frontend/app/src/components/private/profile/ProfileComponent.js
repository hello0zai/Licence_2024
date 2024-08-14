import React, {useEffect, useState} from 'react'
import useAuth from "../../../utils/hooks/useAuth";
import ProfilePicture from "../../../utils/profile/ProfilePicture";
import ProfileForm from "../../../forms/ProfileForm";
import {ProfileFormSchemaValidations} from "../../../utils/validations/ValidationsLibrary";
import ArtSchoolApi from "../../../api/art_school_api";
import {useNavigate} from "react-router-dom";
import routes from "../../../routes/ArtSchoolRoutes";
import useToast from "../../../utils/hooks/useToast";

function ProfileComponent() {
    const {auth} = useAuth();
    const [userAccount, setUserAccount] = useState();
    const validationSchema = ProfileFormSchemaValidations.profileFormSchema;
    const [profilePicture, setProfilePicture] = useState(null);
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            (function getData() {
                ArtSchoolApi().userApi.getUserByEmail(auth?.userAuthenticated?.token, auth?.userAuthenticated?.email)
                    .then(function (userAccount) {
                        setUserAccount(userAccount);
                        setProfilePicture(userAccount?.profileImageData);
                    })
                    .catch(function (err) {
                        showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                        console.error(err);
                    });
            }());
        }
    }, [auth]);


    const updateUserAccount = async function (userAccount) {
        userAccount.profileImageData = null;
        if(profilePicture){
            userAccount.profileImageData = profilePicture;
        }

        ArtSchoolApi().userApi.edit(auth?.userAuthenticated?.token, userAccount)
            .then(function (response) {
                showSuccessToast("", "Profilul a fost actualizat cu succes.");
                navigate("/profile", {replace: true})
            })
            .catch(function (err) {
                showErrorToast("", "A aparut o eroare la actualizarea profilului.");
                console.error(err);
            });
    };

    return (
        <>
            {userAccount ?
                <div className="row pt-2">
                    <div className={"d-flex justify-content-center pt-1"}>
                        <ProfilePicture profilePicture={profilePicture} setProfilePicture={setProfilePicture}/>
                    </div>

                    <div className={"d-flex justify-content-center pt-1"}>
                        <div className="pt-5 col-md-9">

                            <ProfileForm model={userAccount} validationSchema={validationSchema}
                                         handleSubmit={updateUserAccount} action={"Actualizează"}
                                         deleteAction={false} formTilte={""}/>
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}

export default ProfileComponent