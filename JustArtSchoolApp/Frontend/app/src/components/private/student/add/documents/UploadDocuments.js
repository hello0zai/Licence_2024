import React, {useState} from 'react'
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Card} from "primereact/card";
import {IoWarning} from "react-icons/io5";
import {BsInfoCircleFill} from "react-icons/bs";
import {FileUpload} from "primereact/fileupload";
import useToast from "../../../../../utils/hooks/useToast";
import {FaFilePdf} from "react-icons/fa";

function UploadDocuments(config) {
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const registrationDocumentList = config.registrationDocumentList;
    const readOnly = config.readOnly;
    const uploadStudentDocument = config.uploadStudentDocument;
    const removeHandler = config.removeHandler;
    const [visibleDocumentsInfo, setVisibleDocumentsInfo] = useState(false);

    const chooseOptions = {icon: <FaFilePdf/>, className: 'custom-choose-btn p-button-rounded p-button-outlined'};

    const dropHandler = function (event) {
        const file = event.dataTransfer.files[0];
        const allowedExtension = 'pdf';

        if (!file.name.toLowerCase().endsWith(`.${allowedExtension}`)) {
            showInfoToast("", "Se acceptă doar documente de tip PDF. Vă rugăm să selectați astfel de documente.");
            return false;
        }
    }

    const getUploadContainers = function () {
        const elements = [];
        for (let i = 0; i < registrationDocumentList.length; i = i + 2) {
            const firstDocumentInfo = registrationDocumentList[i];
            const secondDocumentInfo = i + 1 < registrationDocumentList.length ? registrationDocumentList[i + 1] : null;

            elements.push(<div className="row pt-4">
                {firstDocumentInfo && (
                    <div className="col-md-6">
                        <p className="mb-1 document-name-style">{firstDocumentInfo.documentName}</p>
                        <div className="col-md-12">
                            <FileUpload
                                ref={(ref) => firstDocumentInfo.ref = ref}
                                accept=".pdf"
                                auto
                                customUpload={true}
                                disabled={readOnly}
                                uploadHandler={(event) => uploadStudentDocument(event, firstDocumentInfo)}
                                onBeforeDrop={(event) => dropHandler(event)}
                                onRemove={(event) => removeHandler(event, firstDocumentInfo)}
                                chooseOptions={chooseOptions}
                                chooseLabel="Alege fișier"
                                uploadLabel="Încarcă"
                                cancelLabel="Anulează"
                                emptyTemplate={<p className="d-flex justify-content-center">Trageți și plasați fișierul
                                    aici pentru a încărca.</p>}
                            />
                        </div>
                    </div>)}
                {secondDocumentInfo && (
                    <div className="col-md-6">
                        <p className="mb-1 document-name-style">{secondDocumentInfo.documentName}</p>
                        <FileUpload
                            ref={(ref) => secondDocumentInfo.ref = ref}
                            accept=".pdf"
                            auto
                            customUpload={true}
                            disabled={readOnly}
                            uploadHandler={(event) => uploadStudentDocument(event, secondDocumentInfo)}
                            onBeforeDrop={(event) => dropHandler(event)}
                            onRemove={(event) => removeHandler(event, secondDocumentInfo)}
                            chooseOptions={chooseOptions}
                            chooseLabel="Alege fișier"
                            uploadLabel="Încarcă"
                            cancelLabel="Anulează"
                            emptyTemplate={<p className="d-flex justify-content-center">Trageți și plasați fișierul
                                aici pentru a încărca.</p>}
                        />
                    </div>)}
            </div>);
        }
        return elements;
    }

    const footer = (
        <div className={"d-flex justify-content-center pt-4 pb-4"}>
            <Button label="Ok" className="btn edit-button"
                    onClick={() => setVisibleDocumentsInfo(false)}/>
        </div>
    );

    const header = (
        <h5>Instrucțiuni documente</h5>
    );

    const getDocumentsInstruction = function () {
        return (
            <div>
                <ul>
                    {
                        registrationDocumentList.map(registrationDocument => {
                            return (
                                <li>
                                    {registrationDocument.documentName}
                                    <div className="d-flex pt-2">
                                        <IoWarning style={{color: '#b58900'}}/>
                                        <p className="mx-3">{registrationDocument.description}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }

    const getDocumentsInstructionsContainer = function () {
        return (
            <div>
                <div className="d-flex justify-content-end">
                    <Button icon={<BsInfoCircleFill/>}
                            onClick={() => setVisibleDocumentsInfo(true)}/>
                </div>
                <div className={`${visibleDocumentsInfo ? 'dialog-backdrop' : ''}`}>
                    <Dialog className={"bg-dark"} visible={visibleDocumentsInfo}
                            onHide={() => setVisibleDocumentsInfo(false)} style={{
                        border: '4px solid #031a21',
                        maxHeight: '40rem',
                        boxShadow: '0 12px 8px 1px #031a21'
                    }}
                            dismissableMask={true}
                    >
                        <Card className={"col-md-12"} footer={footer} header={header}>
                            <div className={"confirmation-content flex flex-column align-items-center"}>
                                {getDocumentsInstruction()}
                            </div>
                        </Card>
                    </Dialog>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className={"container"}>
                {getDocumentsInstructionsContainer()}
                {getUploadContainers()}
            </div>
        </div>
    );
}

export default UploadDocuments