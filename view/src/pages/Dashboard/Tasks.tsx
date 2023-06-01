import DefaultLayout from '../../layout/DefaultLayout.tsx';
import React, { useEffect } from 'react';
import axios from 'axios';
import CardTwo from '../../components/CardTwo.tsx';
import { useLocation } from 'react-router-dom';
import TableTask from '../../components/TableTask.tsx';

const Tasks = () => {
  const [task, setTasks] = React.useState([]);
  const [taskB, setTaskB] = React.useState({});
  const location = useLocation();
  const theProject = location.state?.project;

  const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('auth') || '{}').token,
    },
    withCredentials: true,
  });
  const getTaskCounts = async (search: string) => {
   const response = await http.get(`/api/task/tasks/${theProject.id}/?search=${search}`)
    // .then((response) => {
      console.log("response.data.tasks.meta.total",response.data.tasks.meta.total)
      return response.data.tasks.meta.total;
    // });
  };
  async function viewTasks() {
    const response = await http.get(`/api/task/tasks/${theProject.id}`);
    console.log('response', response.data);
    setTasks(response.data.tasks);
  }

  async function taskBoard() { 
    const taskCounts = await Promise.all([
      getTaskCounts('toDo'),
      getTaskCounts('doing'),
      getTaskCounts('done'),
      getTaskCounts('awaitingValidation'),
    ]);
    
    setTaskB({
      toDo: taskCounts[0],
      doing: taskCounts[1],
      done: taskCounts[2],
      awaitingValidation: taskCounts[3],
    });
  }
  useEffect(() => {
    console.log("location.state",location.state.project)
    viewTasks();
    taskBoard();
  }, []);
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {Object.keys(taskB).map((key, index) => (
          JSON.stringify(taskB) &&
          // <div
          //   onClick={()=>{

          //   }}
          // >
            <CardTwo
            key={index}
            toDo={
              JSON.stringify(taskB[key])
                ? JSON.stringify(taskB[key]).padStart(2, '0')
                : '00'
            }
            name={key}
          />
          // </div>
        ))}
      </div>
      {(location.state?.success)&&(<div className="mt-5 flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4">
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
        </div>)}
      <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TableTask task={task} />
      </div>
    </DefaultLayout>
  );
};

export default Tasks;
