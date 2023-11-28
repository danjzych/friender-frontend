import { useState, useEffect, useContext } from 'react';
import userContext from '../../contexts/userContext';
import { MatchInterface } from '../../types/interfaces';
import MatchesList from './MatchesList';
import FocusedMatch from './FocusedMatch';
import FrienderAPI from '../../api';
import NoMatches from './NoMatches';

/**
 * Container component at top of "Matches" feature. Contains inner navbar for matches,
 * chat field for matches, and small cards presenting details about selected matches.
 *
 * Props: None
 *
 * State: matches, selectedMatch, matchesLoaded
 *
 * Context: User
 *
 * RoutesList -> MatchesContainer -> MatchesList, FocusedMatch, NoMatches
 */
function MatchesContainer() {
    const [matches, setMatches] = useState<MatchInterface[]>(null);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [matchesLoad, setMatchesLoaded] = useState(false);

    const { user } = useContext(userContext);

    /** Get matches for logged in user on component mount */
    useEffect(function getMatches() {
        async function fetchMatches() {
            const matches = await FrienderAPI.getMatches(user.username);
            setMatches(matches);
            setMatchesLoaded(true);

            if (matches.length > 0) setSelectedMatch(0);
          }
          fetchMatches();
    }, [])

    return(<div className="position absolute top-16 w-screen h-[calc(100vh_-_4rem)] grid grid-cols-5">
        {matchesLoad && <MatchesList matches={matches} setSelectedMatch={setSelectedMatch} selectedMatch={selectedMatch}/>}
        {matchesLoad && selectedMatch !== null && <FocusedMatch match={matches[selectedMatch]} />}
        {matchesLoad && selectedMatch === null && <NoMatches />}
    </div>)
}
export default MatchesContainer;