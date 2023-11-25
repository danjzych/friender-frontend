import FriendCard from "./FriendCard";
import IsLoading from "../common/IsLoading";
import NoFriends from "./NoFriends";

function FriendList({ nearbyUsers, isUsersLoaded, rateUser }) {

  if (nearbyUsers !== null && nearbyUsers.length === 0){
    return <NoFriends />
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