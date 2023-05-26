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
  const getProjectCounts = async (search: string) => {
    const response = await http.get(`/api/project/allProjects/?search=${search}`);
    return response.data.projects;
  };

  async function projectBoard() { 
    const projectCounts = await Promise.all([
      getProjectCounts('toDo'),
      getProjectCounts('doing'),
      getProjectCounts('done'),
      getProjectCounts('awaitingValidation'),
    ]);
    
    setProjectB({
      toDo: projectCounts[0],
      doing: projectCounts[1],
      done: projectCounts[2],
      awaitingValidation: projectCounts[3],
    });    
  }
  useEffect(() => {
    projectBoard();
  }, []);
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* <CardTwo
          toDo={
            JSON.stringify(projectB.toDo.meta.total)
              ? JSON.stringify(projectB.toDo.meta.total).padStart(2, '0')
              : '00'
          }
        />
        <CardTwo
          doing={
            JSON.stringify(projectB.doing.meta.total)
              ? JSON.stringify(projectB.doing.meta.total).padStart(2, '0')
              : '00'
          }
        />
        <CardTwo
          done={
            JSON.stringify(projectB.done.meta.total)
              ? JSON.stringify(projectB.done.meta.total).padStart(2, '0')
              : '00'
          }
        />
        <CardTwo
          awaitingValidation={
            JSON.stringify(projectB.awaitingValidation.meta.total)
              ? JSON.stringify(projectB.awaitingValidation.meta.total).padStart(2, '0')
              : '00'
          }
        /> */}
        {Object.keys(projectB).map((key, index) => (
          <CardTwo
            key={index}
            toDo={
              JSON.stringify(projectB[key].meta.total)
                ? JSON.stringify(projectB[key].meta.total).padStart(2, '0')
                : '00'
            }
            name={key}
          />
        ))}
      </div>

      <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TableTwo />
      </div>
    </DefaultLayout>
  );
};

export default Projects;
