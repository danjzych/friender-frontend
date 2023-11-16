import {useContext } from "react";
import userContext from "../../contexts/userContext";
import FriendCard from "./FriendCard";
import IsLoading from "../common/IsLoading";

function FriendList({ users, isLoaded, rateUser }) {
  const { user } = useContext(userContext);

  const currUser = users ? users[0] : undefined;

  if (users !== null && users.length === 0){
    return (
      <div className="FriendList">
        <p>You have run out of people to rate =(</p>
      </div>
    )
  }

  return (
    <div className="absolute flex justify-center items-center h-screen w-screen bg-inherit">
      {isLoaded ?
          <FriendCard key={`${currUser.username}-FriendCard`} friend={currUser} rateUser={rateUser} />
      :
      <IsLoading />
      }
    </div>
  );
}


export default FriendList;