import React, { useEffect, useState } from "react";
import axios from "axios";


function CreateProject() {
  const header = {
    Accept: "application/json",
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("auth") || '{}').token,
  };
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: header,
    withCredentials: true,
  });
  const [users, setUsers] = useState([]);
  const [tasksInputFields, setTasksInputFields] = useState([
    {
      title: "",
      description: "",
      start_date: "",
      due_date: "",
      file: "",
      ponderation: "",
      assigned_to: "",
    },
  ]);
  const [formu, setFormu] = useState({
    title: "",
    start_date: "",
    due_date: "",
    description: "",
    file: "",
  });
  const getPonderation = () => {
    let ponderation = 0;
    tasksInputFields.map((task) => {
      ponderation += parseInt(task.ponderation);
    });
    return ponderation;
  };
  const handleChange = (e:any) => {
    setFormu({
      ...formu,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e:any) => {
    const projectFile = e.target.files[0];
    console.log("e.target.files[0] =", e.target.files[0]);
    if (projectFile) {
      setFormu({
        ...formu,
        file: projectFile,
      });
    }
  };
  const submit = (e) => {
    e.preventDefault();


    header["Content-Type"] = "multipart/form-data";
    // Converti tasksInputFields et formu en FormData et stocker dans une variable data
    const data = new FormData();

    const project = new FormData();
    project.append("title", formu.title);
    project.append("start_date", formu.start_date);
    project.append("due_date", formu.due_date);
    project.append("description", formu.description);
    project.append("file", formu.file);

    data.append("project", project);

    const tasks = [];
    tasksInputFields.forEach((task) => {
      const taskData = new FormData();
      taskData.append("title", task.title);
      taskData.append("description", task.description);
      taskData.append("start_date", task.start_date);
      taskData.append("due_date", task.due_date);
      taskData.append("file", task.file);
      taskData.append("ponderation", task.ponderation);
      taskData.append("assigned_to", task.assigned_to);
      tasks.push(taskData);
    });

    data.append("tasks", tasks);

    console.log("data =", data);

    // http
    //   .post("/api/projects", project)
    //   .then((response) => {
    //     console.log("response =", response);
    //     tasks.map((task) => {
    //       task.append("project_id", response.data.id);
    //       http
    //         .post("/api/tasks", task)
    //         .then((response) => {
    //           console.log("response =", response);
    //         })
    //         .catch((error) => {
    //           console.log("error =", error);
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("error =", error);
    //   });
  };
  const collaborators = async () => {
    const response = await http.get("api/users/collaborators");
    console.log("response =", response.data);
    setUsers(response.data.users.data);
    const users = response.data.users.data;
    console.log("users =", users);
  };
  const handleFormChange = (index, event) => {
    // if (event.target.name === "ponderation")
    // }
    console.log("index", index);
    let data = [...tasksInputFields];
    if (event.target.name === "file") {
      const taskFile = event.target.files[0];
      data[index][event.target.name] = taskFile;

      console.log("taskFile", index);
    } else {
      data[index][event.target.name] = event.target.value;
    }
    setTasksInputFields(data);
  };
  const addFields = () => {
    let newfield = {
      title: "",
      description: "",
      start_date: "",
      due_date: "",
      file: "",
      ponderation: "",
      assigned_to: "",
    };

    setTasksInputFields([...tasksInputFields, newfield]);
  };
  const removeFields = (index) => {
    let data = [...tasksInputFields];
    data.splice(index, 1);
    setTasksInputFields(data);
  };
  useEffect(() => {
    header["Content-Type"] = "application/json";
    collaborators();
  }, []);
  return (
    <div className="inline-flex ">
      {/* <NavBar className=""/> */}
      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className="overflow-y-auto justify-center items-center w-screen md:inset-0 h-modal md:h-full"
      >
        <div className=" md:h-auto">
          <div className=" bg-white  shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create Project
              </h3>
            </div>

            <div className="w-full grid gap-4 mb-4 sm:grid-cols-3">
              <div>
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Title"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="start_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Start date
                  </label>
                  <input
                    type="datetime-local"
                    name="start_date"
                    id="start_date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Start date"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label
                    htmlFor="due_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    name="due_date"
                    id="due_date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="End Date"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    File
                  </p>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center p-2.5">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          {formu.file != "" ? (
                            <span> {formu.file.name} </span>
                          ) : (
                            <span className="font-semibold">
                              Click to upload
                            </span>
                          )}
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="file[]"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    name="description"
                    className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write project description here"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex py-8 justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Tasks
              </h3>
            </div>

            <>
              <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"></div>
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
                          Weighting
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Assigned to
                        </th>
                        <th scope="col" className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasksInputFields.map((input, index) => {
                        console.log(`Input => ${input} ,Index => ${index}}`);
                        return (
                          <tr
                            className="bg-gray-50 dark:bg-gray-700"
                            key={index}
                          >
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                name="title"
                                id="title"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Title"
                                required
                                value={input.title}
                                onChange={(event) => {
                                  setAhGars(index);
                                  handleFormChange(index, event);
                                }}
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                name="description"
                                id="description"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Description"
                                required
                                value={input.description}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="datetime-local"
                                name="start_date"
                                id="start_date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Start Date"
                                required
                                value={input.start_date}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="datetime-local"
                                name="due_date"
                                id="due_date"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Due Date"
                                required
                                value={input.due_date}
                                onChange={(event) => {
                                  setAhGars(index);
                                  console.log(`bdeeeeforcde[${index}]`);
                                  handleFormChange(index, event);
                                }}
                              />
                            </td>                              
                            <td className="px-3 py-3">
                              <input
                                type="number"
                                name="ponderation"
                                id={"ponderation pond-" + index}
                                className={`bg-gray-50 w-full border ${ (getPonderation() > 100) ? "border-red-600": "border-gray-300"}  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                placeholder="Weighting"
                                required
                                value={input.ponderation}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              />
                            </td>
                            <td className="px-4 py-3">
                              <select
                                name="assigned_to"
                                id="assigned_to"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={input.assigned_to}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              >
                                <option value="">Select user</option>
                                {users.map((user) => (
                                  <option key={user.id} value={user.id}>
                                    {user.person.firstname} - {user.person.lastname} -{" "}
                                    {user.id}
                                  </option>
                                ))}
                              </select>
                              {/* <select
                                name="assigned_to"
                                id="assigned_to"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                required
                                value={input.assigned_to}
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                              >
                                <option value="">Select a user</option>
                                <option value="1">User 1</option>
                                <option value="2">User 2</option>
                                <option value="3">User 3</option>
                              </select> */}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                type="submit"
                                onClick={() => {
                                  index == 0
                                    ? addFields()
                                    : removeFields(index);
                                }}
                                className="text-white bg-purple-600 px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
                              >
                                {index == 0 ? "+" : "-"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
              <div className="flex items-center justify-center max-w-screen-xl px-4 lg:px-12">
                <button
                  type="submit"
                  onClick={submit}
                  className=" text-white w-96 inline-flex items-center justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add new project
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateProject;