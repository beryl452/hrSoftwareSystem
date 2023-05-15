import { NavLink } from 'react-router-dom';
import React, { useEffect , useContext} from 'react';
import axios from 'axios';
// import { AuthContext } from './../context/AuthContext';

const TableOne = ({}) => {  
  // const {auth} = useContext(AuthContext);
  const [users, setUsers] = React.useState({});
  const [search, setSearch] = React.useState('');
  // const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem('auth')|| '{}');
  const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.token}`,
    },
    withCredentials: true,
  });
  async function viewUsers() {
    const response = await http.get('/api/users');
    // const users =  await response.data
    console.log('response', response.data);
    setUsers(response.data);
    console.log('users', users);
  }
  useEffect(() => {
    viewUsers();
  }, []);
  return (
    <div className="relative overflow-hidden shadow-md dark:border-strokedark dark:bg-boxdark sm:rounded-lg">
      <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4">
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
                value={search}
                onChange={async (e) => {
                  setSearch(e.target.value);
                  const url = '/api/usersSearch/' + search;
                  console.log('url =', url);
                  const response = await http.get(url);
                  console.log('search =', response.data);
                  console.log('search =', response.data);
                  setUsers(response.data);
                  console.log('seacdcdrch =', users);
                }}
              />
            </div>
          </form>
        </div>
        <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3">
          <NavLink
            to="/auth/signup"
            className="flex items-center  justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
          >
            <svg
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
            Create Users
          </NavLink>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-medium text-black dark:text-white">
          <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-black dark:text-white">
            <tr>
              <th scope="col" className="px-4 py-3">
                Username
              </th>
              <th scope="col" className="px-4 py-3">
                Firstname
              </th>
              <th scope="col" className="px-4 py-3">
                Lastname
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3">
                Function
              </th>
              <th scope="col" className="px-4 py-3">
                Rôle
              </th>
              <th scope="col" className="px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {console.log('users', users.data, users)}
            {users.data ? (
              users.data.map((user, index) => (
                <tr
                  key={index}
                  className="dark:border-gray-700 border-b text-sm font-medium"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-4 py-3 text-black dark:text-white"
                  >
                    {user.username}
                  </th>
                  <td className="px-4 py-3">{user.firstname}</td>
                  <td className="px-4 py-3">{user.lastname}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.function}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="flex items-center justify-end px-4 py-3">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      <button className="hover:text-primary">
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                            fill=""
                          />
                          <path
                            d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <nav
        className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
        aria-label="Table navigation"
      >
        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Showing
          <span className="text-gray-900 font-medium dark:text-white">
            {users.data ? ' ' + users.from + ' ' : console.log('loading')} -{' '}
            {users.data ? ' ' + users.to + ' ' : console.log('loading')}
          </span>
          of
          <span className="text-gray-900 font-medium dark:text-white">
            {' ' + users.total + ' '}
          </span>
        </span>
        <ul className="inline-flex items-stretch  -space-x-px dark:border-strokedark dark:bg-boxdark">
          {/*  */}
          {users.links ? (
            users.links ? (
              users.links.length > 3 && (
                <>
                  {users.links.map((link, key) =>
                    link.label === '&laquo; Previous' ? (
                      <li key={key}>
                        <a
                          onClick={async () => {
                            if (users.prev_page_url != null) {
                              const response = await http.get(
                                users.prev_page_url
                              );
                              setUsers(response.data);
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
                            if (users.next_page_url != null) {
                              const response = await http.get(
                                users.next_page_url
                              );
                              setUsers(response.data);
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
                            setUsers(response.data);
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
  );
};

export default TableOne;