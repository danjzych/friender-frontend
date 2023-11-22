import { useState, useEffect, useContext } from 'react';
import userContext from '../../contexts/userContext';
import { MatchInterface } from '../../types/interfaces';
import MatchesList from './MatchesList';
import FocusedMatch from './FocusedMatch';
import FrienderAPI from '../../api';

function MatchesContainer() {
    const [matches, setMatches] = useState<MatchInterface[]>(null);
    const [ selectedMatch, setSelectedMatch ] = useState(0);
    const [matchesLoad, setMatchesLoaded] = useState(false);

    const { user } = useContext(userContext);

    useEffect(function getMatches() {
        async function fetchMatches() {
            const matches = await FrienderAPI.getMatches(user.username);
            setMatches(matches);
            setMatchesLoaded(true);
          }
          fetchMatches();
    }, [])

    return(<div className="position absolute top-16 w-screen h-[calc(100vh_-_4rem)] grid grid-cols-5">
        {matchesLoad && <MatchesList matches={matches} setSelectedMatch={setSelectedMatch} selectedMatch={selectedMatch}/>}
        {matchesLoad && <FocusedMatch match={matches[selectedMatch]} />}

    </div>)
}
export default MatchesContainer;