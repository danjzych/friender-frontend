import FriendCard from "./FriendCard";
import IsLoading from "../common/IsLoading";

function FriendList({ nearbyUsers, isUsersLoaded, rateUser }) {

  if (nearbyUsers !== null && nearbyUsers.length === 0){
    return (
      <div className="absolute flex justify-center items-center h-screen w-screen bg-inherit">
        <p>You have run out of people to rate =(</p>
      </div>
    )
  }

  return (
    <div className="absolute flex justify-center items-center h-screen w-screen bg-inherit">
      {isUsersLoaded ?
          <FriendCard key={`${nearbyUsers[0].username}-FriendCard`} friend={nearbyUsers[0]} rateUser={rateUser} />
      :
      <IsLoading />
      }
    </div>
  );
}


export default FriendList;