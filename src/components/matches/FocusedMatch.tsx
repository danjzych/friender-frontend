import MatchChat from "./MatchChat";
import MatchCard from "./MatchCard";

function FocusedMatch({ match }) {

    return <>
            <MatchChat match={match} />
            {match && <MatchCard match={match} />}
        </>
}

export default FocusedMatch