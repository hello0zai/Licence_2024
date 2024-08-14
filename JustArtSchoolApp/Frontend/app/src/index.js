import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ArtSchoolApp from './ArtSchoolApp';
import './utils/libs/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./utils/context/AuthProvider";
import {Global} from "./utils/context/Global";
import {ToastProvider} from "./utils/context/ToastProvider";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Global>
                    <ToastProvider>
                        <ArtSchoolApp/>
                    </ToastProvider>
                </Global>
            </AuthProvider>
        </BrowserRouter>
    // </React.StrictMode>
);