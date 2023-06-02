import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function CreateAbsence() {
    const [absence, setAbsence] = React.useState({
        start_dateRef: useRef<HTMLInputElement>(null),
        end_dateRef: useRef<HTMLInputElement>(null),
        motifRef: useRef<HTMLTextAreaElement>(null),
    });
    const location = useLocation();

    const [errors, setErrors] = React.useState({
        absence:
        {
            start_date: '',
            end_date: '',
            motif: '',
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
            start_date: absence.start_dateRef.current?.value,
            end_date: absence.end_dateRef.current?.value,
            motif: absence.motifRef.current?.value,
        })
        http
            .post('/api/absence/create', {
                start_date: absence.start_dateRef.current?.value,
                end_date: absence.end_dateRef.current?.value,
                motif: absence.motifRef.current?.value,
            })
            .then((response) => {
                console.log('response', response);
            })
            .catch((error) => {
                console.log('error', error.response.data.errors);
                setErrors({ ...errors, absence: error.response.data.errors });
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
                            ref={absence.start_dateRef}
                            required
                            className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {
                            errors.absence.start_date && (
                                <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                    {errors.absence.start_date}
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
                            ref={absence.end_dateRef}
                            required
                            className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {
                            errors.absence.end_date && (
                                <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                    {errors.absence.end_date}
                                </p>)
                        }
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <label
                        htmlFor="motif"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Motif
                    </label>
                    <div className="relative">
                        <textarea
                            name="motif"
                            id="motif"
                            rows={5}
                            placeholder="motif"
                            autoComplete="motif"
                            ref={absence.motifRef}
                            required
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                        {
                            errors.absence.motif && (
                                <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                                    {errors.absence.motif}
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
                        Create Absence
                    </button>
                </div>

            </form>
        </div>
    );
}

export default CreateAbsence;
