import "./LoginForm.css";
import React, { useState } from "react";
import { LoginInterface } from "../../types/interfaces";

interface LoginFormProps {
  handleSubmit: (formData: LoginInterface) => void;
}

function LoginForm({ handleSubmit }: LoginFormProps) {

  const initialFormData: LoginInterface = {
    username: "",
    password: ""
  };
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData(prevForm => (
      { ...prevForm, [name]: value }
    ));
  }

  function submitForm(evt: React.FormEvent) {
    evt.preventDefault();
    handleSubmit(formData);
  }


  return (
    <>
      <form className="LoginForm" onSubmit={submitForm}>
        <div className="form-input-container">
          <label htmlFor="username">Username</label>
          <input type="text" onChange={handleChange}
            name="username"
            value={formData.username}
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="password">Password</label>
          <input type="password" onChange={handleChange}
            name="password"
            value={formData.password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginForm;