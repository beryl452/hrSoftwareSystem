import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateAgent() {
  const [person, setPerson] = React.useState({
    firstnameRef: useRef<HTMLInputElement>(null),
    lastnameRef: useRef<HTMLInputElement>(null),
    emailRef: useRef<HTMLInputElement>(null),
    birthdateRef: useRef<HTMLInputElement>(null),
    phoneRef: useRef<HTMLInputElement>(null),
  });

  const [agent, setAgent] = React.useState({
    person_idRef: useRef<HTMLInputElement>(null),
    codeRef: useRef<HTMLInputElement>(null),
  });

  const [errors, setErrors] = React.useState({
    person: {
      firstname: '',
      lastname: '',
      email: '',
      birthdate: '',
      phone: '',
    },
    agent: {
      code: '',
    },
  });

  const navigate = useNavigate();

  const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      'content-type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('auth') || '{}').token
      }`,
    },
    withCredentials: true,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    http
      .post('/api/person/create', {
        firstname: person.firstnameRef.current?.value,
        lastname: person.lastnameRef.current?.value,
        email: person.emailRef.current?.value,
        birthdate: person.birthdateRef.current?.value,
        phone: person.phoneRef.current?.value,
      })
      .then((response) => {
        http
          .post('/api/agent/create', {
            person_id: response.data.id,
            code: agent.codeRef.current?.value,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            setErrors({ ...errors, agent: error.response.data.errors });
          });
      })
      .catch((error) => {
        setErrors({ ...errors, person: error.response.data.errors });
      });
  };

  useEffect(() => {}, []);
  return (
    <div className="border rounded-lg border-stroke bg-white py-4 px-6.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mb-4 grid gap-4 sm:grid-cols-2 "
      >
        <div>
          <label
            htmlFor="firstname"
            className="mb-3 block text-black dark:text-white"
          >
            Firstname
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="firstname"
            autoComplete="firstname"
            ref={person.firstnameRef}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {
            errors.person.firstname && (
              <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                {errors.person.firstname}
              </p>)
          }
        </div>
        <div>
          <label
            htmlFor="lastname"
            className="mb-3 block text-black dark:text-white"
          >
            Lastname
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Lastname"
            autoComplete="lastname"
            ref={person.lastnameRef}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {
            errors.person.lastname && (
              <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                {errors.person.lastname}
              </p>)
          }
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-3 block text-black dark:text-white"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="email"
            ref={person.emailRef}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {
            errors.person.email && (
              <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                {errors.person.email}
              </p>)
          }
        </div>
        <div>
          <label
            htmlFor="birth"
            className="mb-3 block text-black dark:text-white"
          >
            Birthday
          </label>
          <div className="relative">
            <input
              type="date"
              name="birth"
              id="birth"
              placeholder="Birth"
              autoComplete="birth"
              ref={person.birthdateRef}
              required
              className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {
              errors.person.birthdate && (
                <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                  {errors.person.birthdate}
                </p>)
            }
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-3 block text-black dark:text-white"
          >
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone"
            autoComplete="phone"
            ref={person.phoneRef}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {
            errors.person.phone && (
              <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                {errors.person.phone}
              </p>)
          }
        </div>
        <div>
          <label
            htmlFor="matricule"
            className="mb-3 block text-black dark:text-white"
          >
            Matricule
          </label>
          <input
            type="text"
            name="matricule"
            id="matricule"
            placeholder="Matricule"
            autoComplete="Matricule"
            ref={agent.codeRef}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.agent.code && (
            <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
              {errors.agent.code}
            </p>
          )}
        </div>
        <button
          className="flex items-center mt-6 w-60 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
          type="submit"
          onClick={() => {
            handleSubmit;
            navigate('/agents');
          }}
        >
          Create Agent
        </button>
      </form>
    </div>
  );
}

export default CreateAgent;
