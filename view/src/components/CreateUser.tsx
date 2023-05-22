import React, { useEffect, useState } from 'react';
import axios from "axios";

function CreateUser() {
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
                console.log("response_CreateUser =", response);
            })
            .catch((error) => {
                console.log("error_CreateUser =", error);
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
            <div className="py-4 px-6.5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="grid gap-4 mb-4 sm:grid-cols-2" >
                        <div>
                            <label htmlFor="username" className="mb-3 block text-black dark:text-white">
                                UserName
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder='Username'
                                autoComplete='username'
                                ref={usernameRef}
                                required
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="firstname" className="mb-3 block text-black dark:text-white">
                                FirstName
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                placeholder='First Name'
                                autoComplete='firstname'
                                ref={firstnameRef}
                                required
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="mb-3 block text-black dark:text-white">
                                LastName
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder='Last Name'
                                autoComplete='lastname'
                                ref={lastnameRef}
                                required
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="birth" className="mb-3 block text-black dark:text-white">
                                Birthday
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="birth"
                                    id="birth"
                                    placeholder='Birth'
                                    autoComplete='birth'
                                    ref={birthRef}
                                    required
                                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="mb-3 block text-black dark:text-white">
                                Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder='Email'
                                autoComplete='email'
                                ref={emailRef}
                                required
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="mb-3 block text-black dark:text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Email'
                                autoComplete='email'
                                ref={passwordRef}
                                required
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="mb-3 block text-black dark:text-white">
                                Password Confirmation
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                id="password_confirmation"
                                placeholder='Password Confirmation'
                                autoComplete='password'
                                ref={password_confirmationRef}
                                required
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="function" className="mb-3 block text-black dark:text-white">
                                Function
                            </label>
                            <input
                                type="text"
                                name="function"
                                id="function"
                                placeholder='function'
                                autoComplete='function'
                                ref={functionRef}
                                required
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label htmlFor="departments" className="mb-3 block text-black dark:text-white">
                                Department
                            </label>
                            {seeDepartment && <select name="department"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                id="department"
                                ref={departmentRef}
                                onChange={handleChange}
                            >
                                {department.map((department) => (
                                    <option key={department.id} value={department.id}>{department.name}</option>
                                ))}
                            </select>}
                        </div>
                        <div>
                            <label htmlFor="roles" className="mb-3 block text-black dark:text-white">
                                Department
                            </label>
                            <select name="role"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                id="role"
                                ref={roleRef}
                                onChange={handleChange}
                                required
                            >
                                {role.map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        className="flex justify-center  items-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                        type="submit"
                        onClick={() => { register() }}
                    >
                        Create users
                    </button>
            </div>
        </>


    )
}
export default CreateUser;
