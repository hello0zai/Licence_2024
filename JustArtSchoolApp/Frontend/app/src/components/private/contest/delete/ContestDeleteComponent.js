import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {
    ContestFormSchemaValidations
} from "../../../../utils/validations/ValidationsLibrary";
import {useNavigate, useParams} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import {HiMiniClipboardDocumentList} from "react-icons/hi2";
import {MdModeEditOutline} from "react-icons/md";
import useToast from "../../../../utils/hooks/useToast";
import ContestForm from "../../../../forms/ContestForm";
import routes from "../../../../routes/ArtSchoolRoutes";
import {AiTwotoneDelete} from "react-icons/ai";

function ContestDeleteComponent() {
    const {auth} = useAuth();
    const validationSchema = ContestFormSchemaValidations.contestFormSchema;
    const {id} = useParams();
    const [contest, setContest] = useState({});
    const navigate = useNavigate();
    const {showSuccessToast, showErrorToast} = useToast();

    useEffect( () => {
        if (auth?.userAuthenticated?.token && id) {
            (function getData() {
                ArtSchoolApi().contestApi.getById(auth?.userAuthenticated?.token, id)
                    .then(function (contest) {
                        ArtSchoolApi().contestTypeStageApi.getAllByContestId(auth?.userAuthenticated?.token, id)
                            .then(function(list){
                                list.forEach(cts => {
                                    contest.contestTypeId = cts.contestTypeId;
                                    const stageName = cts.stageDto.stageName;
                                    cts.contestDto = null;
                                    cts.stageDto = null;
                                    cts.contestTypeDto = null;
                                    contest[stageName] = cts;
                                });

                                setContest(contest);
                            })
                            .catch(function (err){
                                console.error(err);
                            });
                    })
                    .catch(function (err) {
                        showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                        console.error(err);
                    });
            }());
        }

    }, [auth, id]);

    const deleteContest = async function (contest) {
        ArtSchoolApi().contestApi.delete(auth?.userAuthenticated?.token, id)
            .then(function (response) {
                showSuccessToast("", "Concursul a fost șters cu succes.");
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
                buttonIcon: <AiTwotoneDelete/>,
                title: "Șterge"
            },
            backButton: {
                buttonIcon: <HiMiniClipboardDocumentList/>,
                title: "Înapoi"
            }
        }
    }

    return (
        <>
            {contest ?
                <div className="p-5">
                    <ContestForm model={contest} validationSchema={validationSchema}
                                 handleSubmit={deleteContest} action={"Șterge concursul de admitere cu etapele acestuia"}
                                 deleteAction={true}
                                 buttonsConfig={buttonsConfig()}/>
                </div>
                : null}
        </>
    )
}

export default ContestDeleteComponent
