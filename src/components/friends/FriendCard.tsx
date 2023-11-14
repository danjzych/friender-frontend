import { useContext } from "react";
import userContext from "../../contexts/userContext";
import RatingForm from "../forms/RatingForm";
import { MatchInterface } from "../../types/interfaces";

interface FriendCardProps {
    friend: MatchInterface;
    rateUser?: (rater:string, rated:string, isLiked:string) => Promise<void>;
}

function FriendCard({ friend, rateUser}: FriendCardProps){
    const {username, hobbies, interests, image_urls, distance} = friend;
    const { user } = useContext(userContext)

    const profilePic = image_urls[image_urls.length - 1] || './default-profile-pic.jpg'

    return (
        <div className="card w-96 bg-base-100 border-2 border-base-200 rounded-xl shadow-2xl">
            <figure className="pt-4">
                <img src={profilePic} width='200px' className="rounded-xl"/>
            </figure>
            <div className="card-body text-center">
                <h2 className="card-title">{username}</h2>
                <p>Hobbies are: {hobbies}</p>
                <p>Interests include: {interests}</p>
                {distance && <p>{distance} miles away</p>}
                <div className="card-actions">
                <RatingForm
                    key={`${username}-RatingForm`}
                    rater={user.username}
                    rated={username}
                    handleRating={rateUser} />
                </div>
            </div>
        </div>
    )
}


export default FriendCard;