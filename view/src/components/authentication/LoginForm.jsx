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

    userActions.login(data).catch((error) => {
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
      <form noValidate validated={validated.toString()} onSubmit={handleSubmit}>
        <input
          required
          value={form.username}
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
        {validated && !form.username && <div>Username is required</div>}

        <input
          required
          value={form.password}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {validated && !form.password && <div>Password is required</div>}
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginForm;
