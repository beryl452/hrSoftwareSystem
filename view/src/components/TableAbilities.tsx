import React, { useEffect } from "react";
import axios from 'axios';

type Props = {
  role: any;
};
const TableAbilities = (props: Props) => {
  const [alert, setAlert] = React.useState(false);
  const [alertValidate, setAlertValidate] = React.useState(false);
  const [abilities, setAbilities] = React.useState([]);
  const [allAbilities, setAllAbilities] = React.useState({});
  const [seeAlbities, setSeeAlbities] = React.useState(false);
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
  async function allAbilitiesF() {
    const response = await http.get('/api/abilities/');
    console.log('responstyuiope', response.data.ressources);
    setAllAbilities(response.data.ressources);
  }
  async function viewAbilities() {
    const response = await http.get('/api/role/' + props.role[0].id);
    console.log('response', response.data);
    setAbilities(response.data.roles.data[0].abilities);
    console.log('abilities', abilities);
    setTimeout(() => { setAlert(false) }, 4000);
  }
  useEffect(() => {
    console.log('roles', props.role);
    viewAbilities();
    allAbilitiesF();
  }, [props.role]);



  return (
    <div className="relative overflow-hidden shadow-md dark:border-strokedark p-5 dark:bg-boxdark sm:rounded-lg">
      {alert && (<div className="flex mb-5 w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
        <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
              fill="#ffffff"
              stroke="#ffffff"
            ></path>
          </svg>
        </div>
        <div className="w-full">
          <h5 className="mb-3 font-semibold text-[#B45454]">
            Ability Delete Successfully
          </h5>
          <ul>
            <li className="leading-relaxed text-[#CD5D5D]">
              This Ability is definitely deleted from the {props.role[0].name} role.
            </li>
          </ul>
        </div>
      </div>)}
    {
      alertValidate && (<div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
      <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
        <svg
          width="13"
          height="13"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
            fill="white"
            stroke="white"
          ></path>
        </svg>
      </div>
      <div className="w-full">
        <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
          Ability Add Successfully
        </h5>
        <p className="text-base leading-relaxed text-body">
          This Ability is definitely added to the {props.role[0].name} role.
        </p>
      </div>
    </div>)
    }
      <div className="flex flex-col items-center justify-between space-y-3 md:flex-row md:space-y-3 md:space-x-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search{' '}
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-black dark:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="text-gray-900 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border p-2 pl-10 text-sm dark:border-strokedark dark:bg-boxdark dark:text-white"
                placeholder="Search"
                required
              // value={search}
              // onChange={async (e) => {
              //   setSearch(e.target.value);
              //   const url = '/api/allAbilitiesSearch/' + search;
              //   console.log('url =', url);
              //   const response = await http.get(url);
              //   console.log('search =', response.data);
              //   console.log('search =', response.data);
              //   setAllAbilities(response.data.ressources)
              //   console.log('seacdcdrch =', allAbilities);
              // }}
              />
            </div>
          </form>
        </div>
        <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3">
          <button
            className="flex items-center  justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
            onClick={() => {
              setSeeAlbities(!seeAlbities);
            }}
          >
            {(!seeAlbities) && (<><svg
              className="mr-2 h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
              Modify Abilities
            </>)}
            {(seeAlbities) && (<>
              <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-3.5 w-3.5"
                 viewBox="0 0 52 52"
                 enableBackground="new 0 0 52 52"
                 xmlSpace="preserve"
              >
                <path d="M48.6,23H15.4c-0.9,0-1.3-1.1-0.7-1.7l9.6-9.6c0.6-0.6,0.6-1.5,0-2.1l-2.2-2.2c-0.6-0.6-1.5-0.6-2.1,0 L2.5,25c-0.6,0.6-0.6,1.5,0,2.1L20,44.6c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1l-9.6-9.6C14,30.1,14.4,29,15.3,29 h33.2c0.8,0,1.5-0.6,1.5-1.4v-3C50,23.8,49.4,23,48.6,23z" />
              </svg>
              Back
            </>)}
          </button>
        </div>
      </div>
      {(!seeAlbities) && (<div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-medium text-black dark:text-white">
          <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-black dark:text-white">
            <tr>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Method
              </th>
              <th scope="col" className="px-4 py-3">
                Uri
              </th>
            </tr>
          </thead>
          <tbody>
            {props.role ? (
              abilities.map((ability: any, index: number) => (
                <tr
                  key={index}
                  className="dark:border-gray-700 border-b text-sm font-medium cursor-pointer"
                >
                  <td
                    scope="row"
                    className="whitespace-nowrap px-4 py-3 text-black dark:text-white"
                  >
                    {ability.name}
                  </td>
                  <td className="px-4 py-3">{ability.method}</td>
                  <td className="px-4 py-3">{ability.uri}</td>
                </tr>

              ))
            ) :
              ("loading")}

          </tbody>
        </table>
      </div>)}
      {(seeAlbities) && (<div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-medium text-black dark:text-white">
            <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-black dark:text-white">
              <tr>
                <th scope="col" className="px-4 py-3">
                  name
                </th>
                <th scope="col" className="px-4 py-3">
                  method
                </th>
                <th scope="col" className="px-4 py-3">
                  uri
                </th>
                <th scope="col" className="px-4 py-3">
                </th>
              </tr>
            </thead>
            <tbody>
              {allAbilities ? (
                allAbilities.data?.map((ability, index) => (
                  <tr
                    key={index}
                    className="dark:border-gray-700 border-b text-sm font-medium"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-4 py-3 text-black dark:text-white"
                    >
                      {ability.name}
                    </th>
                    <td className="px-4 py-3">{ability.method}</td>
                    <td className="px-4 py-3">{ability.uri}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-start">
                        {(!(abilities.some(dictionary => dictionary["id"] === ability["id"]))) && (
                        <button className="hover:text-primary"
                        onClick={
                          async () => {
                            const response = await http.post('/api/abilities/addAbility',{
                              role_id:props.role[0].id,
                              ressource_id:ability.id
                            });
                            console.log('AddAbility____urce', response.data);
                            allAbilitiesF();
                            viewAbilities();
                            setAlertValidate(true);
                          }
                        }
                        >
                          <svg
                            width={28}
                            height={28}
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            enableBackground="new 0 0 48 48"
                          >
                            <circle fill="#4CAF50" cx={24} cy={24} r={21} />
                            <g fill="#ffffff">
                              <rect x={21} y={14} width={6} height={20} />
                              <rect x={14} y={21} width={20} height={6} />
                            </g>
                          </svg>
                        </button>)}
                        {((abilities.some(dictionary => dictionary["id"] === ability["id"]))) && (
                        <button className="hover:text-primary"
                        onClick={
                          async () => {
                            const response = await http.delete('/api/abilities/'.concat(props.role[0].id, '/', ability.id));
                            console.log('responseressource', response.data);
                            allAbilitiesF();
                            viewAbilities();
                            setAlert(true);
                          }
                        }
                        >
                          <svg
                            width={28}
                            height={28}
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            enableBackground="new 0 0 48 48"
                          >
                            <circle fill="#B81620" cx={24} cy={24} r={21} />
                            <g fill="#ffffff">
                              <rect x={14} y={21} width={20} height={6} />
                            </g>
                          </svg>
                        </button>)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
          <nav
            className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Showing
              <span className="text-gray-900 font-medium dark:text-white">
                {' '.concat((allAbilities.meta ? allAbilities.meta.from : 0), ' ')} - {' '.concat((allAbilities.meta ? allAbilities.meta.to : 0), ' ')}
              </span>
              of
              <span className="text-gray-900 font-medium dark:text-white">
                {' '.concat((allAbilities.meta ? allAbilities.meta.total : 0), ' ')}
              </span>
            </span>

            <ul className="inline-flex items-stretch  -space-x-px dark:border-strokedark dark:bg-boxdark">
              {allAbilities ? (
                allAbilities.meta ? (
                  allAbilities.meta.links.length > 3 && (
                    <>
                      {allAbilities.meta.links.map((link, key) =>
                        link.label === '&laquo; Previous' ? (
                          <li key={key}>
                            <a
                              onClick={async () => {
                                if (allAbilities.links.prev != null) {
                                  const response = await http.get(
                                    allAbilities.links.prev
                                  );
                                  setAllAbilities(response.data.ressources);
                                } else {
                                  console.log('no more pages');
                                }
                              }}
                              key={key}
                              className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 ml-0 flex h-full cursor-pointer items-center justify-center rounded-l-lg border py-1.5 px-3 dark:border-strokedark dark:bg-boxdark dark:hover:text-white"
                            >
                              <span className="sr-only dark:border-strokedark  dark:bg-boxdark">
                                Previous
                              </span>
                              <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </a>
                          </li>
                        ) : link.label === 'Next &raquo;' ? (
                          <li key={key}>
                            <a
                              onClick={async () => {
                                if (allAbilities.links.next != null) {
                                  const response = await http.get(
                                    allAbilities.links.next
                                  );
                                  setAllAbilities(response.data.ressources);
                                } else {
                                  console.log('no more pages');
                                }
                              }}
                              key={key}
                              className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 flex  h-full cursor-pointer items-center justify-center rounded-r-lg border py-1.5 px-3 leading-tight dark:border-strokedark dark:bg-boxdark dark:hover:text-white"
                            >
                              <span className="sr-only">Next</span>
                              <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </a>
                          </li>
                        ) : (
                          <li key={key}>
                            <a
                              onClick={async () => {
                                const response = await http.get(link.url);
                                setAllAbilities(response.data.ressources);
                              }}
                              key={key}
                              className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 flex cursor-pointer items-center justify-center border py-2 px-3 text-sm leading-tight dark:border-strokedark dark:bg-boxdark dark:hover:text-white"
                            >
                              {link.label}
                            </a>
                          </li>
                        )
                      )}
                    </>
                  )
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
              <></>
            </ul>
          </nav>
        </div>
      </div>)}
    </div>
  );
};

export default TableAbilities;