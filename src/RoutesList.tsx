import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "./contexts/userContext";
import Homepage from "./components/common/Homepage";
import FriendList from "./FriendList";
import SignupForm from "./SignupForm";
import LoginForm from "./components/forms/LoginForm";
import Profile from "./Profile";
import ProfileForm from "./ProfileForm";
import ProfileImageform from "./ProfileImageForm";
import MatchesList from "./MatchesList";
import MessageLog from "./MessageLog";


interface RoutesListInterface {
  signup: ({ }) => void;
  login: ({ }) => void;
  update: ({ }) => void;
  addImage: ({ })=> void;
}

function RoutesList({signup, login, update, addImage }: RoutesListInterface) {
  const { user } = useContext(userContext);

  return (
    <Routes>
      {user ?
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile /> } />
          <Route path="/profile/edit" element={<ProfileForm user={user} handleSubmit={update} />} />
          <Route path='/profile/add-image' element={<ProfileImageform handleSubmit={addImage}/>} />
          <Route path="/people" element={<FriendList />} />
          <Route path='/matches' element={<MatchesList />} />
          <Route path='/messages/:matchName' element={<MessageLog />} />
        </>
        :
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignupForm handleSubmit={signup} />} />
          <Route path="/login" element={<LoginForm handleSubmit={login} />} />
        </>
      }
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
