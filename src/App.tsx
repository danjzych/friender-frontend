import './App.css';
import { useState, useEffect } from "react";
import userContext from "./contexts/userContext";
import {BrowserRouter} from "react-router-dom";
import jwt_decode from "jwt-decode";
import FrienderAPI from './api';
import { UserInterface, SignupInterface, LoginInterface, UpdateInterface, MatchInterface } from './types/interfaces';
import RoutesList from "./routes/RoutesList";
import Navbar from './components/common/Navbar';
import IsLoading from './components/common/IsLoading';


function App() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [users, setUsers] = useState<MatchInterface[] | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(function getUserData(){
    async function fetchUserData(){
      if (token){
        try {
          FrienderAPI.token = token;
          const decoded: {username: string}  = jwt_decode(token);
          const userData: UserInterface = await FrienderAPI.getUserInfo(decoded.username);
          setUser(userData);

          const eligibleUsers = await FrienderAPI.getNearMe(userData.username);
          setUsers(eligibleUsers);
        } catch(err) {
          console.log()
        }
      }
      setIsLoaded(true);
    }
    fetchUserData();
  }, [token]);

  function updateToken(token: string | null) {
    setToken(token);
    (token) ?
      localStorage.setItem("token", token) :
      localStorage.removeItem("token");
  }

  async function signup(formData: SignupInterface){
    const token = await FrienderAPI.signupUser(formData);
    updateToken(token);
  }

  async function login(formData: LoginInterface){
    const token = await FrienderAPI.loginUser(formData);
    updateToken(token);
  }

  async function logout(){
    setUser(null);
    updateToken(null);
  }

  async function update(formData: UpdateInterface){
    const newUser = await FrienderAPI.updateUser(formData, user.username);
    setUser(newUser);
  }

  async function addImage(formData) {
    const newUser = await FrienderAPI.addProfileImage(formData, user.username);
    setUser(newUser)
  }

  async function rateUser(rater:string, rated:string, isLiked:string): Promise<void>{
    await FrienderAPI.rateUser(rater, rated, isLiked);
    setUsers(prevUsers => {
      const newUsers = prevUsers.filter(user => user.username !== rated);
      return newUsers;
    })
  }

  return (
    <div className="bg-base-100">
        <userContext.Provider value={{ user }}>
          <BrowserRouter>
            <Navbar logout={logout} />
            {isLoaded ? <RoutesList signup={signup} login={login} update={update} addImage={addImage} isLoaded={isLoaded} users={users} rateUser={rateUser} /> : <IsLoading /> }
          </BrowserRouter>
        </userContext.Provider>
    </div>
  );
}

export default App;
