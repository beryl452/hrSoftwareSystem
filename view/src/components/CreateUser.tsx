import React, { useEffect } from 'react';
import axios from 'axios';
import CreateAgent from './CreateAgent';

function CreateUser() {
  const [roles, setRoles] = React.useState([]);
  const [people, setPeople] = React.useState([]);

  const [user, setUser] = React.useState({
    usernameRef: React.useRef<HTMLInputElement>(null),
    passwordRef: React.useRef<HTMLInputElement>(null),
    person_idRef: React.useRef<HTMLInputElement>(null),
    role_idRef: React.useRef<HTMLInputElement>(null),
  });

  const http = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem('auth') || '{}'
      ).token}`,
    },
    withCredentials: true,
  });

  const [errors, setErrors] = React.useState({
      username: '',
      password: '',
      person_id: '',
      role_id: '',
  });

  async function getRoles() {
    await http
      .get('/api/role')
      .then((response) => {
        console.log('roles', response);
        setRoles(response.data.roles.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function getPeople() {
    await http
      .get('/api/people')
      .then((response) => {
        console.log('people', response);
        setPeople(response.data.people.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    http.post('api/users/create',{
      username: user.usernameRef.current?.value,
      password: user.passwordRef.current?.value,
      person_id: user.person_idRef.current?.value,
      role_id: user.role_idRef.current?.value,
    })
    .then((response) => {
      console.log('response', response);
    })
    .catch((error) => {
      setErrors(
        error.response.data.errors
      )
      console.log(error);
    });

    console.log('Submit',{
      
    });
  };
  useEffect(() => {
    getRoles();
    getPeople();
  }, []);

  return (
    <div className="rounded-lg border border-stroke bg-white py-4 px-6.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mb-4 grid gap-4 sm:grid-cols-2 "
      >
        <div>
          <label
            htmlFor="username"
            className="mb-3 block text-black dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            autoComplete="username"
            ref={user.usernameRef}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {
            errors.username && (
              <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                {errors.username}
              </p>)
          }
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-3 block text-black dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*********"
            autoComplete="password"
            ref={user.passwordRef}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {
            errors.password && (
              <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                {errors.password}
              </p>)
          }
        </div>
        <div>
          <label
            htmlFor="person"
            className="mb-3 block text-black dark:text-white"
          >
            Person
          </label>
          <select
            name="person"
            id='person'
            ref={user.person_idRef}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="">Select Person</option>
            {people.map((person: any) => (
              <option key={person.id} value={person.id}
              >
                {person.firstname} {person.lastname}
              </option>
            ))}
          </select>
          {
            errors.person_id && (
              <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                {errors.person_id}
              </p>)
          }
        </div>
        <div>
        <label
            htmlFor="role"
            className="mb-3 block text-black dark:text-white"
          >
            Role
          </label>
          <select
            name="role"
            id='role'
            ref={user.role_idRef}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="">Select Role</option>
            {roles.map((role: any) => (
              <option key={role.id} value={role.id}
              >
                {role.name}
              </option>
            ))}
          </select>
          {
            errors.role_id && (
              <p  className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                {errors.role_id}
              </p>)
          }
        </div>
        <button
          className="flex items-center mt-6 w-60 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
          type="submit"
          onClick={() => {
            // handleSubmit;
            // navigate('/agents');
          }}
        >
          Create Agent
        </button>
      </form>
    </div>
  );
}
export default CreateUser;
