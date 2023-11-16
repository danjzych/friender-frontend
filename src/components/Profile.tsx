import { Link } from "react-router-dom"
import { useContext } from "react";
import userContext from "../contexts/userContext";
import FriendCard from "./friends/FriendCard";


function Profile() {
    const { user } = useContext(userContext);

    return (
        <div className="Profile">
            {/* <FriendCard friend={user} /> */}
            <Link to="/profile/edit" ><button >Edit Profile</button></Link>
            <Link to='/profile/add-image'><button>Add Image</button></Link>
        </div>
    )
}


export default Profile;

