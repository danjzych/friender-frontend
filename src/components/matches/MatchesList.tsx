import { useState, useEffect, useContext } from 'react';
import userContext from '../../contexts/userContext';
import { UserInterface } from '../../types/interfaces';
import FrienderAPI from '../../api';
import MatchCard from './MatchCard';
import IsLoading from '../common/IsLoading';

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
        {matches ? matches.map(m => <MatchCard match={m} key={m.username}/>) : <IsLoading />}
    </div>)
}
export default MatchesList