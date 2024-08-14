import useAuth from "../utils/hooks/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import ArtSchoolApi from "../api/art_school_api";
import ArtSchoolModelsForms from "../models/ArtSchoolModelsForms";

const RequireAuth = ({allowedRoles}) => {
    const {auth, setUserAuthenticated} = useAuth();
    const location = useLocation();
    const [authLoaded, setAuthLoaded] = useState(false);
    const authenticationRequest = ArtSchoolModelsForms().authenticationRequestModel;
    const isValidToken = async function (token) {
        authenticationRequest.token = token;
        return await ArtSchoolApi().artSchoolAuthorization.checkToken(authenticationRequest)
            .then(function (response) {
                return response;
            })
            .catch(function (err) {
                console.error(err);
                return false;
            });
    };


    useEffect(() => {
        let authItem = JSON.parse(localStorage.getItem('auth'));
        const token = authItem?.userAuthenticated?.token;

        isValidToken(token).then(
            function (result) {
                if (!result) {
                    authItem = {};
                }
                setUserAuthenticated(authItem);
                setAuthLoaded(true);
            });

    }, []);

    if (!authLoaded) {
        return null;
    }

    const userAuthenticated = auth?.userAuthenticated;
    const hasRequiredRole = allowedRoles?.some(role => userAuthenticated?.roles?.includes(role));

    if (userAuthenticated && hasRequiredRole) {
        return <Outlet/>;
    }

    return <Navigate to={userAuthenticated?.token ? "/unauthorized" : "/login"} state={{from: location}} replace/>;
};

export default RequireAuth;