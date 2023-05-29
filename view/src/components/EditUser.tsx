import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function EditUser() {
    const [roles, setRoles] = React.useState([]);
    const [people, setPeople] = React.useState([]);
    const location = useLocation();
    const theUser = location.state as any;

    const [user, setUser] = React.useState({
      username: theUser.user.username,
      password: theUser.user.password,
      person_id: theUser.user.person_id,
      role_id: theUser.user.role_id,
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
  const onChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    http.put(`api/users/update/${theUser.user.id}`,user)
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
            value={user.username}
            onChange={onChange}
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
            value={user.password}
            onChange={onChange}
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
            onChange={onChange}
            defaultValue={user.person_id}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="">Select Person</option>
            {people.map((person: any) => (
              (person.id == theUser.user.person.id)?(
                <option key={person.id} value={person.id} selected
                >
                  {person.firstname} {person.lastname}
                </option>
              ):(
              <option key={person.id} value={person.id}
              >
                {person.firstname} {person.lastname}
              </option>
            )
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
            onChange={onChange}
            defaultValue={user.role_id}
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="">Select Role</option>
            {roles.map((role: any) => (
               (role.id == theUser.user.role.id)?(
                <option key={role.id} value={role.id} selected
                >
                  {role.name}
                </option>
              ):(
              <option key={role.id} value={role.id}
              >
                {role.name}
              </option>
            )))}
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
export default EditUser;
