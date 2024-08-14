import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {CourseFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolModelsForms from "../../../../models/ArtSchoolModelsForms";
import {useNavigate, useParams} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import {ImBooks} from "react-icons/im";
import CourseDetailsForm from "../../../../forms/CourseDetailsForm";
import {MdModeEditOutline} from "react-icons/md";
import routes from "../../../../routes/ArtSchoolRoutes";
import useToast from "../../../../utils/hooks/useToast";

function CourseEditComponent() {
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

                        subjectStudyPeriodCourseDetails.studyYear =  subjectStudyPeriodCourseDetails.subjectStudyPeriodCourseDetailsId.studyYearId;
                        console.log("MUIE " + JSON.stringify(subjectStudyPeriodCourseDetails));
                        setSubjectStudyPeriodCourseDetails(subjectStudyPeriodCourseDetails);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const updateCourse = async function (subjectStudyPeriodCourseDetails) {
        subjectStudyPeriodCourseDetails.teacherIds = subjectStudyPeriodCourseDetails.teacherDtoList.map(teacher => teacher.userId);
        ArtSchoolApi().subjectStudyPeriodCourseDetailsApi.edit(auth?.userAuthenticated?.token, subjectStudyPeriodCourseDetails)
            .then(function (response) {
                showSuccessToast("","Cursul a fost actualizat cu succes.");
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
                buttonIcon: <MdModeEditOutline/>,
                title: "Editează"
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
                                       handleSubmit={updateCourse} action={"Editează"} deleteAction={false} editAction = {true}
                                       buttonsConfig={buttonsConfig()}/>
                </div> : null
            }
        </>
    );
}

export default CourseEditComponent
