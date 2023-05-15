import CardOne from '../../components/CardOne.tsx';
import TableOne from '../../components/TableOne.tsx';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import React, { useEffect } from "react";
import axios from "axios";

const ECommerce = () => {
  const [users, setUsers] = React.useState({});
  const [UserB, setUserB] = React.useState({});
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  const http = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${auth.token}`,
    },
    withCredentials: true,
  });

  async function viewUsers() {
    const response = await http.get("/api/users");
    console.log("response", response.data);
    setUsers(response.data);
    console.log("users", users);
  }
  async function userBoard() {
    const response = await http.get('/api/usersBilan');
    console.log(response.data);
    setUserB(response.data);
  }
  useEffect(() => {
    userBoard();
    viewUsers();
    console.log("auth",auth);
  }, []);
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne administrator={JSON.stringify(UserB.Administrator) ? JSON.stringify(UserB.Administrator).padStart(2, "0") : "00"} />
        <CardOne collaborator={JSON.stringify(UserB.Collaborator)? JSON.stringify(UserB.Collaborator).padStart(2, "0") : "00"} />
        <CardOne taskManager={JSON.stringify(UserB.TaskManager)? JSON.stringify(UserB.TaskManager).padStart(2, "0") : "00"} />
        <CardOne payrollManager={JSON.stringify(UserB.PayrollManager)? JSON.stringify(UserB.PayrollManager).padStart(2, "0") : "00"} />

      </div>

      <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;