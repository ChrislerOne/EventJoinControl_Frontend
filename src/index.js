import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {Provider} from "react-redux";
import store from './utils/store/store'
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "./configs/firebaseConfig";

// FIREBASE
const app = initializeApp(firebaseConfig)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer
                position="bottom-left"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <App app={app}/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
