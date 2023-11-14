import { useState, useEffect, useContext } from "react";
import userContext from "../../contexts/userContext";
import FriendCard from "./FriendCard";
import RatingForm from "../forms/RatingForm";
import IsLoading from "../common/IsLoading";
import FrienderAPI from "../../api";
// import "./FriendList.css";

function FriendList() {
  const [users, setUsers] = useState(null);
  const { user } = useContext(userContext);

  const currUser = users ? users[0] : undefined;


  useEffect(function getUsers() {
    async function fetchUsers() {
      const eligibleUsers = await FrienderAPI.getNearMe(user.username);
      setUsers(eligibleUsers);
    }
    fetchUsers();
  }, [])


  async function rateUser(rater:string, rated:string, isLiked:string){
    await FrienderAPI.rateUser(rater, rated, isLiked);
    setUsers(prevUsers => {
      const newUsers = prevUsers.filter(user => user.username !== rated);
      return newUsers;
    })
  }

  if (users !== null && users.length === 0){
    return (
      <div className="FriendList">
        <p>You have run out of people to rate =(</p>
      </div>
    )
  }

  return (
    <div className="absolute flex justify-center items-center h-screen w-screen bg-inherit">
      {users ?
        <div className="FriendList-container" key={`${currUser.username}-container`} >
          <FriendCard key={`${currUser.username}-FriendCard`} user={currUser} />
          <RatingForm
            key={`${currUser.username}-RatingForm`}
            rater={user.username}
            rated={currUser.username}
            handleRating={rateUser} />
        </div>
      :
      <IsLoading />
      }
      {}
    </div>
  );
}


export default FriendList;