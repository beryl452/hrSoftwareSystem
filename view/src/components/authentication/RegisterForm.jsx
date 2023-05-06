import React, { useEffect, useState } from 'react';
import axios from "axios";
import Users from '../dashboard/Users';

function Register() {
  // Refs
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
  // OR

  // Token in JSON.parse(localStorage.getItem('auth')).token
  const { token } = JSON.parse(localStorage.getItem('auth'));

  const header = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token
  };
  const http = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: header,
    withCredentials: true,
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
      "departmentRef = ", departmentRef.current.value,
      "roleRef = ", roleRef.current.value)

    const response = await http.post('/api/register', {
      username: usernameRef.current.value,
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmationRef.current.value,
      Birth: birthRef.current.value,
      function: functionRef.current.value,
      department_id: (departmentRef.current != null ? departmentRef.current.value : null),
      role: roleRef.current.value,
    })
      .then((response) => {
        console.log("response_Register =", response);
      })
      .catch((error) => {
        console.log("error_Register =", error);
      })
  }

  const [seeDepartment, setSeeDepartment] = React.useState(true);
  function handleChange() {
    (roleRef.current.value === 'Administrator' || roleRef.current.value === 'Payroll Manager') ? setSeeDepartment(false) : setSeeDepartment(true)
  }
  useEffect(() => {
    departments();
  }, []);

  return (
    <>
      <div className="grid gap-4 mb-4 sm:grid-cols-2" >
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
          <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='Username' autoComplete='username' ref={usernameRef} required=""></input>
        </div>
        <div>
          <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FirstName</label>
          <input type="text" name="firstname" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='First Name' autoComplete='firstname' ref={firstnameRef} required=""></input>
        </div>
        <div>
          <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LastName</label>
          <input type="text" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='Last Name' autoComplete='lastname' ref={lastnameRef} required=""></input>
        </div>
        <div>
          <label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth</label>
          <input type="date" name="birth" id="birth" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='Birth' autoComplete='birth' ref={birthRef} required=""></input>
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='Email' autoComplete='email' ref={emailRef} required=""></input>
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input type="text" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='Password' autoComplete='password' ref={passwordRef} required=""></input>
        </div>
        <div>
          <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Confirmation</label>
          <input type="text" name="password_confirmation" id="password_confirmation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='Password Confirmation' autoComplete='password_confirmation' ref={password_confirmationRef} required=""></input>
        </div>
        <div>
          <label htmlFor="function" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Function</label>
          <input type="text" name="function" id="function" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder='function' autoComplete='function' ref={functionRef} required=""></input>
        </div>
        <div>
          <label htmlFor="departments" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>

          {seeDepartment && <select name="department"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            id="department" ref={departmentRef}>
            {department.map((department) => (
              <option key={department.id} value={department.id}>{department.name}</option>
            ))}
          </select>}
          <label htmlFor="roles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Roles</label>
          <select name="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" id="role" ref={roleRef} onChange={handleChange}>
            {role.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

      </div>
      <button type="submit"
        onClick={() => { register() }}

        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        Create users
      </button>
 
    </>


  )
}
export default Register
