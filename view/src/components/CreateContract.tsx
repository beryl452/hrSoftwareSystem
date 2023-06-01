import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function CreateContract() {
    const [contract, setContract] = React.useState({
        baseSalaryRef: useRef<HTMLInputElement>(null),
        start_dateRef: useRef<HTMLInputElement>(null),
        end_dateRef: useRef<HTMLInputElement>(null),
        functionRef: useRef<HTMLInputElement>(null),
        department_idRef: useRef<HTMLSelectElement>(null),
    });
    const location = useLocation();
    const [departments, setDepartments] = React.useState([]);

    const [errors, setErrors] = React.useState({
        contract:
        {
            baseSalary: '',
            start_date: '',
            end_date: '',
            function: '',
            department_id: '',
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
        console.log("data",{
            baseSalary: contract.baseSalaryRef.current?.value,
            start_date: contract.start_dateRef.current?.value,
            end_date: contract.end_dateRef.current?.value,
            function: contract.functionRef.current?.value,
            department_id: contract.department_idRef.current?.value,
        })
        http
            .post('/api/contract/create', {
                baseSalary: contract.baseSalaryRef.current?.value,
                start_date: contract.start_dateRef.current?.value,
                end_date: contract.end_dateRef.current?.value,
                function: contract.functionRef.current?.value,
                department_id: contract.department_idRef.current?.value,
                agent_id: location.state.contracts.agent[0].id,
            })
            .then((response) => {
                console.log('response', response);
            })
            .catch((error) => {
                console.log('error', error.response.data.errors);
                setErrors({ ...errors, contract: error.response.data.errors });
            });
    };
    async function getDepartment() {
        await http
            .get('/api/department')
            .then((response) => {
                setDepartments(response.data.departments.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getDepartment();
        console.log('departments', departments);
    }, []);
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
                        htmlFor="baseSalary"
                        className="mb-3 block text-black dark:text-white"
                    >
                        BaseSalary
                    </label>
                    <input
                        type="number"
                        name="baseSalary"
                        id="baseSalary"
                        placeholder="baseSalary"
                        autoComplete="baseSalary"
                        ref={contract.baseSalaryRef}
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {
                        errors.contract.baseSalary && (
                            <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                {errors.contract.baseSalary}
                            </p>)
                    }
                </div>
                <div>
                    <label
                        htmlFor="start_date"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Start Date
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            name="start_date"
                            id="start_date"
                            placeholder="start_date"
                            autoComplete="start_date"
                            ref={contract.start_dateRef}
                            required
                            className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {
                            errors.contract.start_date && (
                                <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                    {errors.contract.start_date}
                                </p>)
                        }
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="end_date"
                        className="mb-3 block text-black dark:text-white"
                    >
                        End Date
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            name="end_date"
                            id="end_date"
                            placeholder="end_date"
                            autoComplete="end_date"
                            ref={contract.end_dateRef}
                            required
                            className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {
                            errors.contract.end_date && (
                                <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                    {errors.contract.end_date}
                                </p>)
                        }
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="function"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Function
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="function"
                            id="function"
                            placeholder="function"
                            autoComplete="function"
                            ref={contract.functionRef}
                            required
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {
                            errors.contract.function && (
                                <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                    {errors.contract.function}
                                </p>)
                        }
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="department"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Department
                    </label>
                    <select
                        name="department"
                        id='department'
                        ref={contract.department_idRef}
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Select Department</option>

                        {departments?.map((department: any) => (
                            <option key={department.id} value={department.id}
                            >
                                {department.libelle}
                            </option>
                        ))}
                    </select>
                    {
                        errors.contract.department_id && (
                            <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                {errors.contract.department_id}
                            </p>)
                    }
                    
                </div>
                <div>
                    </div>
                <div>
                    <button
                        className="flex items-center mt-6 w-60 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                        type="submit"
                        onClick={(e:any) => {
                            handleSubmit(e);
                            // navigate('/contact');
                        }}
                    >
                        Create Contract
                    </button>
                </div>

            </form>
        </div>
    );
}

export default CreateContract;
