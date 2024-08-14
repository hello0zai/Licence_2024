import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {CourseFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolModelsForms from "../../../../models/ArtSchoolModelsForms";
import {useNavigate, useParams} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import {ImBooks} from "react-icons/im";
import CourseDetailsForm from "../../../../forms/CourseDetailsForm";
import routes from "../../../../routes/ArtSchoolRoutes";
import {AiTwotoneDelete} from "react-icons/ai";
import useToast from "../../../../utils/hooks/useToast";

function CourseDeleteComponent() {
    const {auth} = useAuth();
    const validationSchema = CourseFormSchemaValidations.courseFormSchema;
    const courseFormModel = ArtSchoolModelsForms().courseFormModel;
    const [subjectStudyPeriodCourseDetails, setSubjectStudyPeriodCourseDetails] = useState();
    const navigate = useNavigate();
    const {ids} = useParams();
    const idList = ids.split('&&');
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    useEffect(() => {
        const subjectStudyPeriodCourseDetailsId = {
            subjectId: idList[0],
            studyPeriodId: idList[1],
            courseId: idList[2],
            studyYearId: idList[3]
        };
        if (auth?.userAuthenticated?.token) {
            (function getData() {
                ArtSchoolApi().subjectStudyPeriodCourseDetailsApi.getById(auth?.userAuthenticated?.token, subjectStudyPeriodCourseDetailsId)
                    .then(function (subjectStudyPeriodCourseDetails) {
                        setSubjectStudyPeriodCourseDetails(subjectStudyPeriodCourseDetails);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const deleteCourse = async function (subjectStudyPeriodCourseDetails) {
        ArtSchoolApi().subjectStudyPeriodCourseDetailsApi.delete(auth?.userAuthenticated?.token, subjectStudyPeriodCourseDetails.subjectStudyPeriodCourseDetailsId)
            .then(function (response) {
                showSuccessToast("","Cursul a fost șters cu succes.");
                navigate(routes.adminRoutes.CourseListComponent.path, {replace: true});
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
                buttonIcon: <ImBooks/>,
                title: "Înapoi"
            }
        }
    }

    return (
        <>
            {subjectStudyPeriodCourseDetails ?
                <div className="p-5">
                    {/*<hr/>*/}
                    <CourseDetailsForm model={subjectStudyPeriodCourseDetails} validationSchema={validationSchema}
                                       handleSubmit={deleteCourse} action={"Șterge"} deleteAction={true} editAction = {false}
                                       buttonsConfig={buttonsConfig()}/>
                </div> : null
            }
        </>
    );
}

export default CourseDeleteComponent
