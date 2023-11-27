import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { UserInterface, UpdateInterface } from "../../types/interfaces";

interface ProfileFormProps {
  user: UserInterface;
  handleSubmit: (formData: UpdateInterface) => void;
}

function ProfileForm({ user, handleSubmit }: ProfileFormProps) {
  const initialFormData = {

    hobbies: user.hobbies,
    interests: user.interests,
    location: user.location,
    radius: user.radius
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();


  function handleChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void{
    const { name, value } = evt.target;
    setFormData(prevForm => ({ ...prevForm, [name]: value }));
  }

  function submitForm(evt: React.FormEvent) {
    evt.preventDefault();
    handleSubmit(formData);
    navigate("/profile");
  }

  return (
    <div className="position absolute top-16 w-full flex justify-center">
      <form className="flex flex-col justify-between items-center mx-auto mt-12 py-4 w-96 min-h-full border-0 border-base-200 rounded-xl shadow-2xl" onSubmit={submitForm}>
      <div className="w-full text-center">
        <h2 className="text-2xl font-bold text-secondary">Edit Profile</h2>
        <h3 className="text-md font-light text-accent italic">Let everyone know what you've been up to.</h3>
      </div>
      <div className="w-full my-6">
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
        <button className="btn btn-primary" type="submit">Save Edits</button>
      </form>
    </div>
  );
}


export default ProfileForm;