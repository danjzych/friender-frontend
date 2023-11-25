import { Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import userContext from "../../contexts/userContext";
import RatingForm from "../forms/RatingForm";
import { MatchInterface } from "../../types/interfaces";

interface FriendCardProps {
    friend: MatchInterface;
    rateUser?: (rater:string, rated:string, isLiked:string) => Promise<void>;
}

function FriendCard({ friend, rateUser }: FriendCardProps){
    const { username, hobbies, interests, image_urls, distance } = friend;
    const { user } = useContext(userContext)

    const profilePic = image_urls[image_urls.length - 1] || './default-profile-pic.png'

    return (
    <Transition
    as={Fragment}
    show={true}
    appear={true}
    enter="transform transition duration-[400ms]"
    enterFrom="opacity-0 rotate-[-40deg] scale-50"
    enterTo="opacity-100 rotate-0 scale-100"
    leave="transform duration-[400ms] transition ease-in-out"
    leaveFrom="opacity-100 rotate-0 scale-100 "
    leaveTo="opacity-0 scale-95 rotate-[70deg]"
    >
        <div className="card w-2/5 2xl:w-3/5 2xl:max-w-4xl bg-base-100 border-0 border-base-200 rounded-xl shadow-2xl">
            <figure className="py-4 bg-primary border-b border-base-200 shadow-sm">
                <img src={profilePic} className="rounded-xl max-h-72 2xl:max-h-96" loading="lazy" />
            </figure>
            <div className="card-body text-center">
                <div className="flex justify-between items-center">
                <h2 className="card-title">{username}</h2>
                {distance !== undefined && <small className="font-extralight italic text-base-300">{distance} miles away</small>}
                </div>
                <p>Hobbies are: {hobbies}</p>
                <p>Interests include: {interests}</p>
                <div className="card-actions justify-evenly">
                <RatingForm
                    key={`${username}-RatingForm`}
                    rater={user.username}
                    rated={username}
                    handleRating={rateUser} />
                </div>
            </div>
        </div>
    </Transition>
    )
}


export default FriendCard;