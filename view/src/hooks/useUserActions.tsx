import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useUserActions = () => {
  const { setAuth } = useContext(AuthContext);
  const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${auth.token}`,
    },
    withCredentials: true,
  });
  const login = async (email: string, password: string) => {
    // console.log("Here",email,password)
    const res = await http.post('/api/login', { email, password })
    // .then((res) => {
    //   console.log('Here', res.data);
    //   return res;
    // })
    // .catch((err) => {
    //   console.log('errofr', err);
    //   return err;
    // });
    // if (res.status === 201) {
    //   console.log('Here', res.data);
    //   localStorage.setItem('auth', JSON.stringify(res.data));
    //   setAuth(res.data);
    //   console.log('mploqaun', auth);
    // }

    // }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth({ user: {}, token: ''});
  };

  return { login, logout };
};

export default useUserActions;
