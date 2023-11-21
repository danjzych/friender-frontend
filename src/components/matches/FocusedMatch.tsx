import MatchCard from "./MatchCard"

function FocusedMatch({ match }) {

    return <>
        <MatchCard match={match} />
        <div className="col-span-3  grid grid-rows-5">
            <div className="row-span-1 border-b-2 border-base-400">
                {match.username}
            </div>
        </div>
        </>

    return <div>
        <MatchCard match={match} />
    </div>
}

export default FocusedMatch