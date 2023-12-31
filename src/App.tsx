import { useState, useEffect } from "react";
import userContext from "./contexts/userContext";
import { BrowserRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import FrienderAPI from './api';
import { UserInterface, SignupInterface, LoginInterface, UpdateInterface, MatchInterface } from './types/interfaces';
import RoutesList from "./routes/RoutesList";
import Navbar from './components/common/Navbar';
import IsLoading from './components/common/IsLoading';

/**
 * Top-level component of Friender. Manages auth, user information, and potential friends.
 *
 * Props: None
 *
 * State: user, token, isLoaded, nearbyUsers, isUsersLoaded
 *
 * Context: userContext
 *
 * App -> Navbar, RoutesList
 */
function App() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoaded, setIsLoaded] = useState(false);
  const [nearbyUsers, setNearbyUsers] = useState<MatchInterface[] | null>(null);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);

  /** Updates user when token changes */
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

  /** Reloads potential friends if user changes */
  useEffect(() => {
    async function getNearbyUsers() {
      setIsUsersLoaded(false);
      const eligibleUsers = await FrienderAPI.getNearMe(user.username);
      setNearbyUsers(eligibleUsers);
      setIsUsersLoaded(true);
    };

    if (user) getNearbyUsers();
  }, [user])

  /** Update token in local storage and state */
  function updateToken(token: string | null) {
    setToken(token);
    (token) ?
      localStorage.setItem("token", token) :
      localStorage.removeItem("token");
  }

  /** Signup a new user */
  async function signup(formData: SignupInterface) {
    const response = await FrienderAPI.signupUser(formData);
    updateToken(response.token);
  }

  /** Login existing user */
  async function login(formData: LoginInterface) {
    const response = await FrienderAPI.loginUser(formData);
    updateToken(response.token);
  }

  /** Login in demo user with pre-seeded account. For demos only */
  function loginDemoUser() {
    login({username: "test_user1", password: "password"})
  }

  /** Logout user */
  async function logout(){
    setUser(null);
    setNearbyUsers(null);
    updateToken(null);
  }

  /** Update user profile */
  async function update(formData: UpdateInterface) {
    console.log(user.username)
    const newUser = await FrienderAPI.updateUser(formData, user.username);
    setUser(newUser);
  }

  /** Add image to user profile */
  async function addImage(formData, username:string = user.username) {
    const newUser = await FrienderAPI.addProfileImage(formData, username);
    setUser(newUser);
  }

  /** Add rating from logged-in user to nearby user */
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
