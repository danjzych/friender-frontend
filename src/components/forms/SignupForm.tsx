import { useState } from "react";
import Alert from "../common/Alert";
import { SignupInterface } from "../../types/interfaces";


interface SignUpFormPropsInterface {
  signup: (formData: SignupInterface) => void;
  addImage: (formData: any, username?: string) => void;
  loginDemoUser: ({ }) => void;
}

const initialFormData: SignupInterface = {
  username: "",
  password: "",
  hobbies: "",
  interests: "",
  location: null,
  radius: null
};

/**
 * Form to signup for Friender.
 *
 * props: signup, addImage, loginDemoUser
 *
 * State: formData, file, alerts
 *
 * Context: None
 *
 * RoutesList -> SignupForm -> None
 */
function SignupForm({ signup, addImage, loginDemoUser }: SignUpFormPropsInterface) {
  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState();
  const [ alerts, setAlerts ] = useState([]);

  /** Form control for input changes */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = evt.target;
    setFormData(prevForm => (
      { ...prevForm, [name]: value }
    ));
  }

  /** Form control for file changes changes */
  function handleFileChange(evt) {
    setFile(evt.target.files[0])
  }

  /** Signup for Friender */
  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    try {
      await signup(formData);
    } catch(err) {
      setAlerts(err);
    }

    if (file !==undefined) {
      const imageForm = new FormData();
        imageForm.append('image', file)
        addImage(imageForm, formData.username);
    }
  }

  return (
    <div className="position absolute top-16 w-full flex justify-center">
      <form className="flex flex-col justify-between items-center mx-auto mt-12 py-4 mb-8 w-96 min-h-full border-0 border-base-200 rounded-xl shadow-2xl" onSubmit={handleSubmit}>
      <div className="w-full text-center">
        <h2 className="text-2xl font-bold text-secondary">Signup</h2>
        <h3 className="text-md font-light text-accent italic">Start making friends!</h3>
        <a className="link link-neutral text-sm" onClick={loginDemoUser}>Login with demo account</a>
      </div>
      <div className="w-full my-6">
        <div className="w-100 mb-3">
          <div className="w-100 px-4 mb-0.5 flex justify-between align-middle">
            <label htmlFor="username" className="font-semilight">Username:</label>
            <small className="font-extralight italic text-base-400 leading-6">What should we call you?</small>
          </div>
          <input type="text" onChange={handleChange}
            name="username"
            value={formData.username}
            maxLength={15}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
        </div>
        <div className="w-100 mb-3">
          <div className="w-100 px-4 mb-0.5 flex justify-between align-middle">
            <label htmlFor="username" className="font-semilight">Password:</label>
            <small className="font-extralight italic text-base-400 leading-6">Something secure!</small>
          </div>
          <input type="password" onChange={handleChange}
            name="password"
            value={formData.password}
            minLength={5}
            maxLength={50}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
        </div>
        <div className="w-100 mb-3">
          <div className="w-100 px-4 mb-0.5 flex justify-between align-middle">
            <label htmlFor="username" className="font-semilight">Hobbies:</label>
            <small className="font-extralight italic text-base-400 leading-6">What do you like to do?</small>
          </div>
          <textarea onChange={handleChange}
            name="hobbies"
            value={formData.hobbies}
            minLength={10}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 resize-none active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
        </div>
        <div className="w-100 mb-3">
          <div className="w-100 px-4 mb-0.5 flex justify-between align-middle">
            <label htmlFor="username" className="font-semilight">Interests:</label>
            <small className="font-extralight italic text-base-400 leading-6">What are you into?</small>
          </div>
          <textarea onChange={handleChange}
            name="interests"
            value={formData.interests}
            minLength={10}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 resize-none active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
        </div>
        <div className="w-100 mb-3">
          <div className="w-100 px-4 mb-0.5 flex justify-between align-middle">
            <label htmlFor="username" className="font-semilight">Location:</label>
            <small className="font-extralight italic text-base-400 leading-6">Where are you?</small>
          </div>
          <input type="number" onChange={handleChange}
            name="location"
            value={formData.location}
            min={10000}
            max={99999}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
        </div>
        <div className="w-100 mb-3">
          <div className="w-100 px-4 mb-0.5 flex justify-between align-middle">
            <label htmlFor="username" className="font-semilight">Radius:</label>
            <small className="font-extralight italic text-base-400 leading-6">How far do you want to search for friends?</small>
          </div>
          <input type="number" onChange={handleChange}
            name="radius"
            value={formData.radius}
            min={1}
            max={100}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
        </div>
      </div>
      <div className="w-100 mb-3">
          <div className="w-100 px-4 mb-0.5 flex justify-between align-middle">
            <label htmlFor="profile-pic" className="font-semilight">Profile Pic:</label>
            <small className="font-extralight italic text-base-400 leading-6">New haircut? Show it off.</small>
          </div>
          <div className="w-11/12 mx-4 px-1 py-0.5 font-extralight">
            <input type='file' onChange={handleFileChange}
              name='image'
              id="profile-pic"
              accept=".jpg,.png,.jpeg"
              className=" file-input file-input-bordered file-input-accent w-full font-extralight text-gray-600"
              />
          </div>
        </div>
        <div className="px-1 my-4">
          {alerts.length > 0 && <Alert alert={alerts} />}
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>

    </div>
  );
}

export default SignupForm;