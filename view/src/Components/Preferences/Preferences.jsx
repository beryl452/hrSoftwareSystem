import React, {useState, useEffect} from 'react';
import axios from "axios";

export default function Preferences() {
    const [users, setUsers] = useState([]);
    const  header ={
        Accept: 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
    };
    const http = axios.create({
        baseURL: 'http://localhost:8000',
        headers: header,
    });
    async function Users() {
        const csrf = await http.get('/sanctum/csrf-cookie');
        console.log("csrf = ", csrf);

        console.log("sessionStorage = ", sessionStorage.getItem('token'))

       const response = await http.get('/api/users');
       setUsers(response.data);
        console.log("response = ", response);
    }
    useEffect(()=>{
        Users();
    }, [])
    return(
        <div>
            {users.map((user) => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>))}
        </div>
    );
}