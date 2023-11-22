import { MatchInterface } from "../../types/interfaces";

interface MatchCardProps {
  match: MatchInterface;
}

function MatchCard( { match }: MatchCardProps ) {
  const { username, hobbies, interests, image_urls, location } = match;

  return (<div className="col-span-1 border-l-2">
    <figure className="h-1/3">
      <img src={image_urls[0]} className="w-full h-full object-cover" loading="lazy" />
    </figure>
    <div className="p-2">
      <h2 className="text-2xl pb-0">{username}</h2>
      <small className="font-extralight italic text-base-300 text-sm py-0">Location: {location} </small>
      <div className="py-4">
        <p>interests: {interests}</p>
        <p>hobbies: {hobbies}</p>
      </div>
    </div>
  </div>)
}





export default MatchCard;