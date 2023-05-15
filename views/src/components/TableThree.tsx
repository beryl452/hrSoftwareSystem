// import BrandOne from '../images/brand/brand-01.svg';
// import BrandTwo from '../images/brand/brand-02.svg';
// import BrandThree from '../images/brand/brand-03.svg';
// import BrandFour from '../images/brand/brand-04.svg';
// import BrandFive from '../images/brand/brand-05.svg';
import React, { useEffect } from "react";
import axios from "axios";
// import { useLocation} from "react-router-dom";


const TableThree = ({ }) => {
  const [tasks, setTasks] = React.useState([]);
  const [search, setSearch] = React.useState("");
  // const navigate = useNavigate();
  // const location = useLocation();
  const [loading, setLoading] = React.useState(true);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    },
    withCredentials: true,
  });
  useEffect(() => {
    // console.log("The Location State",location.state);
    http
      .get(`/api/tasks/`)
      .then((res) => {
        console.log("Tasks",res.data);
        console.log(res.data);
        setTasks(res.data);
        setLoading(false);
      })
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
                required=""
                value={search}
                onChange={
                  async (e) => {
                    setSearch(e.target.value);
                    const url = "/api/tasksSearch/" + search;
                    console.log("url =", url);
                    const response = await http.get(url);
                    console.log("search =", response.data);
                    console.log("search =", response.data);
                    setTasks(response.data);
                    console.log("seacdcdrch =", tasks);
                  }
                }
              />
            </div>
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <button
            onClick={() => {
              // navigate('/Createtasks', { state: { task: tasks } })
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
            Create tasks
          </button>

        </div>
      </div>
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
                File
              </th>
              <th scope="col" className="px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
              {tasks.data
                ? tasks.data.map((task, index) => (
                    <tr key={index} className="border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {task.title}
                      </th>
                      <td className="px-4 py-3">{task.description}</td>
                      <td className="px-4 py-3">{task.start_date}</td>
                      <td className="px-4 py-3">{task.due_date}</td>
                      <td className="px-4 py-3">{task.status}</td>
                      <td className="px-4 py-3 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            // http
                            //   .get("/api/tasksDownload/" + task.id)
                            //   .then((response) => {
                            //     console.log(response);
                            //   })
                            //   .catch((error) => {
                            //     console.log(error);
                            //   });
                            // Download file from "/api/tasksDownload/" + task.id
  
                            http
                              .get("/api/tasksDownload/" + task.id)
                              .then((response) => {
                                // console.log(response);
                                const url = window.URL.createObjectURL(
                                  new Blob([response.data])
                                );
                                const link = document.createElement("a");
                                link.href = url;
                                link.setAttribute("download", task.file); //or any other extension
                                document.body.appendChild(link);
                                link.click();
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                      >
                        {/* {task.file} */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                          />
                        </svg>
                      </td>
                  <td className="px-4 py-3 flex items-center justify-end">
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
              : (<>
              </>)}
          </tbody>
        </table>
      </div>
      <nav
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Showing
          <span className="font-medium text-gray-900 dark:text-white">
            {tasks.data ? " " + tasks.from + " " : console.log("loading")} - {tasks.data ? " " + tasks.to + " " : console.log("loading")}
          </span>
          of
          <span className="font-medium text-gray-900 dark:text-white">
            {" " + tasks.total + " "}
          </span>
        </span>
        <ul className="dark:border-strokedark dark:bg-boxdark  inline-flex items-stretch -space-x-px">
          {/*  */}
          {tasks.links
            ? tasks.links
              ? tasks.links.length > 3 && (
                <>
                  {tasks.links.map((link, key) =>
                    link.label === "&laquo; Previous" ? (
                      <li key={key}>
                        <a
                          onClick={async () => {
                            if (tasks.prev_page_url != null) {
                              const response = await http.get(tasks.prev_page_url);
                              setTasks(response.data);
                            }
                            else {
                              console.log("no more pages");
                            }
                          }}
                          key={key}
                          className="flex items-center cursor-pointer justify-center h-full py-1.5 px-3 ml-0 text-gray-500 dark:border-strokedark dark:bg-boxdark rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <span className="dark:border-strokedark dark:bg-boxdark  sr-only">Previous</span>
                          <svg
                            className="w-5 h-5"
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
                    ) : link.label === "Next &raquo;" ? (
                      <li key={key}>
                        <a
                          onClick={async () => {
                            if (tasks.next_page_url != null) {
                              const response = await http.get(tasks.next_page_url);
                              setTasks(response.data);
                            }
                            else {
                              console.log("no more pages");
                            }
                          }}
                          key={key}
                          className="flex items-center cursor-pointer justify-center h-full py-1.5 px-3 leading-tight text-gray-500  dark:border-strokedark dark:bg-boxdark rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <span className="sr-only">Next</span>
                          <svg
                            className="w-5 h-5"
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
                            setTasks(response.data);
                          }}
                          key={key}
                          className="flex cursor-pointer items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 dark:border-strokedark dark:bg-boxdark border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  )}
                </>
              )
              : (<>
              </>)
            : (<>
            </>)}
          <>
          </>
        </ul>
      </nav>
    </div>
  );
};

export default TableThree;
