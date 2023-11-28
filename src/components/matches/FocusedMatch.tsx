import MatchChat from "./MatchChat";
import MatchCard from "./MatchCard";

/**
 * Container for components to interact with currently selected match in Matches feature.
 *
 * Props: match
 *
 * State: None
 *
 * Context: None
 *
 * MatchesContainer -> FocusedMatch -> MatchChat, MatchCard
 */
function FocusedMatch({ match }) {

    return <>
            <MatchChat match={match} />
            {match && <MatchCard match={match} />}
        </>
}

export default FocusedMatch