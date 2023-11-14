// import './FriendCard.css';

function FriendCard( {user} ){
    const {username, hobbies, interests, image_urls, distance} = user;

    const profilePic = image_urls[image_urls.length - 1] || './default-profile-pic.jpg'

    return (
        <div className="FriendCard">
            <img src={profilePic} width='200px'/>
            <h2>{username}</h2>
            <p>Hobbies are: {hobbies}</p>
            <p>Interests include: {interests}</p>
            {distance !== undefined && <p>{distance} miles away</p>}
        </div>
    )
}


export default FriendCard;