import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function EditAgent() {
  const location = useLocation();
  const theAgent = location.state as any;

  const [person, setPerson] = React.useState({
    firstname: theAgent.agent.person.firstname,
    lastname: theAgent.agent.person.lastname,
    email: theAgent.agent.person.email,
    birthdate: theAgent.agent.person.birthdate,
    phone: theAgent.agent.person.phone,
  });

  const [agent, setAgent] = React.useState({
    person_id: theAgent.agent.person.id,
    code: theAgent.agent.code,
  });

  const onChange = (e: any) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
    setAgent({ ...agent, [e.target.name]: e.target.value });
  };

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
    baseURL: 'http://localhost:8000/api',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('auth') || '{}').token
      }`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('person', person);
    console.log('agent', agent);
 
    await http
      .put(`/person/update/${theAgent.agent.person.id}`,person)
      .then(async(response) => {
        console.log('response', response, person);
        await http
          .put(`/agent/update/${theAgent.agent.id}`, {
            person_id: response.data.id,
            code: agent.code,
          })
          .then((response) => {
            console.log(response);
            navigate('/agents');
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
    <div className="rounded-lg border border-stroke bg-white py-4 px-6.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      {JSON.stringify(theAgent)}

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
            onChange={onChange}
            value={person.firstname}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.person.firstname && (
            <p className="text-red-500 mt-1 ml-1 text-sm text-meta-1">
              {errors.person.firstname}
            </p>
          )}
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
            onChange={onChange}
            value={person.lastname}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.person.lastname && (
            <p className="text-red-500 mt-1 ml-1 text-sm text-meta-1">
              {errors.person.lastname}
            </p>
          )}
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
            onChange={onChange}
            value={person.email}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.person.email && (
            <p className="text-red-500 mt-1 ml-1 text-sm text-meta-1">
              {errors.person.email}
            </p>
          )}
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
              onChange={onChange}
              value={person.birthdate}
              required
              className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors.person.birthdate && (
              <p className="text-red-500 mt-1 ml-1 text-sm text-meta-1">
                {errors.person.birthdate}
              </p>
            )}
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
            value={person.phone}
            onChange={onChange}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.person.phone && (
            <p className="text-red-500 mt-1 ml-1 text-sm text-meta-1">
              {errors.person.phone}
            </p>
          )}
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
            onChange={onChange}
            value={agent.code}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.agent.code && (
            <p className="text-red-500 mt-1 ml-1 text-sm text-meta-1">
              {errors.agent.code}
            </p>
          )}
        </div>
        <button
          className="mt-6 flex w-60 items-center justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
          type="submit"
          onClick={() => {
            handleSubmit;
            // navigate('/agents');
          }}
        >
          Edit Agent
        </button>
      </form>
    </div>
  );
}

export default EditAgent;
