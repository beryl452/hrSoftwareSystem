import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Projects({ className = "", ...props }) {
  const [projects, setProjects] = React.useState({});
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
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
  async function viewProjects() {
    const response = await http.get("/api/projects");
    console.log(response.data);
    setProjects(response.data);
    console.log(projects);
  }
  useEffect(() => {
    viewProjects();
  }, []);
  return (
    <div className={"lg:px-6 p-0 w-90vw " + className}>
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                  required=""
                  value={search}
                  onChange={async (e) => {
                    setSearch(e.target.value);
                    const url = "/api/projectsSearch/" + search;
                    console.log("url =", url);
                    const response = await http.get(url);
                    console.log("search =", response.data);
                    setProjects(response.data);
                    console.log("seacdcdrch =", projects);
                  }}
                />
              </div>
            </form>
          </div>

          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button
              type="button"
              className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Export
            </button>
            <Link
              to={"/project/create"}
              className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
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
              Add project
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  file
                </th>
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.data
                ? projects.data.map((project, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-gray-700 cursor-pointer"
                      onClick={() => {
                        navigate(
                          "/project/" + project.id + "/tasks",
                          { state: { project: project } },
                          { replace: true }
                        );
                      }}
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {project.title} ... {project.id}
                      </th>
                      <td className="px-4 py-3">{project.description}</td>
                      <td className="px-4 py-3">{project.start_date}</td>
                      <td className="px-4 py-3">{project.due_date}</td>
                      <td className="px-4 py-3">{project.status}</td>
                      <td
                        className="px-4 py-3 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          // http
                          //   .get("/api/projectsDownload/" + project.id)
                          //   .then((response) => {
                          //     console.log(response);
                          //   })
                          //   .catch((error) => {
                          //     console.log(error);
                          //   });
                          // Download file from "/api/projectsDownload/" + project.id

                          http
                            .get("/api/projectsDownload/" + project.id)
                            .then((response) => {
                              // console.log(response);
                              const url = window.URL.createObjectURL(
                                new Blob([response.data])
                              );
                              const link = document.createElement("a");
                              link.href = url;
                              link.setAttribute("download", project.file); //or any other extension
                              document.body.appendChild(link);
                              link.click();
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }}
                      >
                        {project.file}
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
                        <button
                          id="benq-ex2710q-dropdown-button"
                          data-dropdown-toggle="benq-ex2710q-dropdown"
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            [
                              ...document.getElementsByClassName("projects"),
                            ].forEach((element) => {
                              if (element.classList.contains("M" + project.id))
                                element.classList.toggle("hidden");
                              else element.classList.add("hidden");
                            });
                          }}
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        <div
                          id="benq-ex2710q-dropdown"
                          className={
                            "projects hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-12 mt-2 M" +
                            project.id
                          }
                        >
                          <ul
                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="benq-ex2710q-dropdown-button"
                          >
                            <li>
                              <a
                                href="#"
                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Show
                              </a>
                            </li>
                            <li>
                              <a
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/projects/edit`, {
                                    state: { project: project },
                                    replace: false,
                                  });
                                }}
                                className="block cursor-pointer py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Edit
                              </a>
                            </li>
                          </ul>
                          <div className="py-1">
                            <a
                              onClick={async (event) => {
                                event.preventDefault();
                                const response = await http.delete(
                                  "/api/projects/" + project.id
                                );
                                console.log(response);
                                if (response.status === 200) {
                                  alert("Project deleted successfully");
                                  window.location.reload();
                                }
                              }}
                              className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                              Delete
                            </a>
                          </div>
                        </div>
                        {/* <div className="flex items-center justify-end">
                          <button
                            onClick={()=>{
                                navigate(`/projects/edit`, {state: {project: project}, replace: false})
                              }
                            }
                            className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                            >
                              Edit 
                          </button>
                          </div> */}
                      </td>
                    </tr>
                  ))
                : console.log("no data")}
            </tbody>
          </table>
        </div>
        <nav
          className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span className="font-semibold text-gray-900 dark:text-white">
              {projects.data
                ? " " + projects.from + " "
                : console.log("loading")}{" "}
              -{" "}
              {projects.data
                ? "  " + projects.to + " "
                : console.log("loading")}
            </span>
            of
            <span className="font-semibold text-gray-900 dark:text-white">
              {"  " + projects.total + "  "}
            </span>
          </span>
          <ul className="inline-flex items-stretch -space-x-px">
            {/*  */}
            {projects.links
              ? projects.links
                ? projects.links.length > 3 && (
                    <>
                      {projects.links.map((link, key) =>
                        link.label === "&laquo; Previous" ? (
                          <li key={key}>
                            <a
                              onClick={async () => {
                                if (projects.prev_page_url != null) {
                                  const response = await http.get(
                                    projects.prev_page_url
                                  );
                                  setProjects(response.data);
                                } else {
                                  console.log("no more pages");
                                }
                              }}
                              className="flex items-center cursor-pointer justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              <span className="sr-only">Previous</span>
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
                                if (projects.next_page_url != null) {
                                  const response = await http.get(
                                    projects.next_page_url
                                  );
                                  setProjects(response.data);
                                } else {
                                  console.log("no more pages");
                                }
                              }}
                              className="flex items-center cursor-pointer justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
                                setProjects(response.data);
                              }}
                              className="flex cursor-pointer items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              {link.label}
                            </a>
                          </li>
                        )
                      )}
                    </>
                  )
                : console.log("Loading")
              : console.log("rr")}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Projects;