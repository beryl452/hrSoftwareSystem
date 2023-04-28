import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = React.useState({});
    const [search, setSearch] = React.useState("");
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
    async function viewUsers() {
        const response = await http.get("/api/users");
        console.log("response",response.data);
        setUsers(response.data);
        console.log("users",users);
    }
    useEffect(() => {
        viewUsers();
    }, []);
    return (

        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div class="w-full md:w-1/2">
                    <form class="flex items-center">
                        <label for="simple-search" class="sr-only">Search </label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Search"
                                required=""
                                value={search}
                                onChange={
                                    async (e) => {
                                        setSearch(e.target.value);
                                        const url = "/api/usersSearch/" + search;
                                        console.log("url =", url);
                                        const response = await http.get(url);
                                        console.log("search =", response.data);
                                        setUsers(response.data);
                                        console.log("seacdcdrch =", users);
                                    }
                                }
                            />
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button
                        type="button"
                        className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                        <svg
                            className="h-3.5 w-3.5 mr-2"
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
                        Create Users
                    </button>
                    
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Firstname
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Lastname
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Birth
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Function
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Rôle
                            </th>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.data
                            ?
                            users.data.map((user, index) => (
                                <tr key={index} className="border-b dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {user.username}
                                    </th>
                                    <td className="px-4 py-3">{user.firstname}</td>
                                    <td className="px-4 py-3">{user.lastname}</td>
                                    <td className="px-4 py-3">{user.Birth}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.function}</td>
                                    <td className="px-4 py-3">{user.role}</td>
                                    <td className="px-4 py-3 flex items-center justify-end">
                                        <button
                                            id="benq-ex2710q-dropdown-button"
                                            data-dropdown-toggle="benq-ex2710q-dropdown"
                                            className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                            type="button"
                                            onClick={() => {
                                                [...document.getElementsByClassName("users")].forEach(element => {
                                                    if (element.classList.contains("M" + user.id))
                                                        element.classList.toggle("hidden");
                                                    else
                                                        element.classList.add("hidden");
                                                });
                                            }}
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>
                                        <div
                                            id="benq-ex2710q-dropdown"
                                            className={"users hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-12 mt-2 M" + user.id}
                                        >
                                            <ul
                                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                aria-labelledby="benq-ex2710q-dropdown-button"
                                            >
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Show
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Edit
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="py-1">
                                                <a
                                                    href="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                >
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            : console.log("no data")}
                    </tbody>
                </table>
            </div>
            <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
            >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {users.data ? users.from : console.log("loading")}-{users.data ? users.to : console.log("loading")}
                    </span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {users.total}
                    </span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                    {/*  */}
                    {users.links
                        ? users.links
                            ? users.links.length > 3 && (
                                <>
                                    {users.links.map((link, key) =>
                                        link.label === "&laquo; Previous" ? (
                                            <li>
                                                <a
                                                    onClick={async () => {
                                                        if (users.prev_page_url != null) {
                                                            const response = await http.get(users.prev_page_url);
                                                            setUsers(response.data);
                                                        }
                                                        else {
                                                            console.log("no more pages");
                                                        }
                                                    }}
                                                    key={key}
                                                    className="flex items-center cursor-pointer justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    <span className="sr-only">Previous</span>
                                                    <svg
                                                        className="w-5 h-5"
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
                                        ) : link.label === "Next &raquo;" ? (
                                            <li>
                                                <a
                                                    onClick={async () => {
                                                        if (users.next_page_url != null) {
                                                            const response = await http.get(users.next_page_url);
                                                            setUsers(response.data);
                                                        }
                                                        else {
                                                            console.log("no more pages");
                                                        }
                                                    }}
                                                    key={key}
                                                    className="flex items-center cursor-pointer justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    <span className="sr-only">Next</span>
                                                    <svg
                                                        className="w-5 h-5"
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
                                            <li>
                                                <a
                                                    onClick={async () => {
                                                        const response = await http.get(link.url);
                                                        setUsers(response.data);
                                                    }}
                                                    key={key}
                                                    className="flex cursor-pointer items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        )
                                    )}
                                </>
                            )
                            : console.log("Loading")
                        : console.log("rr")}

                    <li>
                        <a
                            href="#"
                            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <span className="sr-only">Next</span>
                            <svg
                                className="w-5 h-5"
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
                </ul>
            </nav>
        </div>

    )
}

export default Users;

