import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import FriendList from "./FriendList";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { UserInterface } from "./interfaces";


interface RoutesListInterface {
  user: UserInterface | null;
  signup: ({ }) => void;
  login: ({ }) => void;
  update: ({ }) => void;
}

function RoutesList({ user, signup, login, update }: RoutesListInterface) {

  return (
    <Routes>
      {user ?
        <>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" />
          <Route path="/people" element={<FriendList user={user} />} />
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
