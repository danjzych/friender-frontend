import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../common/Alert";
import { UserInterface, UpdateInterface } from "../../types/interfaces";

interface ProfileFormProps {
  user: UserInterface;
  update: (formData: UpdateInterface) => void;
  addImage: (formData: any, username?: string) => void;
}

function ProfileForm({ user, update, addImage }: ProfileFormProps) {
  const initialFormData = {

    hobbies: user.hobbies,
    interests: user.interests,
    location: user.location,
    radius: user.radius
  };

  const [formData, setFormData] = useState(initialFormData);
  const [file, setFile] = useState();
  const [ alerts, setAlerts ] = useState([]);

  const navigate = useNavigate();

  function handleChange(evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void{
    const { name, value } = evt.target;
    setFormData(prevForm => ({ ...prevForm, [name]: value }));
  }

  function handleFileChange(evt) {
      setFile(evt.target.files[0])
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    try {
      await update(formData);
      navigate("/profile");
    } catch(err) {
      setAlerts(err);
    }

    if (file !== undefined) {
      const imageForm = new FormData();
        imageForm.append('image', file)
        addImage(imageForm);
    }
  }

  return (
    <div className="position absolute top-16 w-full flex justify-center">
      <form className="flex flex-col justify-between items-center mx-auto mt-12 py-4 w-96 min-h-full border-0 border-base-200 rounded-xl shadow-2xl" onSubmit={handleSubmit}>
      <div className="w-full text-center">
        <h2 className="text-2xl font-bold text-secondary">Edit Profile</h2>
        <h3 className="text-md font-light text-accent italic">Let everyone know what you've been up to.</h3>
      </div>
      <div className="w-full my-6">
        <div className="w-100 mb-3">
          <div className="w-100 px-4 mb-0.5 flex justify-between align-middle">
            <label htmlFor="hobbies" className="font-semilight">Hobbies:</label>
            <small className="font-extralight italic text-base-400 leading-6">What do you like to do?</small>
          </div>
          <textarea onChange={handleChange}
            name="hobbies"
            id="hobbies"
            value={formData.hobbies}
            minLength={10}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 resize-none active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
        </div>
        <div className="w-100 mb-3">
          <div className="w-100 px-4 mb-0.5 flex justify-between align-middle">
            <label htmlFor="interests" className="font-semilight">Interests:</label>
            <small className="font-extralight italic text-base-400 leading-6">What are you into?</small>
          </div>
          <textarea onChange={handleChange}
            name="interests"
            id="interests"
            value={formData.interests}
            minLength={10}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 resize-none active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
        </div>
        <div className="w-100 mb-3">
          <div className="w-100 px-4 mb-0.5 flex justify-between align-middle">
            <label htmlFor="location" className="font-semilight">Location:</label>
            <small className="font-extralight italic text-base-400 leading-6">Where are you?</small>
          </div>
          <input type="number" onChange={handleChange}
            name="location"
            id="location"
            value={formData.location}
            min={10000}
            max={99999}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
        </div>
        <div className="w-100 mb-3">
          <div className="w-100 px-4 mb-0.5 flex justify-between align-middle">
            <label htmlFor="radius" className="font-semilight">Radius:</label>
            <small className="font-extralight italic text-base-400 leading-6">How far do you want to search for friends?</small>
          </div>
          <input type="number" onChange={handleChange}
            name="radius"
            id="radius"
            value={formData.radius}
            min={1}
            max={100}
            required
            className="border-2 border-base-300 rounded-md bg-gray-50 w-11/12 mx-4 px-1 py-0.5 font-extralight text-gray-600 active:border-blue-500 placeholder:italic placeholder:text-gray-500"
          />
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
      </div>
          {alerts.length > 0 &&
            <div className="px-1 my-4">
              <Alert alert={alerts} />
            </div>}
        <button className="btn btn-primary" type="submit">Save Edits</button>
      </form>
    </div>
  );
}


export default ProfileForm;