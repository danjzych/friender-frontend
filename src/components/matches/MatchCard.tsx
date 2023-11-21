import { MatchInterface } from "../../types/interfaces";

interface MatchCardProps {
  match: MatchInterface;
}

function MatchCard( { match }: MatchCardProps ) {
  const {username, hobbies, interests, image_urls} = match;

  return (<div className="col-span-1 border-r-2">
    <figure className="h-1/5">
      <img src={image_urls[0]} className="object-cover" loading="lazy" />
    </figure>
  </div>)
}





export default MatchCard;