import React, { useEffect, useContext } from 'react';
import axios from 'axios';
// import { AuthContext } from './../context/AuthContext';
import TableAbilities from './TableAbilities';

import { useNavigate } from "react-router-dom";


const TableRole = ({ }) => {
  const navigate = useNavigate();

  // const [ouais, setOuais] = React.useState(false);
  // const {auth} = useContext(AuthContext);
  const [abilities, setAbilities] = React.useState([]);
  const [roles, setRoles] = React.useState({});
  //const [search, setSearch] = React.useState('');
  // const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.token}`,
    },
    withCredentials: true,
  });
  async function viewRoles() {
    const response = await http.get('/api/role/');
    // const users =  await response.data
    console.log('response', response.data);
    setRoles(response.data.roles);
    console.log('roles', roles);
  }
  useEffect(() => {
    viewRoles();
  }, []);
  return (
    <div className="relative overflow-hidden shadow-md dark:border-strokedark dark:bg-boxdark sm:rounded-lg">
      <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4">
      
      </div>
      <div className="overflow-x-auto">

        <table className="w-full text-left text-sm font-medium text-black dark:text-white">
          <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-black dark:text-white">
            <tr>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.data ? (
              roles.data.map((role, index) => (
                <tr
                  key={index}
                  onClick={async () => {
                    const response = await http.get('/api/role/' + role.id);
                    console.log('responseressource', response.data);
                    setAbilities(response.data.roles.data);
                    navigate(
                        role.id+"/abilities", 
                        { state: { role: response.data.roles.data } },
                        { replace: true }
                    );
                  }}
                  className="dark:border-gray-700 border-b text-sm font-medium cursor-pointer"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-4 py-3 text-black dark:text-white"
                  >
                    {role.name}

                  </th>
                  <td className="px-4 py-3">{role.description}</td>


                </tr>
              ))
            ) : (
              <></>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRole;