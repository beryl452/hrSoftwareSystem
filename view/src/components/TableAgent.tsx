
import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate} from "react-router-dom";

const TableAgent = ({ }) => {
  const navigate = useNavigate();

  const [agents, setAgents] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [seeAgent, setSeeAgent] = React.useState(false);
  const location = useLocation();

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
  async function viewAgents() {
    const response = await http.get("/api/agent/allAgents");
    console.log("Agents", response.data);
    setAgents(response.data);
    console.log(agents);
  }
  useEffect(() => {
    viewAgents();
    setSeeAgent(!seeAgent);
  }, []);
  return (
    <div className="dark:border-strokedark dark:bg-boxdark relative shadow-md sm:rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        {
          (location.state?.success) && (<div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
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
                {location.state?.success}
              </p>
            </div>
          </div>)
        }
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
                   const url = "api/agent/allAgents?search=".concat(search);
                     console.log("url =", url);
                    const response = await http.get(url);
                    console.log("search =", response.data);
                    console.log("search =", response.data);
                    setAgents(response.data);
                    console.log("seacdcdrch =", agents);
                  }
                }
              />
            </div>
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={() => {
              navigate('/CreateAgent',{ replace: true })
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
            Create agent
          </button>

        </div>
      </div>
      {(seeAgent) && (<>
        <div className="overflow-x-auto">
          <table className="font-medium w-full text-sm text-left text-black dark:text-white">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-black dark:text-white">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Code
                </th>
                <th scope="col" className="px-4 py-3">
                  Firstname
                </th>
                <th scope="col" className="px-4 py-3">
                   lastname
                </th>
                <th scope="col" className="px-4 py-3">
                    Email
                </th>
                <th scope="col" className="px-4 py-3">
                birthdate
                </th>
                <th scope="col" className="px-4 py-3">
                phone
                </th>
                <th scope="col" className="px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {agents ? (
                agents.data?.map((agent, index) => (
                  <tr
                    key={index}
                    className="dark:border-gray-700 border-b text-sm font-medium"
                    onClick={()=>{
                      navigate(`/agents/${agent.id}/contracts`, { state: { agent: agent } }, {replace: true})
                    }}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-4 py-3 text-black dark:text-white"
                    >
                      {agent.code}
                    </th>
                    <td className="px-4 py-3">{agent.person.firstname}</td>
                    <td className="px-4 py-3">{agent.person.lastname}</td>
                    <td className="px-4 py-3">{agent.person.email}</td>
                    <td className="px-4 py-3">{agent.person.birthdate}</td>
                    <td className="px-4 py-3">{agent.person.phone}</td>

                    <td className="px-4 py-3">
                    <button className="hover:text-primary"
                        // onClick={
                        //   async () => {
                        //     const response = await http.delete('api/agent/delete/'.concat(encodeURIComponent(agent.id)));
                        //     console.log(response.data);
                        //     viewAgents();
                        //   }
                        // }
                        onClick={() => {
                          // navigate('/CreateAgent',{ replace: true })
                          navigate('/agentEdit', { state: { agent: agent } },{ replace: true })
                        }}
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
              {' '.concat((agents.meta ? agents.meta.from : 0), ' ')} - {' '.concat((agents.meta ? agents.meta.to : 0), ' ')}
            </span>
            of
            <span className="text-gray-900 font-medium dark:text-white">
              {' '.concat((agents.meta ? agents.meta.total : 0), ' ')}
            </span>
          </span>

          <ul className="inline-flex items-stretch  -space-x-px dark:border-strokedark dark:bg-boxdark">
            {agents ? (
              agents.meta ? (
                agents.meta.links.length > 3 && (
                  <>
                    {agents.meta.links.map((link, key) =>
                      link.label === '&laquo; Previous' ? (
                        <li key={key}>
                          <a
                            onClick={async () => {
                              if (agents.links.prev != null) {
                                const response = await http.get(
                                  agents.links.prev
                                );
                                setAgents(response.data);
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
                              if (agents.links.next != null) {
                                const response = await http.get(
                                  agents.links.next
                                );
                                setAgents(response.data);
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
                              setAgents(response.data);
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

export default TableAgent;
