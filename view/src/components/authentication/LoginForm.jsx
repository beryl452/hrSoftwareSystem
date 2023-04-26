import React from "react";
import useUserActions from "./../../hooks/user.actions";

function LoginForm() {
  const [validated, setValidated] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });
  const userActions = useUserActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    const data = {
      username: form.username.value,
      password: form.password.value,
    };

    userActions.login(data)
    .catch((error) => {
      if (error.message) {
        setError(error.message);
      }
    });
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
     <form noValidate validated={validated.toString()} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div>
                        <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                        <input 
                         required
                         value={form.username}
                         name="username"
                         placeholder="Username"
                         onChange={handleChange}
                         type="username" id="username"  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-white-600 focus:border-white-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                              {validated && !form.username && <small className="block mb-2 text-sm font-medium text-red-700 dark:text-white"><em>Username is required</em></small>}

                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                        required
                        value={form.password}
                        name="password"
                        type="password"
                        onChange={handleChange}
                          id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            {validated && !form.password && <small className="block mb-2 text-sm font-medium text-red-700 dark:text-white"><em>Password is required</em></small>}

                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                   
                </form>
    </>     
  );
}

export default LoginForm;
