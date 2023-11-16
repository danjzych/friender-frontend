import { Link } from "react-router-dom"
import { useContext } from "react";
import userContext from "../contexts/userContext";
import FriendCard from "./friends/FriendCard";


function Profile() {
    const { user } = useContext(userContext);

    return (
        <div className="position absolute top-16 w-full flex justify-center">
            <FriendCard friend={user} />
            <Link to="/profile/edit" ><button >Edit Profile</button></Link>
            {/* <Link to='/profile/add-image'><button>Add Image</button></Link> */}
        </div>
    )
}


export default Profile;

