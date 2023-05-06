import React from 'react';
import { useLocation } from 'react-router-dom';
function DeleteProject(){
    const location = useLocation();

    const deleteProject = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:8000/api/projects/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: location.state.project.id
            })
        });

    return(
        <div>
            <h1>Delete Project</h1>
            {JSON.stringify(location.state.project)}
        </div>
    );
}

export default DeleteProject;