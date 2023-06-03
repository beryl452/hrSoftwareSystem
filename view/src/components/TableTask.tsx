import React, { useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropdownTaskTable from './DropDownTaskTable';
import FormSubmitTask from './FormSubmitTask';
// import Tasks from '../pages/Dashboard/Tasks';

type Props = {
  task: any;
};
const TableTask = (props: Props) => {
  const navigate = useNavigate();
  // const location = useLocation();
  const [tasks, setTasks] = React.useState({
    data: [],
    meta: {
      total: 0,
      per_page: 0,
      current_page: 0,
      last_page: 0,
      from: 0,
      to: 0,
    },
  });
  const [seeSubmitForm, setSeeSubmitForm] = React.useState(false);
  const [seeTransferForm, setSeeTransferForm] = React.useState(false);

  const [search, setSearch] = React.useState('');
  //   const [alert, setAlert] = React.useState(false);
  //   const [alertValidate, setAlertValidate] = React.useState(false);
  const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('auth') || '{}').token,
    },
    withCredentials: true,
  });
  const [formu, setFormu] = React.useState({
    folder: "",
  });
  const [currentTask, setCurrentTask] = React.useState<Number>();

  const [transferForm, setTransferForm] = React.useState({
    reasonRef: useRef<HTMLTextAreaElement>(null),
    userFrom: Number(JSON.parse(localStorage.getItem('auth') || '{}').user.id),
    userToRef: useRef<HTMLSelectElement>(null),
    taskId: "",
  });
  const [errors, setErrors] = React.useState({
    folder: '',
  });
  const [collaborators, setCollaborators] = React.useState([]);
  const [transferErrors, setTransferErrors] = React.useState({
    reason: "",
    userFrom: "",
    userTo: "",
    taskId: "",
  });

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
  const handleSubmitTransfer = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append('reason', transferForm.reasonRef.current?.value);
    data.append('user_from', transferForm.userFrom);
    data.append('user_to', transferForm.userToRef.current?.value);
    data.append('task_id', currentTask);
    console.log("transferForm =", {
      reason: data.get('reason'),
      userFrom: data.get('userFrom'),
      userTo: data.get('userTo'),
      taskId: data.get('taskId'),
    });
    http.post('api/transfer/create', data)
        .then((response) => {
          console.log("responseTransfer", response);
          setSeeTransferForm(false);
          // navigate(`/projects/${tasks.data[0].project_id.id}/tasks`)
        })
        .then((error) => {
          console.log("errorTransfer", error);
          // setTransferErrors({
            // ...transferErrors,
            // reason: error.response.data.errors.reason,
            // userFrom: error.response.data.errors.userFrom,
            // userTo: error.response.data.errors.userTo,
            // taskId: error.response.data.errors.taskId,
          // })
        });
  }
  const getCollaborators = async () => {
    http.get('api/users/collaborators')
      .then((response) => {
        console.log("responseCollaborators", response.data.users.data);
        setCollaborators(response.data.users.data);
      })
      .catch((error) => {
        console.log("errorCollaborators", error);
      });
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('folder', formu.folder);
    formData.append('task_id', currentTask);
    console.log("formu.folder =", formData.get('task_id'));

    // http.post(`api/task/submit`, formData)
    //   .then((response) =>  {
    //     console.log("responseSubmit", response);
    //     setSeeSubmitForm(false);
    //     navigate(`/projects/${tasks.data[0].project_id.id}/tasks`)
    //   })
    //   .catch((error) => {
    //     console.log("errorSubmit", error);
    //     setErrors({
    //       ...errors,
    //       folder: error.response.data.error,
    //     })
    //   }
    //   );
  }
  useEffect(() => {
    console.log('tasks', props.task.data);
    setTasks(props.task);
    getCollaborators();
  }, [props.task.data]);

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
                  // const url = 'api/task/allAgents?search='.concat(search);
                  // console.log('url =', url);
                  // const response = await http.get(url);
                  // console.log('search =', response.data);
                  // console.log('search =', response.data);
                  // setAgents(response.data);
                  // console.log('seacdcdrch =', tasks);
                }}
              />
            </div>
          </form>
        </div>
        <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3">
          <button
            onClick={() => {
              // navigate('/CreateAgent', { replace: true });
            }}
            className="flex items-center  justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
            type="submit"
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
            Create task
          </button>
        </div>
      </div>
      {props.task && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-medium text-black dark:text-white">
              <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-black dark:text-white">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    start_date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    due_date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    weighting
                  </th>
                  <th scope="col" className="px-4 py-3">
                    folder
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.data?.map((task: any, index: any) => (
                  <tr
                    key={index}
                    className="dark:border-gray-700 border-b text-sm font-medium"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-4 py-3 text-black dark:text-white"
                    >
                      {task.name}
                    </th>
                    <td className="px-4 py-3">{task.description}</td>
                    <td className="px-4 py-3">{task.start_date}</td>
                    <td className="px-4 py-3">{task.due_date}</td>
                    <td className="px-4 py-3">{task.status}</td>
                    <td className="px-4 py-3">{task.weighting}</td>
                    <td className="px-4 py-3">
                      {/* {task.folder} */}
                      <svg
                        className="h-6 w-6 cursor-pointer"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={async () => {
                          // const response = await http.get(
                          //   'api/project/download/'.concat(
                          //     encodeURIComponent(project.id)
                          //   )
                          // );
                          // console.log('responseprojectidi', response.data);
                          // const url = window.URL.createObjectURL(
                          //   new Blob([response.data])
                          // );
                          // const link = document.createElement('a');
                          // link.href = url;
                          // link.setAttribute(
                          //   'download',
                          //   project.name.concat('.zip')
                          // );
                          // document.body.appendChild(link);
                          // link.click();
                        }}
                      >
                        <path
                          d="M2 6a2 2 0 0 1 2-2h5a1 1 0 0 1 .707.293L11.414 6H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm6.586 0H4v12h16V8h-9a1 1 0 0 1-.707-.293L8.586 6zM12 9.5a1 1 0 0 1 1 1v2.586l.293-.293a1 1 0 0 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414l.293.293V10.5a1 1 0 0 1 1-1z"
                          fill="#3c50e0"
                        />
                      </svg>
                    </td>
                    <td className="px-4 py-3">
                      <DropdownTaskTable>
                        <button
                          onClick={() => {
                            setSeeSubmitForm(true);
                            setCurrentTask(task.id);
                          }}
                          className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                          <svg
                            className="fill-current"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_62_9787)">
                              <path
                                d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z"
                                fill=""
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_62_9787">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          Validate Submit
                        </button>
                        {(task.status == 'awaitingValidation') && (
                          <button
                            onClick={async () => {
                              http.put('api/task/validate/'.concat(task.id))
                                .then((response) => {
                                  // console.log("responseValidate", response);
                                  setCurrentTask(task.id);
                                  setTasks(response.data.tasks);
                                })
                              // .catch((error) => {
                              //   console.log("errorValidate", error);
                              // });
                            }
                            }
                            className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                            <svg
                              className="fill-current"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_62_9787)">
                                <path
                                  d="M15.55 2.97499C15.55 2.77499 15.475 2.57499 15.325 2.42499C15.025 2.12499 14.725 1.82499 14.45 1.52499C14.175 1.24999 13.925 0.974987 13.65 0.724987C13.525 0.574987 13.375 0.474986 13.175 0.449986C12.95 0.424986 12.75 0.474986 12.575 0.624987L10.875 2.32499H2.02495C1.17495 2.32499 0.449951 3.02499 0.449951 3.89999V14C0.449951 14.85 1.14995 15.575 2.02495 15.575H12.15C13 15.575 13.725 14.875 13.725 14V5.12499L15.35 3.49999C15.475 3.34999 15.55 3.17499 15.55 2.97499ZM8.19995 8.99999C8.17495 9.02499 8.17495 9.02499 8.14995 9.02499L6.34995 9.62499L6.94995 7.82499C6.94995 7.79999 6.97495 7.79999 6.97495 7.77499L11.475 3.27499L12.725 4.49999L8.19995 8.99999ZM12.575 14C12.575 14.25 12.375 14.45 12.125 14.45H2.02495C1.77495 14.45 1.57495 14.25 1.57495 14V3.87499C1.57495 3.62499 1.77495 3.42499 2.02495 3.42499H9.72495L6.17495 6.99999C6.04995 7.12499 5.92495 7.29999 5.87495 7.49999L4.94995 10.3C4.87495 10.5 4.92495 10.675 5.02495 10.85C5.09995 10.95 5.24995 11.1 5.52495 11.1H5.62495L8.49995 10.15C8.67495 10.1 8.84995 9.97499 8.97495 9.84999L12.575 6.24999V14ZM13.5 3.72499L12.25 2.49999L13.025 1.72499C13.225 1.92499 14.05 2.74999 14.25 2.97499L13.5 3.72499Z"
                                  fill=""
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_62_9787">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            Validate Creation
                          </button>)}
                        <button className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                          <svg
                            className="fill-current"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.225 2.20005H10.3V1.77505C10.3 1.02505 9.70005 0.425049 8.95005 0.425049H7.02505C6.27505 0.425049 5.67505 1.02505 5.67505 1.77505V2.20005H3.75005C3.02505 2.20005 2.42505 2.80005 2.42505 3.52505V4.27505C2.42505 4.82505 2.75005 5.27505 3.22505 5.47505L3.62505 13.75C3.67505 14.775 4.52505 15.575 5.55005 15.575H10.4C11.425 15.575 12.275 14.775 12.325 13.75L12.75 5.45005C13.225 5.25005 13.55 4.77505 13.55 4.25005V3.50005C13.55 2.80005 12.95 2.20005 12.225 2.20005ZM6.82505 1.77505C6.82505 1.65005 6.92505 1.55005 7.05005 1.55005H8.97505C9.10005 1.55005 9.20005 1.65005 9.20005 1.77505V2.20005H6.85005V1.77505H6.82505ZM3.57505 3.52505C3.57505 3.42505 3.65005 3.32505 3.77505 3.32505H12.225C12.325 3.32505 12.425 3.40005 12.425 3.52505V4.27505C12.425 4.37505 12.35 4.47505 12.225 4.47505H3.77505C3.67505 4.47505 3.57505 4.40005 3.57505 4.27505V3.52505V3.52505ZM10.425 14.45H5.57505C5.15005 14.45 4.80005 14.125 4.77505 13.675L4.40005 5.57505H11.625L11.25 13.675C11.2 14.1 10.85 14.45 10.425 14.45Z"
                              fill=""
                            />
                            <path
                              d="M8.00005 8.1001C7.70005 8.1001 7.42505 8.3501 7.42505 8.6751V11.8501C7.42505 12.1501 7.67505 12.4251 8.00005 12.4251C8.30005 12.4251 8.57505 12.1751 8.57505 11.8501V8.6751C8.57505 8.3501 8.30005 8.1001 8.00005 8.1001Z"
                              fill=""
                            />
                            <path
                              d="M9.99994 8.60004C9.67494 8.57504 9.42494 8.80004 9.39994 9.12504L9.24994 11.325C9.22494 11.625 9.44994 11.9 9.77494 11.925C9.79994 11.925 9.79994 11.925 9.82494 11.925C10.1249 11.925 10.3749 11.7 10.3749 11.4L10.5249 9.20004C10.5249 8.87504 10.2999 8.62504 9.99994 8.60004Z"
                              fill=""
                            />
                            <path
                              d="M5.97497 8.60004C5.67497 8.62504 5.42497 8.90004 5.44997 9.20004L5.62497 11.4C5.64997 11.7 5.89997 11.925 6.17497 11.925C6.19997 11.925 6.19997 11.925 6.22497 11.925C6.52497 11.9 6.77497 11.625 6.74997 11.325L6.57497 9.12504C6.57497 8.80004 6.29997 8.57504 5.97497 8.60004Z"
                              fill=""
                            />
                          </svg>
                          Delete
                        </button>
                        {(<button
                          onClick={async () => {
                            setSeeTransferForm(true);
                            setCurrentTask(task.id);
                          }}
                          className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                          <svg
                            className="fill-current"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.225 2.20005H10.3V1.77505C10.3 1.02505 9.70005 0.425049 8.95005 0.425049H7.02505C6.27505 0.425049 5.67505 1.02505 5.67505 1.77505V2.20005H3.75005C3.02505 2.20005 2.42505 2.80005 2.42505 3.52505V4.27505C2.42505 4.82505 2.75005 5.27505 3.22505 5.47505L3.62505 13.75C3.67505 14.775 4.52505 15.575 5.55005 15.575H10.4C11.425 15.575 12.275 14.775 12.325 13.75L12.75 5.45005C13.225 5.25005 13.55 4.77505 13.55 4.25005V3.50005C13.55 2.80005 12.95 2.20005 12.225 2.20005ZM6.82505 1.77505C6.82505 1.65005 6.92505 1.55005 7.05005 1.55005H8.97505C9.10005 1.55005 9.20005 1.65005 9.20005 1.77505V2.20005H6.85005V1.77505H6.82505ZM3.57505 3.52505C3.57505 3.42505 3.65005 3.32505 3.77505 3.32505H12.225C12.325 3.32505 12.425 3.40005 12.425 3.52505V4.27505C12.425 4.37505 12.35 4.47505 12.225 4.47505H3.77505C3.67505 4.47505 3.57505 4.40005 3.57505 4.27505V3.52505V3.52505ZM10.425 14.45H5.57505C5.15005 14.45 4.80005 14.125 4.77505 13.675L4.40005 5.57505H11.625L11.25 13.675C11.2 14.1 10.85 14.45 10.425 14.45Z"
                              fill=""
                            />
                            <path
                              d="M8.00005 8.1001C7.70005 8.1001 7.42505 8.3501 7.42505 8.6751V11.8501C7.42505 12.1501 7.67505 12.4251 8.00005 12.4251C8.30005 12.4251 8.57505 12.1751 8.57505 11.8501V8.6751C8.57505 8.3501 8.30005 8.1001 8.00005 8.1001Z"
                              fill=""
                            />
                            <path
                              d="M9.99994 8.60004C9.67494 8.57504 9.42494 8.80004 9.39994 9.12504L9.24994 11.325C9.22494 11.625 9.44994 11.9 9.77494 11.925C9.79994 11.925 9.79994 11.925 9.82494 11.925C10.1249 11.925 10.3749 11.7 10.3749 11.4L10.5249 9.20004C10.5249 8.87504 10.2999 8.62504 9.99994 8.60004Z"
                              fill=""
                            />
                            <path
                              d="M5.97497 8.60004C5.67497 8.62504 5.42497 8.90004 5.44997 9.20004L5.62497 11.4C5.64997 11.7 5.89997 11.925 6.17497 11.925C6.19997 11.925 6.19997 11.925 6.22497 11.925C6.52497 11.9 6.77497 11.625 6.74997 11.325L6.57497 9.12504C6.57497 8.80004 6.29997 8.57504 5.97497 8.60004Z"
                              fill=""
                            />
                          </svg>
                          Transfer
                        </button>)}
                        {(<button
                          onClick={async () => {

                          }}
                          className="flex w-full items-center gap-2 rounded-sm py-1.5 px-4 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
                          <svg
                            className="fill-current"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.225 2.20005H10.3V1.77505C10.3 1.02505 9.70005 0.425049 8.95005 0.425049H7.02505C6.27505 0.425049 5.67505 1.02505 5.67505 1.77505V2.20005H3.75005C3.02505 2.20005 2.42505 2.80005 2.42505 3.52505V4.27505C2.42505 4.82505 2.75005 5.27505 3.22505 5.47505L3.62505 13.75C3.67505 14.775 4.52505 15.575 5.55005 15.575H10.4C11.425 15.575 12.275 14.775 12.325 13.75L12.75 5.45005C13.225 5.25005 13.55 4.77505 13.55 4.25005V3.50005C13.55 2.80005 12.95 2.20005 12.225 2.20005ZM6.82505 1.77505C6.82505 1.65005 6.92505 1.55005 7.05005 1.55005H8.97505C9.10005 1.55005 9.20005 1.65005 9.20005 1.77505V2.20005H6.85005V1.77505H6.82505ZM3.57505 3.52505C3.57505 3.42505 3.65005 3.32505 3.77505 3.32505H12.225C12.325 3.32505 12.425 3.40005 12.425 3.52505V4.27505C12.425 4.37505 12.35 4.47505 12.225 4.47505H3.77505C3.67505 4.47505 3.57505 4.40005 3.57505 4.27505V3.52505V3.52505ZM10.425 14.45H5.57505C5.15005 14.45 4.80005 14.125 4.77505 13.675L4.40005 5.57505H11.625L11.25 13.675C11.2 14.1 10.85 14.45 10.425 14.45Z"
                              fill=""
                            />
                            <path
                              d="M8.00005 8.1001C7.70005 8.1001 7.42505 8.3501 7.42505 8.6751V11.8501C7.42505 12.1501 7.67505 12.4251 8.00005 12.4251C8.30005 12.4251 8.57505 12.1751 8.57505 11.8501V8.6751C8.57505 8.3501 8.30005 8.1001 8.00005 8.1001Z"
                              fill=""
                            />
                            <path
                              d="M9.99994 8.60004C9.67494 8.57504 9.42494 8.80004 9.39994 9.12504L9.24994 11.325C9.22494 11.625 9.44994 11.9 9.77494 11.925C9.79994 11.925 9.79994 11.925 9.82494 11.925C10.1249 11.925 10.3749 11.7 10.3749 11.4L10.5249 9.20004C10.5249 8.87504 10.2999 8.62504 9.99994 8.60004Z"
                              fill=""
                            />
                            <path
                              d="M5.97497 8.60004C5.67497 8.62504 5.42497 8.90004 5.44997 9.20004L5.62497 11.4C5.64997 11.7 5.89997 11.925 6.17497 11.925C6.19997 11.925 6.19997 11.925 6.22497 11.925C6.52497 11.9 6.77497 11.625 6.74997 11.325L6.57497 9.12504C6.57497 8.80004 6.29997 8.57504 5.97497 8.60004Z"
                              fill=""
                            />
                          </svg>
                          Receipt
                        </button>)}
                      </DropdownTaskTable>
                    </td>
                  </tr>
                ))}
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
                {' '.concat(tasks.meta ? tasks.meta.from : 0, ' ')} -{' '}
                {' '.concat(tasks.meta ? tasks.meta.to : 0, ' ')}
              </span>
              of
              <span className="text-gray-900 font-medium dark:text-white">
                {' '.concat(tasks.meta ? tasks.meta.total : 0, ' ')}
              </span>
            </span>

            <ul className="inline-flex items-stretch  -space-x-px dark:border-strokedark dark:bg-boxdark">
              {
                <>
                  {(tasks.meta?.links?.length > 3) && (
                    <>
                      {tasks.meta?.links.map((link, key) => (
                        (link.label === '&laquo; Previous') ? (
                          <li key={key}>
                            <a
                              onClick={async () => {
                                if (tasks.links.prev != null) {
                                  const response = await http.get(
                                    tasks.links.prev
                                  );
                                  setTasks(response.data.tasks);
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
                        ) : (
                          (link.label === 'Next &raquo;') ? (
                            <li key={key}>
                              <a
                                onClick={async () => {
                                  if (tasks.links.next != null) {
                                    const response = await http.get(
                                      tasks.links.next
                                    );
                                    setTasks(response.data.tasks);
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
                                  setTasks(response.data.tasks);
                                }}
                                key={key}
                                className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 flex cursor-pointer items-center justify-center border py-2 px-3 text-sm leading-tight dark:border-strokedark dark:bg-boxdark dark:hover:text-white"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))
                      ))}
                    </>
                  )}
                </>
              }
            </ul>

            {/* tasks.meta?.links.map((link, key)=>(
                  "vvr"
              )) */}
          </nav>
        </>
      )}
      {seeSubmitForm && (
        <FormSubmitTask seeSubmit={seeSubmitForm} setSeeSubmit={setSeeSubmitForm} children={
          (
            <>
              <form
                noValidate
                method="post"
                onSubmit={handleSubmit}
              >
                <div className="grid  ">
                  <div>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Folder
                    </p>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:text-gray-3 dark:bg-black hover:bg-gray-100 dark:border-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center p-2.5">
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            {formu.folder != "" ? (
                              <span>
                                {formu.folder.name}
                              </span>
                            ) : (
                              <span>
                                Click to upload (Folder must be .zip or .rar)
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
                  {(errors.folder) && (
                    <p className="text-red-500 text-meta-1 text-xs italic">
                      {errors.folder}
                    </p>
                  )}
                  {/* </div>   */}
                </div>
                <button
                  type="submit"
                  className="flex items-center mt-6 w-60 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
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
                  Submit my task
                </button>
              </form>
            </>
          )
        } title={"Submit Task"} />
      )}
      {seeTransferForm && (
        // handleSubmitTransfer
        <FormSubmitTask seeSubmit={seeTransferForm} setSeeSubmit={setSeeTransferForm} children={
          (
            <>
              <form
                noValidate
                method="post"
                onSubmit={handleSubmitTransfer}
              >
                <div>
                  <label
                    htmlFor="collaborator"
                    className="mb-3 block text-black dark:text-white"
                  >
                    Collaborator
                  </label>
                  <select
                    name="collaborator"
                    id="collaborator"
                    ref={transferForm.userToRef}
                    required
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="">Select Person</option>
                    {collaborators.map((collaborator) => (
                      <option key={collaborator.id} value={collaborator.id}>
                        {collaborator.person.firstname} - {collaborator.person.lastname} -{" "}
                        {collaborator.id}
                      </option>
                    ))}
                  </select>
                  {/* {
                    errors.person_id && (
                      <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                        {errors.person_id}
                      </p>)
                  } */}
                </div>
                <div>
                  <label
                    htmlFor="reason"
                    className="mb-3 block text-black dark:text-white"
                  >
                    Reason
                  </label>

                  <textarea
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    name="reason"
                    id="reason"
                    ref={transferForm.reasonRef}
                    rows={6}
                    placeholder="Reason"
                  ></textarea>
                  {/* {
                    errors.username && (
                      <p className="text-red-500 text-meta-1 text-sm mt-1 ml-1">
                        {errors.username}
                      </p>)
                  } */}
                </div>
                <button
                  className="flex items-center mt-6 w-60 justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                  type="submit"
                  onClick={(e: any) => {
                    handleSubmitTransfer(e)                    // navigate('/agents');
                  }}
                >
                  Transfer task
                </button>
              </form>

            </>
          )} title={"Transfer task"} />
      )}
    </div>
  );
};

export default TableTask;
