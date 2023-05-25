import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreateProject() {
  const [seeTask, setSeeTask] = React.useState(false);
  const [collaborators, setCollaborators] = React.useState([]);
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem('auth') || '{}');

  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "content-type": "multipart/form-data",
      Accept: "application/json",
      'Authorization': `Bearer ${auth.token}`,
    },
    withCredentials: true,
  });

  const [tasksInputFields, setTasksInputFields] = React.useState([
    {
      name: "",
      description: "",
      start_date: "",
      due_date: "",
      weighting: "",
      assigned_to: "",
    },
  ]);
  const [formu, setFormu] = React.useState({
    name: "",
    description: "",
    start_date: "",
    due_date: "",
    folder: "",
  });

  const getPonderation = () => {
    let ponderation = 0;
    tasksInputFields.map((task) => {
      ponderation += parseInt(task.weighting);
    });
    return ponderation;
  };

  const handleChange = (e: any) => {
    setFormu({
      ...formu,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (e: any) => {
    const projectFolder = e.target.files[0];
    console.log("e.target.files[0] =", e.target.files[0]);
    if (projectFolder) {
      // Vérifier si l'extention est égal à .zip ou .rar
      if (["zip", "rar"].includes(projectFolder.name.split(".").pop())) {
        setFormu({
          ...formu,
          folder: projectFolder,
        });
      } else {
        setErrors({
          ...errors,
          folder: "Le dossier doit être un .zip ou .rar",
        })
      }
    }
  };

  const AllCollaborators = async () => {
    const response = await http.get("api/users/collaborators");
    console.log("response =", response.data);
    setCollaborators(response.data.users.data);

  };
  const handleFormChange = (index, event) => {
    // if (event.target.name === "ponderation")
    // }
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


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const project = new FormData();
    project.append("name", formu.name);
    project.append("start_date", formu.start_date);
    project.append("due_date", formu.due_date);
    project.append("description", formu.description);
    project.append("folder", formu.folder);


    const tasks: FormData[] = [];
    for (let task of tasksInputFields) {
      const taskData = new FormData();
      if (task.name === "") {
        continue;
      } else {
        taskData.append("name", task.name);
        taskData.append("description", task.description);
        taskData.append("start_date", task.start_date);
        taskData.append("due_date", task.due_date);
        taskData.append("weighting", task.weighting);
        taskData.append("assigned_to", task.assigned_to);
        tasks.push(taskData);
      }
    };
    console.log("tasks =", tasks);
    http
      .post("/api/project/create", project)
      .then((response) => {
        console.log("response =", response);
        console.log("tasks =", tasks.length);
        if (tasks.length < 0) {
          navigate("/projects",
            { state: { success: "Le projet a été créé avec succès" } },
          );
        } else {
          tasks.map((task) => {
            task.append("project_id", response.data.id);
            http
              .post("/api/task/create", task)
              .then((response) => {
                navigate("/projects");
                navigate("/projects",
                  { state: { success: "Le projet a été créé avec succès" } },
                );
              })
              .catch((error) => {
                console.log("error =", error);
              });
          });
          console.log("response =", response);
        }
      })
      .catch((error) => {
        console.log("error =", error);
      });

  }
  const addFields = () => {
    let newfield = {
      name: "",
      description: "",
      start_date: "",
      due_date: "",
      weighting: "",
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
    AllCollaborators();
  }, []);
  return (
    <div className="inline-flex w-full">
      {/* <NavBar className=""/> */}
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-y-auto justify-center items-center w-full md:inset-0 h-modal md:h-full"
      >
        <div className=" md:h-auto">
          <div className=" bg-white  shadow dark:bg-gray-800 sm:p-5">
            <div className="w-full grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
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
                    Due Date
                  </label>
                  <input
                    type="datetime-local"
                    name="due_date"
                    id="due_date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Due Date"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Folder
                  </p>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center p-2.5">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          {formu.folder != "" ? (
                            <span> {formu.folder.name} </span>
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
                {(errors.file || errors.folder) && (
                  <p className="text-red-500 text-meta-1 text-xs italic">
                    {errors.file || errors.folder}
                  </p>
                )}
              </div>
              <div className="sm:col-span-4">
                <div className="mr-8">
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
            </div><svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >

              <g
                stroke="none"
                strokeWidth={1}
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g
                  transform="translate(-525.000000, -748.000000)"
                  id="Group"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                >
                  <g transform="translate(523.000000, 746.000000)" id="Shape">
                    <line x1={17} y1={3} x2={17} y2={5} />
                    <line x1={7} y1={3} x2={7} y2={5} />
                    <path d="M17,13 L17,21 M21,17 L13,17" />
                    <path d="M8.03064542,21 C7.42550126,21 6.51778501,21 5.30749668,21 C4.50512981,21 4.2141722,20.9218311 3.92083887,20.7750461 C3.62750553,20.6282612 3.39729582,20.4128603 3.24041943,20.1383964 C3.08354305,19.8639324 3,19.5916914 3,18.8409388 L3,7.15906122 C3,6.4083086 3.08354305,6.13606756 3.24041943,5.86160362 C3.39729582,5.58713968 3.62750553,5.37173878 3.92083887,5.22495386 C4.2141722,5.07816894 4.50512981,5 5.30749668,5 L18.6925033,5 C19.4948702,5 19.7858278,5.07816894 20.0791611,5.22495386 C20.3724945,5.37173878 20.6027042,5.58713968 20.7595806,5.86160362 C20.9164569,6.13606756 21,7.24671889 21,7.99747152" />
                  </g>
                </g>
              </g>
            </svg>
            {(seeTask) && (<>
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
                          <th scope="col" className="text-center px-4 py-3">
                            Title
                          </th>
                          <th scope="col" className="text-center px-4 py-3">
                            Description
                          </th>
                          <th scope="col" className="text-center px-4 py-3">
                            Start Date
                          </th>
                          <th scope="col" className="text-center px-4 py-3">
                            Assigned to
                          </th>
                          <th scope="col" className="text-center px-4 py-3">
                            Due Date
                          </th>
                          <th scope="col" className="text-center px-4 py-3">
                            Weighting
                          </th>

                          <th scope="col" className="text-center px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasksInputFields.map((input, index) => {
                          return (
                            <tr
                              className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                              key={index}
                            >
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  className="w-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Title"
                                  required
                                  value={input.name}
                                  onChange={(event) => {
                                    handleFormChange(index, event);
                                  }}
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  name="description"
                                  id="description"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                                  className="w-25 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Start Date"
                                  required
                                  value={input.start_date}
                                  onChange={(event) =>
                                    handleFormChange(index, event)
                                  }
                                />
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  name="assigned_to"
                                  id="assigned_to"
                                  className="p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  value={input.assigned_to}
                                  onChange={(event) =>
                                    handleFormChange(index, event)
                                  }
                                >
                                  <option value="">Select user</option>                                {collaborators.map((collaborator) => (
                                    <option key={collaborator.id} value={collaborator.id}>
                                      {collaborator.person.firstname} - {collaborator.person.lastname} -{" "}
                                      {collaborator.id}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="datetime-local"
                                  name="due_date"
                                  id="due_date"
                                  className="w-25 bg-gray-50 borsder border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Due Date"
                                  required
                                  value={input.due_date}
                                  onChange={(event) => {
                                    handleFormChange(index, event);
                                  }}
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="number"
                                  name="weighting"
                                  id={"ponderation pond-" + index}
                                  className={`w-15 bg-gray-50 border ${(getPonderation() > 100) ? "border-red-600" : "border-gray-300"}  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                                  placeholder="Weighting"
                                  required
                                  value={input.weighting}
                                  onChange={(event) =>
                                    handleFormChange(index, event)
                                  }
                                />
                              </td>
                              <td className="px-2 py-3">
                                <button
                                  type="submit"
                                  onClick={() => {
                                    index == 0
                                      ? addFields()
                                      : removeFields(index);
                                  }}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
            </>)}
            <div className={"flex py-8 mr-8 items-center pb-4 mb-4 rounded-t  sm:mb-5 dark:border-gray-600 " + ((!seeTask) ? "justify-between" : "justify-end")}>
              <div>
                <button
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={(e: any) => {
                    console.log("bfvbfy")
                    handleSubmit(e)
                  }}
                >
                  <svg
                    className="h-3.5 w-3.5 font-bold"
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
                  Create Project
                </button>
              </div>
              {(!seeTask) && (<div>
                <button
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={
                    () => {
                      setSeeTask(!seeTask)
                    }
                  }
                >
                  <span>
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >

                      <g
                        stroke="none"
                        strokeWidth={1}
                        fill="none"
                        fillRule="evenodd"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <g
                          transform="translate(-525.000000, -748.000000)"
                          id="Group"
                          stroke="#FFFFFF"
                          strokeWidth={2}
                        >
                          <g transform="translate(523.000000, 746.000000)" id="Shape">
                            <line x1={17} y1={3} x2={17} y2={5} />
                            <line x1={7} y1={3} x2={7} y2={5} />
                            <path d="M17,13 L17,21 M21,17 L13,17" />
                            <path d="M8.03064542,21 C7.42550126,21 6.51778501,21 5.30749668,21 C4.50512981,21 4.2141722,20.9218311 3.92083887,20.7750461 C3.62750553,20.6282612 3.39729582,20.4128603 3.24041943,20.1383964 C3.08354305,19.8639324 3,19.5916914 3,18.8409388 L3,7.15906122 C3,6.4083086 3.08354305,6.13606756 3.24041943,5.86160362 C3.39729582,5.58713968 3.62750553,5.37173878 3.92083887,5.22495386 C4.2141722,5.07816894 4.50512981,5 5.30749668,5 L18.6925033,5 C19.4948702,5 19.7858278,5.07816894 20.0791611,5.22495386 C20.3724945,5.37173878 20.6027042,5.58713968 20.7595806,5.86160362 C20.9164569,6.13606756 21,7.24671889 21,7.99747152" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                  Add Tasks
                </button>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreateProject;