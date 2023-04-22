import React, {useEffect, useState} from 'react';
import axios from "axios";
import './Components/login.css'
import TextInput from "./Components/TextInput.jsx";

function Register() {
    const usernameRef = React.useRef();
    const firstnameRef = React.useRef();
    const lastnameRef = React.useRef();
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    const password_confirmationRef = React.useRef();
    const birthRef = React.useRef();
    const departmentRef = React.useRef();
    const roleRef = React.useRef();
    const functionRef = React.useRef();


    const header =  {
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
    };
    const http = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: header
    });

    const [department, setDepartment] = useState([]);
    const [role, setRole] = useState(['Task Manager', 'Administrator', 'Collaborator', 'Payroll Manager']);
    async function departments() {
        const response = await http.get('/api/departments');
        setDepartment(response.data);
        console.log("department =", department);
        department.map((department) => (
            console.log("department", department)
        ));
    }
    async function register() {
        
        console.log("usernameRef = ", usernameRef.current.value,
            "firstnameRef = ", firstnameRef.current.value,
            "lastnameRef = ", lastnameRef.current.value,
            "emailRef = ", emailRef.current.value,
            "passwordRef = ", passwordRef.current.value,
            "password_confirmationRef = ", password_confirmationRef.current.value,
            "birthRef = ", birthRef.current.value,
            "functionRef = ", functionRef.current.value,
            "departmentRef = ", departmentRef,
            "roleRef = ", roleRef.current.value)

        const response = await http.post('/api/register', {
            username: usernameRef.current.value,
            firstname: firstnameRef.current.value,
            lastname: lastnameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: password_confirmationRef.current.value,
            Birth: birthRef.current.value,
            function : functionRef.current.value,
            department_id: (departmentRef.current != null? department.current.value() : null),
            role: roleRef.current.value,
        })
            .then((response) => {
                console.log("response_Register =", response);
            })
            .catch((error) => {
                console.log("error_Register =", error);
            })
    }

    const [seeDepartment ,setSeeDepartment]=React.useState(true);
    function handleChange(){
        (roleRef.current.value === 'Administrator' || roleRef.current.value === 'Payroll Manager') ? setSeeDepartment(false) : setSeeDepartment(true)
    }
    useEffect(() => {
        departments();
    }, []);

    return (
      <div className="formContainer">
        <TextInput
            className="username"
            name= 'username'
            type='text'
            placeholder='Username'
            autoComplete='username'
            ref={usernameRef}
        />
        <TextInput
            className="firstname"
            name='firstname'
            type='text'
            placeholder='First Name'
            autoComplete='firstname'
            ref={firstnameRef}
        />
        <TextInput
            className="lastname"
            name='lastname'
            type='text'
            placeholder='Last Name'
            autoComplete='lastname'
            ref={lastnameRef}
        />
          <TextInput
              className="function"
              name='function'
              type='text'
              placeholder='function'
              autoComplete='function'
              ref={functionRef}
          />
          <TextInput
            className="email"
            name='email'
            type='email'
            placeholder='Email'
            autoComplete='email'
            ref={emailRef}
        />
        <TextInput
            className="password"
            name='password'
            type='password'
            placeholder='Password'
            autoComplete='current-password'
            ref={passwordRef}
        />
        <TextInput
            className="password_confirmation"
            name='password_confirmation'
            type='password'
            placeholder='Password Confirmation'
            autoComplete='current-password'
            ref={password_confirmationRef}
        />
        <TextInput
            className="birth"
            name='birth'
            type='date'
            placeholder='Birth'
            autoComplete='birth'
            ref={birthRef}
        />
        <select name="role" id="role" ref={roleRef} onChange={handleChange}>
            {role.map((role) => (
                <option key={role} value={role}>{role}</option>
            ))}
        </select>
          {seeDepartment && <select name="department" id="department" ref={departmentRef}>
              {department.map((department) => (
                  <option key={department.id} value={department.id}>{department.name}</option>
              ))}
          </select>}

          <button
              onClick={()=>{ register() }}
          >Register</button>
      </div>
    );
}


export default Register
