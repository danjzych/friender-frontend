import { Link } from "react-router-dom";
import { useContext } from "react";
import userContext from "../contexts/userContext";
import editIcon from "../images/icons/edit.svg"

/**
 * Disaplys user profile.
 *
 * Props: None
 *
 * State: None
 *
 * Context: User Context
 *
 * App -> RoutesList -> Profile -> None
 */
function Profile() {
    const { user } = useContext(userContext);

    return <div className="absolute flex justify-center items-center h-screen w-screen bg-inherit">
        <div className="card w-2/5 2xl:w-3/5 2xl:max-w-4xl bg-base-100 border-0 border-base-200 rounded-xl shadow-2xl">
            <figure className="position relative py-4 bg-primary border-b border-base-200 shadow-sm">
                <img src={user.image_urls[user.image_urls.length - 1]} className="rounded-xl max-h-72 2xl:max-h-96" loading="lazy" />
                <Link to="/profile/edit" className="position absolute top-0 right-0 p-2 hover:opacity-50 active:scale-90">
                    <img src={editIcon} className="w-6 h-6 fill-white" />
                </Link>
            </figure>
            <div className="card-body text-center">
                <div className="flex justify-between items-center">
                <h2 className="card-title">{user.username}</h2>
                </div>
                <p>Hobbies are: {user.hobbies}</p>
                <p>Interests include: {user.interests}</p>
            </div>
        </div>
        </div>
}


export default Profile;

