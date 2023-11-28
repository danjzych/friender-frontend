import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import { LoginInterface } from "../../types/interfaces";

interface LoginFormProps {
  login: (formData: LoginInterface) => void;
  loginDemoUser: ({ }) => void;
}

const initialFormData: LoginInterface = {
  username: "",
  password: ""
};

/**
 * Form to login to Friender.
 *
 * props: login, loginDemoUser
 *
 * State: formData, alerts
 *
 * Context: None
 *
 * RoutesList -> loginForm -> None
 */
function LoginForm({ login, loginDemoUser }: LoginFormProps) {
  const [ formData, setFormData ] = useState(initialFormData);
  const [ alerts, setAlerts ] = useState([]);

  const navigate = useNavigate();

  /** Form control for input changes */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData(prevForm => (
      { ...prevForm, [name]: value }
    ));
  }

  /** Submit login form */
  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    try{
      await login(formData);
      navigate("/");
    } catch(err) {
      setAlerts(err)
    }
  }


  return (
    <div className="position absolute top-16 w-full flex justify-center">
    <form className="flex flex-col justify-between items-center mx-auto mt-20 py-4 h-96 w-96 min-h-full border-0 border-base-200 rounded-xl shadow-2xl" onSubmit={handleSubmit}>
      <div className="w-full text-center">
        <h2 className="text-2xl font-bold text-secondary">Login</h2>
        <h3 className="text-md font-light text-accent italic">Welcome back!</h3>
        <a className="link link-neutral text-sm" onClick={loginDemoUser}>Login with demo account</a>
      </div>
      <div className="w-full">
        <div className="w-100 mb-3">
          <label htmlFor="username" className="block px-4 font-semilight mb-0.5">Username:</label>
          <input type="text" onChange={handleChange}
            name="username"
            id="username"
            value={formData.username}
            placeholder="username"
            maxLength={15}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
        </div>
        <div className="w-100 mb-3">
          <label htmlFor="password" className="block px-4 font-semilight mb-0.5">Password:</label>
          <input type="password" onChange={handleChange}
            name="password"
            id="password"
            value={formData.password}
            placeholder="********"
            minLength={5}
            maxLength={50}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
        </div>
      </div>
      <div className="px-1">
        {alerts.length > 0 && <Alert alert={alerts} />}
      </div>
      <button type="submit" className="btn">Login</button>
    </form>
    </div>
  );
}

export default LoginForm;