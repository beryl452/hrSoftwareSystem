// import BrandOne from '../images/brand/brand-01.svg';
// import BrandTwo from '../images/brand/brand-02.svg';
// import BrandThree from '../images/brand/brand-03.svg';
// import BrandFour from '../images/brand/brand-04.svg';
// import BrandFive from '../images/brand/brand-05.svg';
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TableTwo = ({ }) => {
  const navigate = useNavigate();

  const [projects, setProjects] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [seeProject, setSeeProject] = React.useState(false);
  const [createAlert, setCreateAlert] = React.useState(false) 
  const [deleteAlert, setDeleteAlert] = React.useState(false);

  // check if success is detected in location.state and affecte it in success state
  // const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    },
    withCredentials: true,
  });
  async function viewProjects() {
    const response = await http.get("/api/project/allProjects");
    console.log("Projects", response.data.projects);
    setProjects(response.data.projects);
    setSeeProject(true);
    console.log(projects);
  }
  useEffect(() => {
    viewProjects();
    setDeleteAlert(false);
  }, []);
  return (
    <div className="dark:border-strokedark dark:bg-boxdark relative shadow-md sm:rounded-lg overflow-hidden">
      {
        (deleteAlert) && (<div className="flex mb-5 w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
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
              Project Delete Successfully
            </h5>
            <ul>
              <li className="leading-relaxed text-[#CD5D5D]">
                This Project is definitely deleted.
              </li>
            </ul>
          </div>
        </div>)
      }
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">Search </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-black dark:text-white"
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
                className="dark:border-strokedark dark:bg-boxdark border text-gray-900 text-sm rounded-lg focus:ring-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                required
                value={search}
                onChange={
                  async (e) => {
                    setSearch(e.target.value);
                    const url = "api/project/allProjects/?search=".concat(search);
                    console.log("url =", url);
                    const response = await http.get(url);
                    console.log("search =", response.data);
                    console.log("search =", response.data);
                    setProjects(response.data.projects);
                    console.log("seacdcdrch =", projects);
                  }
                }
              />
            </div>
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={() => {
              navigate('/Createprojects', { replace: true })
            }
            }
            className="flex justify-center  items-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
            type="submit"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
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
            Create projects
          </button>

        </div>
      </div>
      {(seeProject) && (<>
        <div className="overflow-x-auto">
          <table className="font-medium w-full text-sm text-left text-black dark:text-white">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-black dark:text-white">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Title
                </th>
                <th scope="col" className="px-4 py-3">
                  Description
                </th>
                <th scope="col" className="px-4 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Due Date
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3">
                  Folder
                </th>
                <th scope="col" className="px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects ? (
                projects.data?.map((project, index) => (
                  <tr
                    key={index}
                    className="dark:border-gray-700 border-b text-sm font-medium"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-4 py-3 text-black dark:text-white"
                    >
                      {project.name}
                    </th>
                    <td className="px-4 py-3">{project.description}</td>
                    <td className="px-4 py-3">{project.start_date}</td>
                    <td className="px-4 py-3">{project.due_date}</td>
                    <td className="px-4 py-3">{project.status}</td>
                    <td className="px-4 py-3">{project.folder}</td>

                    <td className="px-4 py-3">
                      <button className="hover:text-primary"
                        onClick={
                          async () => {
                            await http.delete('api/project/delete/'.concat(encodeURIComponent(project.id)))
                            .then((response)=>{
                              console.log('responseprojectidi', response.data);
                              setTimeout(() => {
                                setDeleteAlert(true);
                              }, 1000);
                              viewProjects();
                            })
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
                      </button>
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
              {' '.concat((projects.meta ? projects.meta.from : 0), ' ')} - {' '.concat((projects.meta ? projects.meta.to : 0), ' ')}
            </span>
            of
            <span className="text-gray-900 font-medium dark:text-white">
              {' '.concat((projects.meta ? projects.meta.total : 0), ' ')}
            </span>
          </span>

          <ul className="inline-flex items-stretch  -space-x-px dark:border-strokedark dark:bg-boxdark">
            {projects ? (
              projects.meta ? (
                projects.meta.links.length > 3 && (
                  <>
                    {projects.meta.links.map((link, key) =>
                      link.label === '&laquo; Previous' ? (
                        <li key={key}>
                          <a
                            onClick={async () => {
                              if (projects.links.prev != null) {
                                const response = await http.get(
                                  projects.links.prev
                                );
                                setProjects(response.data.projects);
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
                              if (projects.links.next != null) {
                                const response = await http.get(
                                  projects.links.next
                                );
                                setProjects(response.data.projects);
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
                              setProjects(response.data.projects);
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
            <> </>
          </ul>
        </nav>
      </>)}
    </div>
  );
};

export default TableTwo;
