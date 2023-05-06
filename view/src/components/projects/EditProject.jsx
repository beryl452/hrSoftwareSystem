import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function EditProject() {
  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState([]);
  const location = useLocation();
  const [status, setStatus] = useState(['to Do', 'Doing', 'Done']);
  const [formu, setFormu] = useState({
    title: location.state.project.title,
    start_date: location.state.project.start_date,
    end_date: location.state.project.end_date,
    description: location.state.project.description,
    status: location.state.project.status,
    due_date: location.state.project.due_date,
    file: location.state.project.file,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    console.log("formu =", formu);

    const data = new FormData();

    data.append("file", formu.file);
    data.append("title", formu.title);
    data.append("start_date", formu.start_date);
    data.append("end_date", formu.end_date);
    data.append("description", formu.description);
    data.append("status", formu.status);
    data.append("due_date", formu.due_date);
    data.append("created_by", JSON.parse(localStorage.getItem("auth")).user.id);
    data.append("updated_by", JSON.parse(localStorage.getItem("auth")).user.id);

    const http = axios.create({
      baseURL: "http://localhost:8000",
      headers: {
        'Accept': "application/json",
        'Content-Type': "application/json",
        'Authorization': "Bearer " + JSON.parse(localStorage.getItem("auth")).token,
        'content-type': "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log(formu);
    console.log(data);
    http
      .put(`/api/projects/${location.state.project.id}`, data)
      .then((response) => {
        console.log("response =", response);
      })
      .catch((error) => {
        console.log("error =", error);
      });
  };
  const handleChange = (e) => {
    setFormu({
      ...formu,
      [e.target.name]: e.target.value,
    });
  };
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  //   console.log("e.target.files[0] =", e.target.files[0]);
  //   if (file) {
  //     setFormu({
  //       ...formu,
  //       file:e.target.files[0],
  //     });
  //   };
  // };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("e.target.files[0] =", selectedFile);
    setFormu({
      ...formu,
      file: selectedFile,
    });
  };
  
  useEffect(() => {
    setFormu({
      title: location.state.project.title,
      start_date: location.state.project.start_date,
      end_date: location.state.project.end_date,
      description: location.state.project.description,
      status: location.state.project.status,
      due_date: location.state.project.due_date,
      file: location.state.project.file,
    });
  }, []);
  return (
    <>
      <div className="flex justify-center m-5">
        <button
          id="defaultModalButton"
          data-modal-toggle="defaultModal"
          className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
        >
          Edit Project
        </button>
      </div>

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Edit Project
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form
              noValidate
              validated={validated.toString()}
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
                    required=""
                    value={formu.title}
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
                    required=""
                    value={formu.start_date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="end_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    End Date
                  </label>
                  <input
                    type="datetime-local"
                    name="end_date"
                    id="end_date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="End Date"
                    required=""
                    value={formu.end_date}
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
                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    id="status"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={handleChange}
                    defaultValue={formu.status}
                  >
                    {status.map((st) => (
                      <option key={st} value={st} >
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
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
                    placeholder="End Date"
                    required=""
                    value={formu.due_date}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    name="description"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write project description here"
                    value={formu.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="mr-1 -ml-1 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  // class="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                Edit project
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditProject;
