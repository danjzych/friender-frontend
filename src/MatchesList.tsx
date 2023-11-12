import { useState, useEffect, useContext } from 'react';
import userContext from './contexts/userContext';
import { UserInterface } from './interfaces';
import FrienderAPI from './api';
import MatchCard from './MatchCard';
import IsLoading from './IsLoading';

function MatchesList() {
    const [matches, setMatches] = useState<UserInterface[]>(null)
    const { user } = useContext(userContext);

    useEffect(function getMatches() {
        async function fetchMatches() {
            const matches = await FrienderAPI.getMatches(user.username);
            setMatches(matches);
          }
          fetchMatches();
    }, [])

    return(<div>
        <h2>Matches:</h2>
        {matches ? matches.map(m => <MatchCard user={user}  match={m} key={m.username}/>) : <IsLoading />}
    </div>)
}
export default MatchesList