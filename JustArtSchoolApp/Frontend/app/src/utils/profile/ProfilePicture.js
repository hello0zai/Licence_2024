import React, {useState} from 'react'
import {Dialog} from "primereact/dialog";
import Avatar from "react-avatar-edit";
import {Card} from "primereact/card";
import {BiSolidUserCircle} from "react-icons/bi";

function ProfilePicture({profilePicture, setProfilePicture}) {
    const [imageCrop, setImageCrop] = useState(false);
    const [image, setImage] = useState(null);
    const [src, setSrc] = useState(false);
    const [profile, setProfile] = useState([]);
    const [pview, setPView] = useState(false);
    const [pictureProfile, setPictureProfile] = useState();
    const profileFinal = profile.map((item) => item.pview);

    const onClose = () => {
        setPView(false);
    }

    const onCrop = (view) => {
        setPView(view);
    }

    const saveCropImage = () => {
        setProfilePicture(pview);

        setProfile([...profile, {pview}]);

        setImageCrop(null);
    }

    const footer = (
        <div className={"d-flex justify-content-center pt-4 pb-4"}>
            <button className={"btn edit-button"} onClick={saveCropImage}>Salvează</button>
        </div>
    );

    const header = (
        <p className={"text-2xl font-semibold textColor"}>
            Alege o fotografie de profil
        </p>
    );

    const changeFile = function (event) {
        const file = event.target.files[0];
        if (file && file.type.substring(0, 5) === "image") {
            setImage(file);
            setProfilePicture(file);
        } else {
            setImage(null);
        }
    }


    return (<>
        {profilePicture ?
            <img className="bg-dark" style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                paddingInline: 0,
                objectFit: "cover",
                border: "4px solid rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))",
                boxShadow: "3px 2px 9px 10px #001b23",
                cursor: "pointer",
            }}
                 onClick={() => setImageCrop(true)}
                 src={profilePicture}
                 alt=""
            />
            :
            <BiSolidUserCircle style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                paddingInline: 0,
                objectFit: "cover",
                border: "4px solid rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))",
                boxShadow: "3px 2px 9px 10px #001b23",
                cursor: "pointer",
            }}
                               onClick={() => setImageCrop(true)}
            ></BiSolidUserCircle>
        }

        <div className={`${imageCrop ? 'dialog-backdrop' : ''}`}>
            <div className={`card bg-dark`}>
                <Dialog className={"bg-dark"} visible={imageCrop}
                        onHide={() => setImageCrop(false)}
                        dismissableMask={true}
                >
                    <Card className={"col-md-12"} footer={footer} header={header}>
                        <div className={"confirmation-content flex flex-column align-items-center"}>
                            <Avatar width={500}
                                    height={400}
                                    onCrop={onCrop}
                                    onClose={onClose}
                                    src={src}
                                    shadingColor={"#002b36"}
                                    backgroundColor={"#002b36"}
                            />
                        </div>
                    </Card>
                </Dialog>
            </div>
        </div>
    </>)
}

export default ProfilePicture


