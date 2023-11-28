import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../contexts/userContext";
import Homepage from "../components/common/Homepage";
import FriendList from "../components/friends/FriendList";
import SignupForm from "../components/forms/SignupForm";
import LoginForm from "../components/forms/LoginForm";
import Profile from "../components/Profile";
import ProfileForm from "../components/forms/ProfileForm";
import MatchesContainer from "../components/matches/MatchesContainer";
import { MatchInterface } from "../types/interfaces";


interface RoutesListInterface {
  signup: ({ }) => void;
  login: ({ }) => void;
  update: ({ }) => void;
  addImage: (formData: any, username?: string) => void;
  isUsersLoaded: Boolean;
  nearbyUsers: MatchInterface[];
  rateUser: (rater:string, rated:string, isLiked:string)=> Promise<void>;
}

function RoutesList({signup, login, update, addImage, isUsersLoaded, nearbyUsers, rateUser }: RoutesListInterface) {
  const { user } = useContext(userContext);

  return (
    <Routes>
      {user ?
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile /> } />
          <Route path="/profile/edit" element={<ProfileForm user={user} update={update} addImage={addImage} />} />
          <Route path="/people" element={<FriendList nearbyUsers={nearbyUsers} isUsersLoaded={isUsersLoaded} rateUser={rateUser} />} />
          <Route path='/matches' element={<MatchesContainer />} />
        </>
        :
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignupForm signup={signup} addImage={addImage} />} />
          <Route path="/login" element={<LoginForm login={login} />} />
        </>
      }
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
