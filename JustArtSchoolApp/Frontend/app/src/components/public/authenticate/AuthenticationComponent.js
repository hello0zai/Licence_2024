import React, {useState} from 'react'
import {Box, Container, Paper} from "@mui/material";
import Logo from '../../../utils/images/just_art_school_logo.png'
import '../../../utils/artschool_app_css/art_school_app_style.css'
import AuthenticationForm from "../../../forms/AuthenticationForm";

function AuthenticationComponent() {
    const [role, setRole] = useState();

    return (
        <div className={"d-flex"}>
            <Paper className={"bg-dark"}
                   sx={{
                       // backgroundImage: `url(${Image})`,
                       position: 'absolute',
                       width: '100%',
                       height: '100%',
                       backgroundPosition: 'center',
                       backgroundSize: 'cover',
                       backgroundRepeat: 'no-repeat',
                       // filter: 'blur(8px)'
                   }}>

                <Container component="main" maxWidth="xs">
                    <Box className={"bg-dark"}
                         sx={{
                             boxShadow: 10,
                             borderRadius: 5,
                             px: 4,
                             marginTop: 8,
                             display: "flex",
                             flexDirection: "column",
                             color: 'white'
                         }}
                    >
                        <div className={"d-flex justify-content-center pt-1"}>
                            <img src={Logo} width="210" height="190" alt="logo"/>
                        </div>
                        <hr/>
                        <Box className="pb-5"
                             sx={{mt: 1, mx: 3, color: 'white'}}>
                            <AuthenticationForm/>
                        </Box>
                    </Box>
                </Container>
            </Paper>
        </div>
    )
}

export default AuthenticationComponent

