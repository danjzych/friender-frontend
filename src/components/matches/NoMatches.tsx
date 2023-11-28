import { Link } from "react-router-dom";

/**
 * View for when a user visits Matches section but has no matches.
 *
 * MatchContainer -> NoMatches -> None
 */
function NoMatches() {
    return (<div className="col-span-4 text-center">
        <p className="pt-36 text-lg font-semibold">
            Looks like you don't have any matches yet!
        </p>
        <p className=" py-4 text-md">
            Go explore friends in your area, or come back soon to see who you've matched with!
        </p>
        <button className="btn btn-secondary shadow-2xl">
            <Link to="/people">
                Find Friends
            </Link>
        </button>
    </div>)
}

export default NoMatches;