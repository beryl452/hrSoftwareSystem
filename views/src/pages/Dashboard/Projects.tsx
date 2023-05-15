import DefaultLayout from '../../layout/DefaultLayout.tsx';
import React, { useEffect } from 'react';
import axios from 'axios';
import TableTwo from '../../components/TableTwo.tsx';
import CardTwo from '../../components/CardTwo.tsx';

const Projects = () => {
  const [projectB, setProjectB] = React.useState({});
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
  async function projectBoard() {
    const response = await http.get('/api/projectsBilan');
    console.log(response.data);
    setProjectB(response.data);
  }
  useEffect(() => {
    projectBoard();
  }, []);
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardTwo
          toDo={
            JSON.stringify(projectB.toDo)
              ? JSON.stringify(projectB.toDo).padStart(2, '0')
              : '00'
          }
        />
        <CardTwo
          doing={
            JSON.stringify(projectB.Doing)
              ? JSON.stringify(projectB.Doing).padStart(2, '0')
              : '00'
          }
        />
        <CardTwo
          done={
            JSON.stringify(projectB.Done)
              ? JSON.stringify(projectB.Done).padStart(2, '0')
              : '00'
          }
        />
        <CardTwo
          awaitingValidation={
            JSON.stringify(projectB.awaitingValidation)
              ? JSON.stringify(projectB.awaitingValidation).padStart(2, '0')
              : '00'
          }
        />
      </div>

      <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TableTwo />
      </div>
    </DefaultLayout>
  );
};

export default Projects;
