import MatchChat from "./MatchChat";
import MatchCard from "./MatchCard";

function FocusedMatch({ match }) {

    return <>
        <div className="col-span-3 grid grid-rows-6">
            <div className="row-span-1 border-b-2 border-base-300">
                {match.username}
            </div>
            <MatchChat match={match} />
            {/* <div className="row-span-4">

            </div>
            <div className="row-span-1 border-t-2 border-neutral-100">

            </div> */}
        </div>
        <MatchCard match={match} />
        </>
}

export default FocusedMatch