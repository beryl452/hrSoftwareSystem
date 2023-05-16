import DefaultLayout from '../../layout/DefaultLayout.tsx';
import React, { useEffect } from 'react';
import axios from 'axios';
import CardTwo from '../../components/CardTwo.tsx';
import TableThree from '../../components/TableThree.tsx';
import CreateTask from '../../components/CreateTask.tsx';
import EditTask from '../../components/EditTask.tsx';

const Tasks = () => {
  const [taskB, setTaskB] = React.useState({});
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth.token,
    },
    withCredentials: true,
  });
  async function taskBoard() {
    const response = await http.get('/api/tasksBilan');
    console.log(response.data);
    setTaskB(response.data);
  }
  useEffect(() => {
    taskBoard();
  }, []);
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardTwo
          toDo={
            JSON.stringify(taskB.toDo)
              ? JSON.stringify(taskB.toDo).padStart(2, '0')
              : '00'
          }
        />
        <CardTwo
          doing={
            JSON.stringify(taskB.Doing)
              ? JSON.stringify(taskB.Doing).padStart(2, '0')
              : '00'
          }
        />
        <CardTwo
          done={
            JSON.stringify(taskB.Done)
              ? JSON.stringify(taskB.Done).padStart(2, '0')
              : '00'
          }
        />
        <CardTwo
          awaitingValidation={
            JSON.stringify(taskB.awaitingValidation)
              ? JSON.stringify(taskB.awaitingValidation).padStart(2, '0')
              : '00'
          }
        />
      </div>

      <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TableThree />
      </div>
      <div>
        <CreateTask />
      </div>
    </DefaultLayout>
  );
};

export default Tasks;
