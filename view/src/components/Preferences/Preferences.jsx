import React, {useState, useEffect} from 'react';
import axios from "axios";

export default function Preferences() {
    const [users, setUsers] = useState([]);
    const token = JSON.parse(localStorage.getItem('auth')).token;
    console.log("tokeneneinn = ", token);
    async function Users() {
        const http = axios.create({
            baseURL: 'http://localhost:8000',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            withCredentials: true,
        });
       
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