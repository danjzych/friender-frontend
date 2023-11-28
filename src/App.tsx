import { useState, useEffect } from "react";
import userContext from "./contexts/userContext";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import FrienderAPI from './api';
import { UserInterface, SignupInterface, LoginInterface, UpdateInterface, MatchInterface } from './types/interfaces';
import RoutesList from "./routes/RoutesList";
import Navbar from './components/common/Navbar';
import IsLoading from './components/common/IsLoading';


function App() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [nearbyUsers, setNearbyUsers] = useState<MatchInterface[] | null>(null);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);

  useEffect(function getUserData(){
    async function fetchUserData(){
      if (token) {
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
  }, [token]);

  useEffect(() => {
    async function getNearbyUsers() {
      setIsUsersLoaded(false);
      const eligibleUsers = await FrienderAPI.getNearMe(user.username);
      setNearbyUsers(eligibleUsers);
      setIsUsersLoaded(true);
    };

    if (user) getNearbyUsers();
  }, [user])

  function updateToken(token: string | null) {
    setToken(token);
    (token) ?
      localStorage.setItem("token", token) :
      localStorage.removeItem("token");
  }

  async function signup(formData: SignupInterface) {
    const response = await FrienderAPI.signupUser(formData);
    updateToken(response.token);
  }

  async function login(formData: LoginInterface) {
    const response = await FrienderAPI.loginUser(formData);
    updateToken(response.token);
  }

  function loginDemoUser() {
    login({username: "test_user1", password: "password"})
  }

  async function logout(){
    setUser(null);
    setNearbyUsers(null);
    updateToken(null);
  }

  async function update(formData: UpdateInterface) {
    console.log(user.username)
    const newUser = await FrienderAPI.updateUser(formData, user.username);
    setUser(newUser);
  }

  async function addImage(formData, username:string = user.username) {
    const newUser = await FrienderAPI.addProfileImage(formData, username);
    setUser(newUser);
  }

  async function rateUser(rater:string, rated:string, isLiked:string): Promise<void>{
    const body = {
      "user_who_rated": rater,
      "user_being_rated": rated,
      "is_liked": isLiked
    }
    await FrienderAPI.rateUser(body);
    setNearbyUsers(prevUsers => {
      const newUsers = prevUsers.filter(user => user.username !== rated);
      return newUsers;
    })
  }

  return (
    <div className="bg-base-100">
        <userContext.Provider value={{ user, isLoaded }}>
          <BrowserRouter>
            <Navbar logout={logout} />
            {isLoaded ? <RoutesList signup={signup}
                                    login={login}
                                    loginDemoUser={loginDemoUser}
                                    update={update}
                                    addImage={addImage}
                                    isUsersLoaded={isUsersLoaded}
                                    nearbyUsers={nearbyUsers}
                                    rateUser={rateUser}
                          />
                      : <IsLoading /> }
          </BrowserRouter>
        </userContext.Provider>
    </div>
  );
}

export default App;
