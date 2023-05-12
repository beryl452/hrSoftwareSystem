import React, { useEffect, useState } from "react";
import axios from "axios";
import Projects from "../dashboard/Projects";
import NavBar from "../dashboard/navbar";

function CreateProject() {
  const header = {
    Accept: "application/json",
    Authorization: "Bearer " + JSON.parse(localStorage.getItem("auth")).token,
  };
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: header,
    withCredentials: true,
  });
  const [tasksInputFields, setTasksInputFields] = useState([
    {
      file: "",
    },
  ]);
  const [formu, setFormu] = useState({
    file: "",
  });

  const submit = (e) => {
    e.preventDefault();

    header["Content-Type"] = "multipart/form-data";

    const tasks = [];
    tasksInputFields.forEach((task) => {
      const taskData = new FormData();

      taskData.append("file", task.file);

      tasks.push(taskData);
    });

    data.append("tasks", tasks);

    tasks.map((task) => {
      http
        .post("/api/tasks", task)
        .then((response) => {
          console.log("response =", response);
        })
        .catch((error) => {
          console.log("error =", error);
        });
    });
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
      file: "",
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
      <>
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4"></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    file
                  </th>
                  <th scope="col" className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {tasksInputFields.map((input, index) => {
                  console.log(`Input => ${input} ,Index => ${index}}`);
                  return (
                    <tr className="bg-gray-50 dark:bg-gray-700" key={index}>
                      <td className="px-4 py-3">
                        <label
                          htmlFor="file"
                          className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {input.file != "" ? (
                                <span>{input.file.name}</span>
                              ) : (
                                <span className="font-semibold">Upload</span>
                              )}
                            </p>
                          </div>
                          <input
                            id="file"
                            type="file"
                            className={"hidden dvd" + index}
                            name="file"
                            onChange={(event) => {
                              handleFormChange(index, event);
                            }}
                          />
                        </label>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="submit"
                          onClick={() => {
                            index == 0 ? addFields() : removeFields(index);
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
  );
}
export default CreateProject;
