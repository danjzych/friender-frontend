import { Link } from "react-router-dom";
import { useContext } from "react";
import userContext from "../../contexts/userContext";
import silhouettes from "../../images/silhouettes.jpg";

function Homepage() {
    const { user } = useContext(userContext);

    const loggedOutInner = <>
                <h1 className="mb-5 text-5xl font-bold">Welcome to <span className="text-primary font-extrabold">Friender</span></h1>
                <div className="mb-5">
                    <p className="mb-1">
                        Use Friender to find friends in your area today.
                    </p>
                    <p className="mb-1">
                        You can see like-minded people in your area, and decide whether or not you want to be friends.
                        If you both want to be friends, it's a <span className="text-accent font-medium">match</span>!
                    </p>
                    <p className="mb-1">
                        Everyone needs a friend - whose will you be today?
                    </p>
                </div>
                <div>
                    <button className="btn btn-secondary mr-6">
                        <Link to="/login">
                            Login
                        </Link>
                    </button>
                    <button className="btn btn-secondary">
                        <Link to="/signup">
                            Signup
                        </Link>
                    </button>
                </div>
      </>

    const loggedInInner = <>
                <h1 className="mb-5 text-5xl font-bold">
                    Welcome, <span className="text-primary font-extrabold">{user?.username}</span>!
                </h1>
                <p className="mb-5">
                    Time to build some friendships! <span className="text-accent font-medium">Find friends</span> to
                    meet new people in your area, or message your <span className="text-accent font-medium">matches</span> to
                    grow the friendships you've already made.
                </p>
                <div>
                    <button className="btn btn-secondary mr-6">
                        <Link to="/people">
                            Find Friends
                        </Link>
                    </button>
                    <button className="btn btn-secondary">
                        <Link to="/matches">
                            Matches
                        </Link>
                    </button>
                </div>
    </>

    return (<div className="hero min-h-screen" style={{backgroundImage: `url(${silhouettes})`}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
                {user ? loggedInInner : loggedOutInner}
            </div>
        </div>
    </div>)
}

export default Homepage