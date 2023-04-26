import React, { useEffect } from 'react';
import { LoginForm } from './components/authentication/LoginForm'
import axios from "axios";
import './Components/login.css'
import {useNavigate} from "react-router-dom";

function Login() {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    const navigate = useNavigate();

    const http = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'x-csrf-token': 'csrf_token',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
    async function login() {
        console.log("usernameRef = ",usernameRef.current.value)
        const csrf = await http.get('/sanctum/csrf-cookie');
        console.log("csrf=", csrf);

        const response = await http.post('/api/login', {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        });
        console.log("response=", response);
        console.log("token=",response.data.token);
        localStorage.setItem('token',response.data.token);
        navigate("/preferences");
        passwordRef.current.value='';
    }
   
    return(
        <div className="formContainer">
            {/* <LoginForm /> */}
            
        </div>
    );
}

export default Login
