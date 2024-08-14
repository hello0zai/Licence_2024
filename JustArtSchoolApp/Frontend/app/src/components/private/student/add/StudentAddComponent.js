import React, {useEffect, useRef, useState} from 'react'
import {Steps} from "primereact/steps";
import useAuth from "../../../../utils/hooks/useAuth";
import {StudentFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolModelsForms from "../../../../models/ArtSchoolModelsForms";
import StudentForm from "../../../../forms/StudentForm";
import UploadDocuments from "./documents/UploadDocuments";
import ChooseSubjects from "./chooseSujects/ChooseSubjects";
import useToast from "../../../../utils/hooks/useToast";
import {Stack} from "@mui/material";
import {Button} from "primereact/button";
import {GrLinkNext, GrLinkPrevious} from "react-icons/gr";
import UploadRegistrationForms from "./chooseSujects/UploadRegistrationForms";
import ArtSchoolApi from "../../../../api/art_school_api";
import inputsUtils from "../../../../utils/functions/inputsProcessing";
import routes from "../../../../routes/ArtSchoolRoutes";
import {useNavigate} from "react-router-dom";

Array.prototype.cluster = function (keyGetter) {
    const obj = {};

    this.forEach(function (element) {
        const key = keyGetter(element);
        if (!obj[key]) {
            obj[key] = [];
        }
        obj[key].push(element);
    });
    return obj;
}

function StudentAddComponent() {
    const {auth} = useAuth();
    const [activeIndex, setActiveIndex] = useState(1);
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    const validationSchema = StudentFormSchemaValidations.studentFormFormSchema;
    const studentFormModel = ArtSchoolModelsForms().studentModel;

    const [subjectStudyPeriodList, setSubjectStudyPeriodList] = useState([]);
    const [studentDocumentList, setStudentDocumentList] = useState([]);
    const [registrationDocumentList, setRegistrationDocumentList] = useState([]);
    const [studentSubjectStudyPeriodDetailsList, setStudentSubjectStudyPeriodDetailsList] = useState([]);
    const [registrationForms, setRegistrationForms] = useState([]);

    const [objectBySubjectStudyPeriodId, setObjectBySubjectStudyPeriodId] = useState({});
    const [objectByStudentRegistrationDocumentId, setObjectByStudentRegistrationDocumentId] = useState(null);
    const [objectByStudentSubjectStudyPeriodId, setObjectByStudentSubjectStudyPeriodId] = useState(null);


    const [student, setStudent] = useState(null);
    const [existingStudent, setExistingStudent] = useState(false);
    const formRef = useRef(null);
    const registerFormUploadRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {

            // get getRegistrationDocument
            if (!registrationDocumentList.length) {
                (function getRegistrationDocument() {
                    ArtSchoolApi().registrationDocumentApi.getAll(auth?.userAuthenticated?.token)
                        .then(function (registrationDocumentList) {
                            const list = registrationDocumentList.map(function (document) {
                                return document;
                            });
                            setRegistrationDocumentList(registrationDocumentList);
                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                }());
            }

            // get subjectStudyPeriod
            if (!subjectStudyPeriodList.length) {
                (function getSubjectStudyPeriod() {
                    ArtSchoolApi().subjectStudyPeriodsApi.getAll(auth?.userAuthenticated?.token)
                        .then(function (subjectStudyPeriodList) {

                            subjectStudyPeriodList = subjectStudyPeriodList.map(function (subjectStudyPeriod) {
                                subjectStudyPeriod.checked = false;
                                return subjectStudyPeriod;
                            });

                            setSubjectStudyPeriodList(subjectStudyPeriodList);

                            let studentSubjectStudyPeriodDetailsList = subjectStudyPeriodList.map(function (subjectStudyPeriod) {
                                let studentSubjectStudyPeriodDetailsModel = ArtSchoolModelsForms().studentSubjectStudyPeriodDetailsModel;
                                studentSubjectStudyPeriodDetailsModel.subjectStudyPeriodId.subjectId = subjectStudyPeriod.subjectStudyPeriodId.subjectId;
                                studentSubjectStudyPeriodDetailsModel.subjectStudyPeriodId.studyPeriodId = subjectStudyPeriod.subjectStudyPeriodId.studyPeriodId;
                                studentSubjectStudyPeriodDetailsModel.subjectStudyPeriodId = subjectStudyPeriod.subjectStudyPeriodId;
                                studentSubjectStudyPeriodDetailsModel.subjectStudyPeriodDto = subjectStudyPeriod;
                                studentSubjectStudyPeriodDetailsModel.checked = false;
                                return studentSubjectStudyPeriodDetailsModel;
                            });

                            const objectBySubjectStudyPeriodId = studentSubjectStudyPeriodDetailsList.cluster(function (studentSubjectStudyPeriodDetails) {
                                const key = studentSubjectStudyPeriodDetails.subjectStudyPeriodId;
                                return JSON.stringify(key);
                            });

                            setObjectBySubjectStudyPeriodId(objectBySubjectStudyPeriodId);
                        })
                        .catch(function (err) {
                            console.error(err);
                        });
                }());
            }

            // prepare document selections
            if (student &&
                !objectByStudentRegistrationDocumentId) {
                prepareDocumentSelection();
            }

            // prepare registration document selections
            if (student && studentSubjectStudyPeriodDetailsList.length && activeIndex > 2 && !objectByStudentSubjectStudyPeriodId) {
                prepareRegistrationDocumentSelections();
            }

        }
    }, [auth, student, studentDocumentList, studentSubjectStudyPeriodDetailsList]);


    const prepareDocumentSelection = function () {
        const studentDocumentList = [];
        for (let i = 0; i < registrationDocumentList.length; i++) {
            const studentRegistrationDocumentModel = ArtSchoolModelsForms().studentRegistrationDocumentModel;
            studentRegistrationDocumentModel.studentRegistrationDocumentId.studentId = student.userId;
            studentRegistrationDocumentModel.studentRegistrationDocumentId.registrationDocumentId = registrationDocumentList[i].registrationDocumentId;
            studentRegistrationDocumentModel.registrationDocumentDto = registrationDocumentList[i];
            studentRegistrationDocumentModel.pdfDocument = null;
            studentDocumentList.push(studentRegistrationDocumentModel);
        }

        const objectByStudentRegistrationDocumentId = studentDocumentList.cluster(function (studentDocument) {
            const key = studentDocument.studentRegistrationDocumentId;
            return JSON.stringify(key);
        });

        setObjectByStudentRegistrationDocumentId(objectByStudentRegistrationDocumentId);
    }

    const prepareRegistrationDocumentSelections = function () {
        const studentRegistrationForms = [];
        for (let i = 0; i < studentSubjectStudyPeriodDetailsList.length; i++) {
            const studentSubjectStudyPeriodDetailsModel = ArtSchoolModelsForms().studentSubjectStudyPeriodDetailsModel;
            const studentSubjectStudyPeriod = studentSubjectStudyPeriodDetailsList[i];
            studentSubjectStudyPeriodDetailsModel.studentSubjectStudyPeriodDetailsId.studentId = student.userId;
            studentSubjectStudyPeriodDetailsModel.studentSubjectStudyPeriodDetailsId.subjectId = studentSubjectStudyPeriod.subjectStudyPeriodId.subjectId;
            studentSubjectStudyPeriodDetailsModel.studentSubjectStudyPeriodDetailsId.studyPeriodId = studentSubjectStudyPeriod.subjectStudyPeriodId.studyPeriodId;
            studentSubjectStudyPeriodDetailsModel.registrationForm = null;

            studentRegistrationForms.push(studentSubjectStudyPeriodDetailsModel);
        }

        const objectByStudentSubjectStudyPeriodId = studentRegistrationForms.cluster(function (studentSubjectStudyPeriod) {
            const key = studentSubjectStudyPeriod.studentSubjectStudyPeriodDetailsId;
            return JSON.stringify(key);
        });

        setObjectByStudentSubjectStudyPeriodId(objectByStudentSubjectStudyPeriodId);
    }

    const reloadDocuments = function () {
        Object.keys(objectByStudentRegistrationDocumentId).map((key) => {
            if (objectByStudentRegistrationDocumentId[key][0].pdfDocument) {
                const file = objectByStudentRegistrationDocumentId[key][0].pdfDocument;
                const fileInformation = {
                    name: "try.pdf",
                    size: 12345
                }
                objectByStudentRegistrationDocumentId[key][0].ref.setFiles([fileInformation]);
            }
        });
    }

    const buttonsConfig = function () {
        return {
            nextStepButton: {
                buttonIcon: <GrLinkNext style={{color: 'white'}}/>,
                title: "NEXT"
            },
            previousStepButton: {
                buttonIcon: <GrLinkPrevious style={{color: 'white'}}/>,
                title: "BACK"
            }
        }
    }

    const removeHandler = function (event, documentInfo) {
        const studentRegistrationDocumentId = {};
        studentRegistrationDocumentId.studentId = student.userId;
        studentRegistrationDocumentId.registrationDocumentId = documentInfo.registrationDocumentId;

        const id = JSON.stringify(studentRegistrationDocumentId);
        objectByStudentRegistrationDocumentId[id][0].pdfDocument = null;
        objectByStudentRegistrationDocumentId[id][0].category = documentInfo.documentName;
        setObjectByStudentRegistrationDocumentId(objectByStudentRegistrationDocumentId);

        showSuccessToast("", `Ați încărcat un document PDF asociat câmpului "${documentInfo.documentName}"`);
    }

    const uploadStudentDocument = async function (event, documentInfo) {
        const file = event.files[0];

        const allowedExtension = 'pdf';

        if (!file?.name.toLowerCase().endsWith(`.${allowedExtension}`)) {
            showInfoToast("", "Se acceptă doar documente de tip PDF. Vă rugăm să selectați astfel de documente.");
            const ref = documentInfo.ref;
            ref.current.clear();
            return;
        }

        const studentRegistrationDocumentId = {};
        studentRegistrationDocumentId.studentId = student.userId;
        studentRegistrationDocumentId.registrationDocumentId = documentInfo.registrationDocumentId;

        const id = JSON.stringify(studentRegistrationDocumentId);
        objectByStudentRegistrationDocumentId[id][0].pdfDocument = file;
        objectByStudentRegistrationDocumentId[id][0].category = documentInfo.documentName;
        objectByStudentRegistrationDocumentId[id][0].ref = documentInfo.ref;
        setObjectByStudentRegistrationDocumentId(objectByStudentRegistrationDocumentId);

        showSuccessToast("", `Ați încărcat un document PDF asociat câmpului "${documentInfo.documentName}"`);
    }

    const selectSubjectStudyPeriod = function (event, rowData) {
        const id = JSON.stringify(rowData.subjectStudyPeriodId);
        objectBySubjectStudyPeriodId[id][0].checked = event.target.checked;
        const index = subjectStudyPeriodList.findIndex(object => {
            return id === JSON.stringify(object.subjectStudyPeriodId);
        });
        subjectStudyPeriodList[index].checked = event.target.checked;
        setObjectBySubjectStudyPeriodId(objectBySubjectStudyPeriodId);
    }

    const uploadRegistrationForm = function (event, rowData) {
        const file = event.target.files[0];
        const allowedExtension = 'pdf';

        const studentSubjectStudyPeriodDetailsId = {};
        studentSubjectStudyPeriodDetailsId.studentId = student.userId;
        studentSubjectStudyPeriodDetailsId.subjectId = rowData.subjectStudyPeriodId.subjectId;
        studentSubjectStudyPeriodDetailsId.studyPeriodId = rowData.subjectStudyPeriodId.studyPeriodId;

        const id = JSON.stringify(studentSubjectStudyPeriodDetailsId);

        if (!file) {
            const ref = rowData.ref;
            ref.current.value = null;
            showInfoToast("", `Ați șters documentul "${objectByStudentSubjectStudyPeriodId[id][0].registrationForm?.name}"`);
            objectByStudentSubjectStudyPeriodId[id][0].registrationForm = null;
            return false;
        }

        if (!file?.name.toLowerCase().endsWith(`.${allowedExtension}`)) {
            const ref = rowData.ref;
            ref.current.value = null;
            objectByStudentSubjectStudyPeriodId[id][0].registrationForm = null;
            showInfoToast("", "Se acceptă doar documente de tip PDF. Vă rugăm să selectați astfel de documente.");
            return false;
        }

        objectByStudentSubjectStudyPeriodId[id][0].registrationForm = file;
        setObjectByStudentSubjectStudyPeriodId(objectByStudentSubjectStudyPeriodId);

        showSuccessToast("", `Fișa de înscriere "${file.name}" s-a încărcat cu succes`);
    }

    // Step 1
    const validateForm = async function () {
        const formikForm = formRef.current;
        const errors = await formikForm.validateForm();
        const values = await formikForm.values;

        if (Object.keys(errors).length > 0) {
            await formikForm.setTouched(Object.keys(errors).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {}));
            showErrorToast("", 'Formularul este invalid. Vă rugăm să corectați erorile, pentru a trece la pasul următor!');
            return null;
        }
        return values;
    }

    // Step 2
    const validateStepTwo = function () {
        let messageError = null;
        let documents = Object.keys(objectByStudentRegistrationDocumentId).map((key) => {
            if (objectByStudentRegistrationDocumentId[key][0].pdfDocument) {
                return objectByStudentRegistrationDocumentId[key][0];
            }
            if (objectByStudentRegistrationDocumentId[key][0].registrationDocumentDto.mandatory) {
                const documentName = objectByStudentRegistrationDocumentId[key][0].registrationDocumentDto.documentName;
                messageError = `Vă rugăm să alegeți și să încărcați un document PDF pentru câmpul  "${documentName}" care este obligatoriu. Pentru mai multe detalii consultați instrucțiunile.`;
                showErrorToast("", messageError, 10000);
            }
            return null;
        }).filter((item) => item !== null);

        if (messageError) {
            documents = [];
        }

        return documents;
    }

    // Step 3
    const validateStepThree = function () {
        const selectedItems = Object.keys(objectBySubjectStudyPeriodId).map((key) => {
            if (objectBySubjectStudyPeriodId[key][0].checked) {
                objectBySubjectStudyPeriodId[key][0].ref = React.createRef();
                return objectBySubjectStudyPeriodId[key][0];
            }
            return null;
        }).filter((item) => item !== null);

        if (!selectedItems.length) {
            showErrorToast("", 'Pentru a trece la pasul următor selectați disciplinele la care s-a înscris studentul!');
            return null;
        }

        return selectedItems;
    }

    // Step 4
    const validateStepFour = function () {
        let messageError = null;
        let registrationForms = Object.keys(objectByStudentSubjectStudyPeriodId).map((key) => {
            if (!objectByStudentSubjectStudyPeriodId[key][0].registrationForm) {
                messageError = `Vă rugăm să încărcați fișa de înscriere pentru fiecare disciplină din tabel`;
                return;
            }
            return objectByStudentSubjectStudyPeriodId[key][0];
        }).filter((item) => item !== null);

        if (messageError) {
            showErrorToast("", messageError, 10000);
            return [];
        }
        return registrationForms;
    }

    // Actions
    // Step1
    const addStudent = async function (student) {
        student.userAccount.email = inputsUtils.calculateEmail(student.lastName, student.firstName, ("STUDENT").toLowerCase());
        try {
            const response = await ArtSchoolApi().studentApi.add(auth?.userAuthenticated?.token, student);
            setStudent(response);
            showSuccessToast("", "Studentul a fost adăugat cu succes");
            return response;
        } catch (err) {
            console.error(err);
            showErrorToast("", "A apărut o eroare la adăugarea studentului. Vă rugăm contactați administratorul.");
        }
        return false;
    }

    // Step 2
    const addStudentDocuments = function (documents) {
        const promises = documents.map(async (document) => {
            if (document.pdfDocument) {
                return await ArtSchoolApi().studentRegistrationDocumentApi.add(auth?.userAuthenticated?.token, document);
            }
            return null;
        });
        return Promise.all(promises);
    }

    // Step 4
    const addStudentSubjectStudyPeriod = function (details) {
        const promises = details.map(async (studentSubjectStudyPeriod) => {
            if (studentSubjectStudyPeriod.registrationForm) {
                return await ArtSchoolApi().studentSubjectStudyPeriodDetailsApi.add(auth?.userAuthenticated?.token, studentSubjectStudyPeriod);
            }
            return null;
        });
        return Promise.all(promises);
    }


    const previousStep = async function () {
        if (activeIndex === 2) {
            reloadDocuments();
        }
        setActiveIndex(activeIndex - 1);
    }

    const nextStep = async function () {
        if (activeIndex === 0 && !student) {
            const values = await validateForm();
            if (!values) {
                return;
            }
            const response = await addStudent(values);
            if (!response) {
                return;
            }
        }

        if (activeIndex === 1 && !studentDocumentList.length && !existingStudent) {
            const documents = validateStepTwo();
            if (!documents.length) {
                return;
            }

            setStudentDocumentList(documents);
            const responses = await addStudentDocuments(documents);

            if (responses.some(response => !response)) {
                showErrorToast("", "A apărut o eroare la adăugarea unuia sau mai multe documente. Vă rugăm contactați administratorul.");
                return;
            }
            showSuccessToast("", "Documentele au fost înregistrate cu succes");
        }

        if (activeIndex === 2 && !studentSubjectStudyPeriodDetailsList.length) {
            const selectedItems = validateStepThree();
            if (!selectedItems) {
                return;
            }
            setStudentSubjectStudyPeriodDetailsList(selectedItems);
        }

        if (activeIndex === 3) {
            const registrationDocuments = validateStepFour();
            if (!registrationDocuments.length) {
                return;
            }

            setRegistrationForms(registrationDocuments);
            const responses = await addStudentSubjectStudyPeriod(registrationDocuments);

            if (responses.some(response => !response)) {
                showErrorToast("", "A apărut o eroare la adăugarea configurațiilor. Vă rugăm contactați administratorul.");
                return;
            }
            showSuccessToast("", `Ați finalizat înscrierea studentului ${student.firstName} ${student.lastName}`);

            navigate(routes.secretaryRoutes.StudentListComponent.path, {replace: true});
        }

        if (activeIndex + 1 === items.length) return;
        setActiveIndex(activeIndex + 1);
    }

    const onClickIndexItem = function (event) {
        const index = items.findIndex(item => {
            return item.label === event.item.label;
        });
        if (index > activeIndex) {
            showInfoToast("", 'Pentru a trece la acest pas completați pasul anterior/pașii anteriori');
        } else if (index !== activeIndex) {
            showInfoToast("", 'Pentru a vizualiza pașii anteriori utilizați butonul "BACK" ');
        }
    }

    const getStudentByEmail  = function (event) {
        const email = event.currentTarget.value;
        if(!student) {
            ArtSchoolApi().studentApi.getByEmail(auth?.userAuthenticated?.token, email)
                .then(function (student) {
                    if(student) {
                        setStudent(student);
                        setExistingStudent(true);
                        showSuccessToast("",`Studentul cu emailul "${email}" este deja înregistrat în aplicație. Nu mai este necsar pasul 2.`);
                        setActiveIndex(2);
                    }
                })
                .catch(function (err) {
                });
        }
    }

    const items = [
        {
            label: 'Date student',
            command: (event) => {
                onClickIndexItem(event);
            },
            content: <StudentForm
                model={student || studentFormModel}
                validationSchema={validationSchema}
                key={activeIndex}
                formRef={formRef}
                action={"Adaugă"}
                readOnly={!!student}
                getStudentByEmail = {getStudentByEmail}
                buttonsConfig={buttonsConfig()}/>
        },
        {
            label: 'Documente',
            content: <UploadDocuments
                key={activeIndex}
                registrationDocumentList={registrationDocumentList}
                uploadStudentDocument={uploadStudentDocument}
                readOnly={studentDocumentList.length}
                buttonsConfig={buttonsConfig()}
                removeHandler={removeHandler}
            />,
            command: (event) => {
                onClickIndexItem(event);
            },
        },
        {
            label: 'Discipline',
            content: <ChooseSubjects
                key={activeIndex}
                subjectStudyPeriodList={subjectStudyPeriodList}
                selectSubjectStudyPeriod={selectSubjectStudyPeriod}
                objectBySubjectStudyPeriodId={objectBySubjectStudyPeriodId}
                readOnly={studentSubjectStudyPeriodDetailsList.length}
                setObjectBySubjectStudyPeriodId={setObjectBySubjectStudyPeriodId}
            />,
            command: (event) => {
                onClickIndexItem(event);
            },
        },
        {
            label: 'Fișe de înscriere',
            content: <UploadRegistrationForms
                key={activeIndex}
                studentSubjectStudyPeriodDetailsList={studentSubjectStudyPeriodDetailsList}
                // registerFormUploadRef={registerFormUploadRef}
                uploadRegistrationForm={uploadRegistrationForm}/>,
            command: (event) => {
                onClickIndexItem(event);
            },
        },
    ];

    return (
        <>
            <div>
                <Steps model={items}
                       activeIndex={activeIndex}
                       readOnly={false}/>
                <div className="pt-4">
                    <div className="d-flex px-4 py-1 justify-content-end">
                        <Stack direction="row" spacing={1}>
                            <Button variant="outlined"
                                    onClick={previousStep}
                                    disabled={activeIndex === 0}
                            >
                                {buttonsConfig().previousStepButton.title}
                            </Button>
                            <Button variant="outlined"
                                // disabled={activeIndex + 1 === items.length}
                                    onClick={nextStep}>
                                {activeIndex + 1 === items.length ? "Finalizează" : buttonsConfig().nextStepButton.title}
                            </Button>
                        </Stack>
                    </div>
                </div>
                <div className="pt-1">
                    {items[activeIndex].content}
                </div>
            </div>
        </>
    )
}

export default StudentAddComponent