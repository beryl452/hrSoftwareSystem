// import BrandOne from '../images/brand/brand-01.svg';
// import BrandTwo from '../images/brand/brand-02.svg';
// import BrandThree from '../images/brand/brand-03.svg';
// import BrandFour from '../images/brand/brand-04.svg';
// import BrandFive from '../images/brand/brand-05.svg';
import React, { useEffect } from "react";
import axios from "axios";

const TableTwo = ({ }) => {
  const [projects, setProjects] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [seeProject, setSeeProject] = React.useState(false);
  // const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth")||"{}");
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
    console.log("Projects",response.data.projects);
    setProjects(response.data.projects);
    console.log(projects);
  }
  useEffect(() => {
    viewProjects();
    setSeeProject(!seeProject);
  }, []);
  return (
    <div className="dark:border-strokedark dark:bg-boxdark relative shadow-md sm:rounded-lg overflow-hidden">
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
                    const url = "/api/projectsSearch/" + search;
                    console.log("url =", url);
                    const response = await http.get(url);
                    console.log("search =", response.data);
                    console.log("search =", response.data);
                    setProjects(response.data);
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
              // navigate('/Createprojects', { state: { project: projects } })
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
      {(seeProject)&&(<>
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
                      {/* <div className="flex justify-start">
                        {(!(projects.some(dictionary => dictionary["id"] === project["id"]))) && (
                        <button className="hover:text-primary"
                        onClick={
                          async () => {
                            // const response = await http.post('/api/projects/addAbility',{
                            //   role_id:props.role[0].id,
                            //   ressource_id:project.id
                            // });
                            // console.log('AddAbility____urce', response.data);
                            // projectsF();
                            // viewAbilities();
                            // setAlertValidate(true);
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
                        {((projects.some(dictionary => dictionary["id"] === project["id"]))) && (
                        <button className="hover:text-primary"
                        onClick={
                          async () => {
                            // const response = await http.delete('/api/projects/'.concat(props.role[0].id, '/', project.id));
                            // console.log('responseressource', response.data);
                            // projectsF();
                            // viewAbilities();
                            // setAlert(true);
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
                      </div> */}
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
