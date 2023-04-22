import axios from "axios";
import { useNavigate } from "react-router-dom";

function useUserActions() {
    const navigate = useNavigate();

    const http = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    function login(data) {
        http.get('/sanctum/csrf-cookie')
            .then((response) => {});
        return http.post('/api/login', data)
           .then((response) => {
               setUserData(response.data);
               navigate('/preferences');
           })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    function logout() {
        localStorage.removeItem('auth');
        navigate("/login");
    }

    function getUser() {
        return JSON.parse(localStorage.getItem('auth'));
    }

    /**
     * Get the access token from the user object
     * @returns {string}
     */
    function getAccessToken() {
        return getUser().token;
    }

    //function getRefreshToken() {
    //    return getUser().refresh_token;
    //}

    function setUserData(data) {
        localStorage.setItem('auth', JSON.stringify(data));
    }
    return {
        login,
        logout,
    };
}

export default useUserActions;
