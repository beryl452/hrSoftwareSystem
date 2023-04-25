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
        withCredentials: true,
    });
   function login(data) {
    // http.get('/sanctum/csrf-cookie')
    //      .then((response) => {
            return http.post('/api/login', data)
                    .then((response) => {
                            setUserData(response.data);
                            console.log("login response =", response.data);
                            navigate('/preferences');
                        })
                    // })
    }

    function logout() {
        localStorage.removeItem('auth');
        navigate("/login");
    }

    function getUser() {
        const auth = JSON.parse(localStorage.getItem('auth'));
        return auth.user;
    }

    /**
     * Get the access token from the user object
     * @returns {string}
     */
    function getAccessToken() {
        const auth = JSON.parse(localStorage.getItem('auth'));
        return auth.token;
    }

    function setUserData(data) {
        localStorage.setItem('auth', JSON.stringify(data));
    }
    return {
        login,
        logout,
        getUser,
        getAccessToken,
        setUserData
    };
}

export default useUserActions;
