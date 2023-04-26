import React, { useEffect } from "react";
import axios from "axios";

function Vitrine_project() {
  const [projectB, setProjectB] = React.useState({});
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
  async function projectBoard() {
    const response = await http.get('/api/projectsBilan');
    console.log(response.data);
    setProjectB(response.data);
}
  useEffect(() => {
    projectBoard();
  }, []);
  return (
    <section className="bg-white rounded-lg max-w-lg dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl h-5/6 lg:py-16 lg:px-6 bg-white-900">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-primary-900 dark:text-white">
          Project Bulletin Board
        </h2>
      </div>
      <section class="bg-white dark:bg-gray-900">
  <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-1 lg:px-6">
      <dl class="grid max-w-screen-md gap-8 mx-auto text-primary-900 sm:grid-cols-3 dark:text-white">
          <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{JSON.stringify(projectB.toDo)? JSON.stringify(projectB.toDo).padStart(2, "0") : "00"}</dt>
              <dd class="font-light text-primary-500 dark:text-gray-400">To Do</dd>
          </div>
          <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{JSON.stringify(projectB.Doing)? JSON.stringify(projectB.Doing).padStart(2, "0") : "00"}</dt>
              <dd class="font-light text-primary-500 dark:text-gray-400">Doing</dd>
          </div>
          <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl md:text-4xl font-extrabold">{JSON.stringify(projectB.Done)? JSON.stringify(projectB.Done).padStart(2, "0") : "00"}</dt>
              <dd class="font-light text-primary-500 dark:text-gray-400">Done</dd>
          </div>
      </dl>
  </div>
</section>
    </div>
    </section>
  );
}

export default Vitrine_project;
