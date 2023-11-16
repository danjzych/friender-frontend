import { Link } from "react-router-dom";
import silhouettes from "../../images/silhouettes.jpg";

function Homepage() {
    return (<div className="absolute hero min-h-screen" style={{backgroundImage: `url(${silhouettes})`}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Welcome to <span className="text-primary font-extrabold">Friender</span></h1>
      <p className="mb-5">Use Friender to find friends in your area today. Everyone needs a friend - whose will you be today?</p>
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
    </div>
  </div>
    </div>)
}

export default Homepage