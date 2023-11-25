import { Link } from "react-router-dom";

function NoFriends() {
    return (<div className="absolute flex flex-col justify-center items-center h-screen w-screen bg-inherit px-8">
        <p className="text-md text-center pb-6">Looks like there's no one to match with right now.
        Check out your <span className="text-secondary">matches</span> in the meantime!</p>
        <Link to="/matches" className="btn btn-secondary">Matches</Link>
    </div>)
}

export default NoFriends;