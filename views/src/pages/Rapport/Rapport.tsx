import DefaultLayout from '../../layout/DefaultLayout.tsx';
import React, { useEffect, useState } from "react";
import axios from 'axios';

const Rapport = () => {

    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const dateDebutRef = React.useRef();
    const dateFinRef = React.useRef();
    const assignedToRef = React.useRef();

    const [seeTasks, setSeeTasks] = useState(false);

    const auth = JSON.parse(localStorage.getItem("auth") || '{}');
    const http = axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
        },
        withCredentials: true,
    });
    async function rapport() {
        const response = await http.post('/api/tasksPenalty', {
            dateDebut: dateDebutRef.current.value,
            dateFin: dateFinRef.current.value,
            assigned_to: assignedToRef.current.value,
        }).then((response) => {
            setTasks(response.data[0]);
            console.log(response);
            setSeeTasks(true);
        }).catch((error) => {
            console.log(error);
        });
    }
    const collaborators = async () => {
        const response = await http.get("api/collaborators");
        console.log("response =", response);
        setUsers(response.data);
        console.log("users =", users);
    };
    useEffect(() => {
        collaborators();
    }, []);
    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                        Date Début
                    </label>
                    <input
                        type="datetime-local"
                        placeholder="Default Input"
                        ref={dateDebutRef}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                        Date Fin
                    </label>
                    <input
                        type="datetime-local"
                        placeholder="Default Input"
                        ref={dateFinRef}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                {(users != []) && (<div className="sm:col-span-2">
                    <label
                        htmlFor="assign_to"
                        className="mb-3 block text-black dark:text-white"
                    >
                        Assign to
                    </label>
                    <select
                        name="assign_to"
                        id="assign_to"
                        ref={assignedToRef}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">Select user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.firstname} - {user.lastname} - {user.id}
                            </option>
                        ))}
                    </select>
                </div>)}
                <button
                    type='submit'
                    onClick={() => {
                        rapport();
                    }}
                >
                    Submit
                </button>
            </div>

            <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <div className="overflow-x-auto">
                    {(seeTasks) && (<table className="font-medium w-full text-sm text-left text-black dark:text-white">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-black dark:text-white">
                            <tr>
                                <th scope="col" className="px-4 py-3">
                                    title
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    description
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    status
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Assigned To
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Due Date
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    End Date
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Retard
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Pénalité
                                </th>


                            </tr>
                        </thead>
                        <tbody>
                            {tasks
                                ?
                                tasks.map((task, index) => (
                                    <tr key={index} className="border-b dark:border-gray-700 font-medium text-sm">
                                        <th
                                            scope="row"
                                            className="px-4 py-3 whitespace-nowrap text-black dark:text-white"
                                        >
                                            {task.title}
                                        </th>
                                        <td className="px-4 py-3">{task.description}</td>
                                        <td className="px-4 py-3">{task.status}</td>
                                        <td className="px-4 py-3">{task.assignee['lastname'] + " " + task.assignee['firstname']}</td>
                                        <td className="px-4 py-3">{task.due_date}</td>
                                        <td className="px-4 py-3">{task.end_date}</td>
                                        <td className="px-4 py-3"> {task.retard}</td>
                                        <td className="px-4 py-3"> {task.penalty}</td>

                                    </tr>
                                ))
                                : (<>
                                </>)}
                        </tbody>
                    </table>)}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Rapport;
