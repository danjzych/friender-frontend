import './MatchCard.css'
import {Link} from "react-router-dom";
import FriendCard from "../friends/FriendCard";
function MatchCard( {user, match} ){

  const {username, hobbies, interests, image_urls} = match;

  return (
    <>
      <FriendCard user={match} />
      <Link to={`/messages/${match.username}`}><button className="MatchCard-button">View Messages</button></Link>
    </>
  )
}





export default MatchCard;