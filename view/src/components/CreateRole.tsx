import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function CreateRole() {
    const [role, setRole] = React.useState({
        nameRef: useRef<HTMLInputElement>(null),
        descriptionRef: useRef<HTMLTextAreaElement>(null),
    });
    const location = useLocation();

    const [errors, setErrors] = React.useState({
        role:
        {
            name: '',
            description: '',
        },
    });

    const navigate = useNavigate();

    const http = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'content-type': 'multipart/form-data',
            Accept: 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth') || '{}').token
                }`,
        },
        withCredentials: true,
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("data", {
            name: role.nameRef.current?.value,
            description: role.descriptionRef.current?.value,
        })
        http
            .post('/api/role/create', {
                name: role.nameRef.current?.value,
                description: role.descriptionRef.current?.value,
            })
            .then((response) => {
                console.log('response', response);
            })
            .catch((error) => {
                console.log('error', error.response.data.errors);
                setErrors({ ...errors, role: error.response.data.errors });
            });
    };

    useEffect(() => { }, []);
    return (
        // <div>
        //     {JSON.stringify(departments)}
        // </div>
        <div className="border rounded-lg border-stroke bg-white py-4 px-6.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <form
                onSubmit={handleSubmit}
                noValidate
                className="mb-4 grid gap-4 sm:grid-cols-2 "
            >
                <div>
                    <label
                        htmlFor="name"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Name
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="name"
                            autoComplete="name"
                            ref={role.nameRef}
                            required
                            className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {
                            errors.role.name && (
                                <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                    {errors.role.name}
                                </p>)
                        }
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Description
                    </label>
                    <div className="relative">
                        <textarea
                            name="description"
                            id="description"
                            rows={5}
                            placeholder="description"
                            autoComplete="description"
                            ref={role.descriptionRef}
                            required
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {
                            errors.role.description && (
                                <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                    {errors.role.description}
                                </p>)
                        }
                    </div>
                </div>
                <div>
                    <button
                        className="flex items-center mt-6 w-60 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                        type="submit"
                        onClick={(e: any) => {
                            handleSubmit(e);
                            // navigate('/contact');
                        }}
                    >
                        Create Role
                    </button>
                </div>

            </form>
        </div>
    );
}

export default CreateRole;