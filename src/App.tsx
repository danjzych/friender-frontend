import './App.css';
import { useState, useEffect } from "react";
import userContext from "./userContext";
import {BrowserRouter} from "react-router-dom";
import jwt_decode from "jwt-decode";
import FrienderAPI from './api';
import { UserInterface, SignupInterface, LoginInterface, UpdateInterface } from './interfaces';
import RoutesList from "./RoutesList";
import Navbar from './Navbar';
import IsLoading from './IsLoading';


function App() {


  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoaded, setIsLoaded] = useState(false);

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


  useEffect(function getUserData(){
    async function fetchUserData(){
      if (token){
        try {
          FrienderAPI.token = token;
          const decoded: {username: string}  = jwt_decode(token);
          const userData: UserInterface = await FrienderAPI.getUserInfo(decoded.username);
          setUser(userData);
        } catch(err) {
          console.log()
        }
      }
      setIsLoaded(true);
    }
    fetchUserData();
  }, [token])


  return (
    <div className="App">
      {isLoaded ?
        <userContext.Provider value={{ user, token }}>
          <BrowserRouter>
            <Navbar logout={logout} user={user}/>
            <RoutesList user={user} signup={signup} login={login} update={update} addImage={addImage}/>
          </BrowserRouter>
        </userContext.Provider>
        :
        <IsLoading />
      }
    </div>
  );
}

export default App;
