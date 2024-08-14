import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {ContestFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolModelsForms from "../../../../models/ArtSchoolModelsForms";
import {useNavigate} from "react-router-dom";
import {BiSolidBookAdd} from "react-icons/bi";
import {ImBooks} from "react-icons/im";
import useToast from "../../../../utils/hooks/useToast";
import ContestForm from "../../../../forms/ContestForm";
import "react-datepicker/dist/react-datepicker.css";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";
import {FaTrophy} from "react-icons/fa";
import {IoList} from "react-icons/io5";

function ContestAddComponent() {
    const {auth} = useAuth();
    const validationSchema = ContestFormSchemaValidations.contestFormSchema;
    const [contestModel, setContestModel] = useState({});
    const navigate = useNavigate();
    const {showSuccessToast, showErrorToast} = useToast();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            (function getData() {
                ArtSchoolApi().contestTypeApi.getByTypeName(auth?.userAuthenticated?.token, "Admitere")
                    .then(function (contestType) {
                        let contestModel = ArtSchoolModelsForms().contestModel;
                        contestModel.contestTypeId = contestType.contestTypeId;
                        setContestModel(contestModel);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const addContest = async function (contest) {
        contest.contestTypeStageDtoList = [];
        contest.INCARCAREA_DOCUMENTELOR.contestTypeId = contest.contestTypeId;
        contest.VALIDAREA_DOCUMENTELOR.contestTypeId = contest.contestTypeId;
        contest.EXAMEN_ADMITERE.contestTypeId = contest.contestTypeId;
        contest.AFISAREA_REZULTATELOR.contestTypeId = contest.contestTypeId;

        contest.contestTypeStageDtoList.push(contest.INCARCAREA_DOCUMENTELOR);
        contest.contestTypeStageDtoList.push(contest.VALIDAREA_DOCUMENTELOR);
        contest.contestTypeStageDtoList.push(contest.EXAMEN_ADMITERE);
        contest.contestTypeStageDtoList.push(contest.AFISAREA_REZULTATELOR);

        ArtSchoolApi().contestApi.add(auth?.userAuthenticated?.token, contest)
            .then(function (response) {
                showSuccessToast("", "Concursul a fost adăugat cu succes.");
                navigate(routes.adminRoutes.ContestListComponent.path, {replace: true});
            })
            .catch(function (err) {
                showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                console.error(err);
            });
    }

    const buttonsConfig = function () {
        return {
            actionButton: {
                buttonIcon: <FaTrophy/>,
                title: "Adaugă"
            },
            backButton: {
                buttonIcon: <IoList/>,
                title: "Înapoi"
            }
        }
    }

    return (
        <>
            <div className="p-5">
                <ContestForm model={contestModel} validationSchema={validationSchema}
                             handleSubmit={addContest} action={"Adaugă concurs cu etapele acestuia"} deleteAction={false} editAction={false}
                             buttonsConfig={buttonsConfig()}/>
            </div>
        </>
    )
}

export default ContestAddComponent