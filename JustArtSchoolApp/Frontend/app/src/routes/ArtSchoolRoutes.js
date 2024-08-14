import React from "react";
import HomeComponent from "../components/public/HomeComponent";
import AuthenticationComponent from "../components/public/authenticate/AuthenticationComponent";
import UserListComponent from "../components/private/user/list/UserListComponent";
import UserAddComponent from "../components/private/user/add/UserAddComponent";
import ProfileComponent from "../components/private/profile/ProfileComponent";
import SecretaryEditComponent from "../components/private/user/edit/SecretaryEditComponent";
import TeacherEditComponent from "../components/private/user/edit/TeacherEditComponent";
import SecretaryDeleteComponent from "../components/private/user/delete/SecretaryDeleteComponent";
import TeacherDeleteComponent from "../components/private/user/delete/TeacherDeleteComponent";
import {Route} from "react-router-dom";
import SubjectAddComponent from "../components/private/subjects/add/SubjectAddComponent";
import SubjectEditComponent from "../components/private/subjects/edit/SubjectEditComponent";
import SubjectListComponent from "../components/private/subjects/list/SubjectListComponent";
import RegistrationDocumentsAddComponent
    from "../components/private/registrationDocuments/add/RegistrationDocumentsAddComponent";
import RegistrationDocumentsListComponent
    from "../components/private/registrationDocuments/list/RegistrationDocumentsListComponent";
import RegistrationDocumentsDeleteComponent
    from "../components/private/registrationDocuments/delete/RegistrationDocumentsDeleteComponent";
import RegistrationDocumentsEditComponent
    from "../components/private/registrationDocuments/edit/RegistrationDocumentsEditComponent";
import CourseListComponent from "../components/private/course/list/CourseListComponent";
import CourseAddComponent from "../components/private/course/add/CourseAddComponent";
import CourseDeleteComponent from "../components/private/course/delete/CourseDeleteComponent";
import CourseEditComponent from "../components/private/course/edit/CourseEditComponent";
import StudentListComponent from "../components/private/student/list/StudentListComponent";
import StudentAddComponent from "../components/private/student/add/StudentAddComponent";
import SubjectDeleteComponent from "../components/private/subjects/delete/SubjectDeleteComponent";
import SecretaryCourseView from "../components/private/course/secretaryView/SecretaryCourseView";
import SecretarySubjectView from "../components/private/subjects/secretaryView/SecretarySubjectView";
import GradeChooseCourseComponent from "../components/private/student/grades/GradeChooseCourseComponent";
import GradeAddComponent from "../components/private/student/grades/add/GradeAddComponent";
import CourseConfiguration from "../components/private/course/configuration/CourseConfiguration";
import ChooseStudents from "../components/private/course/configuration/ChooseStudents";
import ContestAddComponent from "../components/private/contest/add/ContestAddComponent";
import ContestListComponent from "../components/private/contest/list/ContestListComponent";
import ContestEditComponent from "../components/private/contest/edit/ContestEditComponent";
import ContestDeleteComponent from "../components/private/contest/delete/ContestDeleteComponent";
import ContestViewComponent from "../components/private/contest/view/ContestViewComponent";


const artSchoolRoutes = {
    AuthenticationComponent: {
        name: "LogInComponent",
        key: "logInForm",
        path: "/logIn",
        component: <AuthenticationComponent/>,
    },

    HomeComponent: {
        name: "HomeComponent",
        key: "dashboard",
        path: "/admin_home",
        component: <HomeComponent/>,
    },

    UserListComponent: {
        name: "UserListComponent",
        key: "tables",
        path: "/user/list",
        component: <UserListComponent/>,
    },

    UserAddComponent: {
        name: "UserAddComponent",
        key: "UserAddComponent",
        path: "/user/add",
        component: <UserAddComponent/>,
    },

    SecretaryEditComponent: {
        name: "SecretaryEditComponent",
        key: "SecretaryEditComponent",
        path: "/user/secretary/edit/:id",
        component: <SecretaryEditComponent/>,
    },

    TeacherEditComponent: {
        name: "TeacherEditComponent",
        key: "TeacherEditComponent",
        path: "/user/teacher/edit/:id",
        component: <TeacherEditComponent/>,
    },

    SecretaryDeleteComponent: {
        name: "SecretaryDeleteComponent",
        key: "SecretaryDeleteComponent",
        path: "/user/secretary/delete/:id",
        component: <SecretaryDeleteComponent/>,
    },

    TeacherDeleteComponent: {
        name: "TeacherDeleteComponent",
        key: "TeacherDeleteComponent",
        path: "/user/teacher/delete/:id",
        component: <TeacherDeleteComponent/>,
    },

    SubjectListComponent: {
        name: "SubjectListComponent",
        key: "SubjectListComponent",
        path: "/subject/list",
        component: <SubjectListComponent/>,
    },

    SubjectAddComponent: {
        name: "SubjectAddComponent",
        key: "SubjectAddComponent",
        path: "/subject/add",
        component: <SubjectAddComponent/>,
    },

    SubjectEditComponent: {
        name: "SubjectEditComponent",
        key: "SubjectEditComponent",
        path: "/subject/edit/:ids",
        component: <SubjectEditComponent/>,
    },
    SubjectDeleteComponent: {
        name: "SubjectDeleteComponent",
        key: "SubjectDeleteComponent",
        path: "/subject/delete/:ids",
        component: <SubjectDeleteComponent/>,
    },
    RegistrationDocumentsListComponent: {
        name: "RegistrationDocumentsListComponent",
        key: "RegistrationDocumentsListComponent",
        path: "/registration/documents/list",
        component: <RegistrationDocumentsListComponent/>,
    },
    RegistrationDocumentsAddComponent: {
        name: "RegistrationDocumentsAddComponent",
        key: "RegistrationDocumentsAddComponent",
        path: "/registration/documents/add",
        component: <RegistrationDocumentsAddComponent/>,
    },
    RegistrationDocumentsEditComponent: {
        name: "RegistrationDocumentsEditComponent",
        key: "RegistrationDocumentsEditComponent",
        path: "/registration/documents/edit/:id",
        component: <RegistrationDocumentsEditComponent/>,
    },

    RegistrationDocumentsDeleteComponent: {
        name: "RegistrationDocumentsDeleteComponent",
        key: "RegistrationDocumentsDeleteComponent",
        path: "/registration/documents/delete/:id",
        component: <RegistrationDocumentsDeleteComponent/>,
    },

    CourseListComponent: {
        name: "CourseListComponent",
        key: "CourseListComponent",
        path: "/course/list",
        component: <CourseListComponent/>,
    },

    CourseAddComponent: {
        name: "CourseAddComponent",
        key: "CourseAddComponent",
        path: "/course/add",
        component: <CourseAddComponent/>,
    },

    CourseEditComponent: {
        name: "CourseEditComponent",
        key: "CourseEditComponent",
        path: "/course/edit/:ids",
        component: <CourseEditComponent/>,
    },

    CourseDeleteComponent: {
        name: "CourseDeleteComponent",
        key: "CourseDeleteComponent",
        path: "/course/delete/:ids",
        component: <CourseDeleteComponent/>,
    },

    ContestListComponent : {
        name: "ContestListComponent",
        key: "ContestListComponent",
        path: "/contest/list",
        component: <ContestListComponent/>,
    },

    ContestAddComponent: {
        name: "ContestAddComponent",
        key: "ContestAddComponent",
        path: "/contest/add",
        component: <ContestAddComponent/>,
    },

    ContestEditComponent: {
        name: "ContestEditComponent",
        key: "ContestEditComponent",
        path: "/contest/edit/:id",
        component: <ContestEditComponent/>,
    },

    ContestDeleteComponent: {
        name: "ContestDeleteComponent",
        key: "ContestDeleteComponent",
        path: "/contest/delete/:id",
        component: <ContestDeleteComponent/>,
    },

    ContestViewComponent : {
        name: "ContestViewComponent",
        key: "ContestViewComponent",
        path: "/contest/view/:id",
        component: <ContestViewComponent/>,
    },

    ProfileComponent: {
        name: "AdminProfileComponent",
        key: "AdminProfileComponent",
        path: "/profile",
        component: <ProfileComponent/>,
    },
}

const secretaryRoutes = {
    ProfileComponent: {
        name: "SecretaryProfileComponent",
        key: "SecretaryProfileComponent",
        path: "/secretary/profile",
        component: <ProfileComponent/>,
    },
    StudentListComponent: {
        name: "StudentListComponent",
        key: "StudentListComponent",
        path: "/students/list",
        component: <StudentListComponent/>,
    },
    // StudentAddComponent: {
    //     name: "StudentAddComponent",
    //     key: "StudentAddComponent",
    //     path: "/student/register",
    //     component: <StudentAddComponent/>,
    // },

    SecretaryCourseView: {
        name: "SecretaryCourseView",
        key: "SecretaryCourseView",
        path: "/secretary/course/view",
        component: <SecretaryCourseView/>,
    },

    CourseConfiguration: {
        name: "CourseConfiguration",
        key: "CourseConfiguration",
        path: "/secretary/course/configuration",
        component: <CourseConfiguration/>,
    },

    ChooseStudents: {
        name: "ChooseStudents",
        key: "ChooseStudents",
        path: "/secretary/course/choose/students/:ids",
        component: <ChooseStudents/>,
    },

    SecretarySubjectView: {
        name: "SecretarySubjectView",
        key: "SecretarySubjectView",
        path: "/secretary/subject/view",
        component: <SecretarySubjectView/>,
    },

    GradeChooseCourseComponent: {
        name: "GradeChooseCourseComponent",
        key: "GradeChooseCourseComponent",
        path: "/secretary/grades/choose/course",
        component: <GradeChooseCourseComponent/>,
    },
    GradeAddComponent: {
        name: "GradeAddComponent",
        key: "GradeAddComponent",
        path: "/secretary/grades/add/:ids",
        component: <GradeAddComponent/>,
    }
}

const teacherRoutes = {
    ProfileComponent: {
        name: "TeacherProfileComponent",
        key: "TeacherProfileComponent",
        path: "/teacher/profile",
        component: <ProfileComponent/>,
    },
}

const studentRoutes = {
    ProfileComponent: {
        name: "StudentProfileComponent",
        key: "StudentProfileComponent",
        path: "/student/profile",
        component: <ProfileComponent/>,
    },
    StudentAddComponent: {
        name: "StudentAddComponent",
        key: "StudentAddComponent",
        path: "/student/register",
        component: <StudentAddComponent/>,
    },
};

const routes = {
    adminRoutes: artSchoolRoutes,
    secretaryRoutes: secretaryRoutes,
    teacherRoutes: teacherRoutes,
    studentRoutes: studentRoutes,

    adminRouteList: function () {
        return Object.values(artSchoolRoutes);
    },

    secretaryRouteList: function () {
        return Object.values(secretaryRoutes);
    },

    teacherRouteList: function () {
        return Object.values(teacherRoutes);
    },

    studentRouteList: function () {
        return Object.values(studentRoutes);
    },

    getAdminRoutes: function () {
        return this.adminRouteList().map(function (route) {
            if (route.path) {
                return <Route exact path={route.path} element={route.component} key={route.key}/>;
            }
            return null;
        });
    },

    getSecretaryRoutes: function () {
        return this.secretaryRouteList().map(function (route) {
            if (route.path) {
                return <Route exact path={route.path} element={route.component} key={route.key}/>;
            }
            return null;
        });
    },

    getTeacherRoutes: function () {
        return this.teacherRouteList().map(function (route) {
            if (route.path) {
                return <Route exact path={route.path} element={route.component} key={route.key}/>;
            }
            return null;
        });
    },

    getStudentRoutes: function () {
        return this.studentRouteList().map(function (route) {
            if (route.path) {
                return <Route exact path={route.path} element={route.component} key={route.key}/>;
            }
            return null;
        });
    },
}

export default routes;