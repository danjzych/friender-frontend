import "./SignupForm.css";
import { useState } from "react";
import { SignupInterface } from "../../types/interfaces";


interface SignUpFormPropsInterface {
  handleSubmit: (formData: SignupInterface) => void;
}

function SignupForm({ handleSubmit }: SignUpFormPropsInterface) {

  const initialFormData: SignupInterface = {
    username: "",
    password: "",
    hobbies: "",
    interests: "",
    location: null,
    radius: null
  };
  const [formData, setFormData] = useState(initialFormData);


  function handleChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
      <form className="SignupForm" onSubmit={submitForm}>
        <h1>Sign up for Friender!</h1>
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

        <div className="form-input-container">
          <label htmlFor="hobbies">Hobbies</label>
          <textarea onChange={handleChange}
            name="hobbies"
            value={formData.hobbies}
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="interests">Interests</label>
          <textarea onChange={handleChange}
            name="interests"
            value={formData.interests}
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="location">Location</label>
          <input type="number" onChange={handleChange}
            name="location"
            value={formData.location}
          />
        </div>

        <div className="form-input-container">
          <label htmlFor="radius">Radius</label>
          <input type="number" onChange={handleChange}
            name="radius"
            value={formData.radius}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupForm;