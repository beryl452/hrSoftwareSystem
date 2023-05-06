import React, { useEffect } from "react";
import axios from "axios";

function Vitrine_user() {
  const [UserB, setUserB] = React.useState({});
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
  async function userBoard() {
    const response = await http.get('/api/usersBilan');
    console.log(response.data);
    setUserB(response.data);
}
  useEffect(() => {
    userBoard();
  }, []);
  return (
    <section className="bg-white rounded-lg max-w-lg dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl h-5/6 lg:py-16 lg:px-6 bg-white-900">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-primary-900 dark:text-white">
          User Bulletin Board
        </h2>
      </div>
      <section className="bg-white dark:bg-gray-900">
  <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-1 lg:px-6">
      <dl className="grid max-w-screen-md gap-8 mx-auto text-primary-900 sm:grid-cols-4 dark:text-white">
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{JSON.stringify(UserB.Administrator)? JSON.stringify(UserB.Administrator).padStart(2, "0") : "00"}</dt>
              <dd className="font-light text-primary-500 dark:text-gray-400">Nombre d'Administrateur</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{JSON.stringify(UserB.TaskManager)? JSON.stringify(UserB.TaskManager).padStart(2, "0") : "00"}</dt>
              <dd className="font-light text-primary-500 dark:text-gray-400">Nombre de TaskManager</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{JSON.stringify(UserB.Collaborator)? JSON.stringify(UserB.Collaborator).padStart(2, "0") : "00"}</dt>
              <dd className="font-light text-primary-500 dark:text-gray-400">Nombre de Collaborateur</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{JSON.stringify(UserB.PayrollManager)? JSON.stringify(UserB.PayrollManager).padStart(2, "0") : "00"}</dt>
              <dd className="font-light text-primary-500 dark:text-gray-400">Nombre de PayrollManager</dd>
          </div>
      </dl>
  </div>
</section>
    </div>
    </section>
  );
}

export default Vitrine_user;
