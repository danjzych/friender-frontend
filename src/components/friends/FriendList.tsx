import { Link } from "react-router-dom";
import FriendCard from "./FriendCard";
import IsLoading from "../common/IsLoading";

function FriendList({ nearbyUsers, isUsersLoaded, rateUser }) {

  if (nearbyUsers?.length === 0 && isUsersLoaded){
    return (
      <div className="absolute flex flex-col justify-center items-center h-screen w-screen bg-inherit text-center">
        <p className="text-lg font-semibold">
            Looks like there's no friends to explore right now.
        </p>
        <p className=" py-4 text-md">
            Go check out your matches, or come back soon to see who is in your area!
        </p>
        <small className="pb-4 text-neutral-400">
          Or, for testing purposes, set your <b>location</b> to <em>10000</em> and <b>radius</b> to <em>10</em> to see our seed users.
        </small>
        <button className="btn btn-secondary shadow-2xl">
            <Link to="/matches">
                Matches
            </Link>
        </button>
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