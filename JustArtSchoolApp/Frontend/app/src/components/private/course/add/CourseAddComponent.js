import React from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {CourseFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolModelsForms from "../../../../models/ArtSchoolModelsForms";
import {useNavigate} from "react-router-dom";
import CourseDetailsForm from "../../../../forms/CourseDetailsForm";
import {BiSolidBookAdd} from "react-icons/bi";
import {ImBooks} from "react-icons/im";
import useToast from "../../../../utils/hooks/useToast";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";

function CourseAddComponent() {
    const {auth} = useAuth();
    const validationSchema = CourseFormSchemaValidations.courseFormSchema;
    const courseFormModel = ArtSchoolModelsForms().courseFormModel;
    const navigate = useNavigate();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    const addCourse =  function (subjectStudyPeriodCourseDetails) {
        subjectStudyPeriodCourseDetails.teacherIds = subjectStudyPeriodCourseDetails.teacherDtoList.map(teacher => teacher.userId);
        subjectStudyPeriodCourseDetails.subjectStudyPeriodCourseDetailsId = null;

        ArtSchoolApi().subjectStudyPeriodCourseDetailsApi.add(auth?.userAuthenticated?.token, subjectStudyPeriodCourseDetails)
            .then(function (response) {
                navigate(routes.adminRoutes.CourseListComponent.path, {replace: true});
                showSuccessToast("", "Cursul a fost adăugat cu succes.");
            })
            .catch(function (err) {
                showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                console.error(err);
            });
    }

    const buttonsConfig = function () {
        return {
            actionButton: {
                buttonIcon: <BiSolidBookAdd/>,
                title: "Adaugă"
            },
            backButton: {
                buttonIcon: <ImBooks/>,
                title: "Înapoi"
            }
        }
    }

    return (
        <>
            <div className="pt-5 mt-1">
                {/*<hr/>*/}
                <CourseDetailsForm model={courseFormModel} validationSchema={validationSchema}
                                   handleSubmit={addCourse} action={"Adaugă curs"} deleteAction={false} editAction = {false}
                                   buttonsConfig={buttonsConfig()}/>
            </div>
        </>
    )
}

export default CourseAddComponent