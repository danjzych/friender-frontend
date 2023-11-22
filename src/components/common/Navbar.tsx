import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import userContext from "../../contexts/userContext";

function Navbar({ logout }) {
    const { user } = useContext(userContext);

    const navLinkClass = "px-2 hover:opacity-80";


    return(<nav className="navbar fixed text-base-100 border-b-2 border-b-neutral-600 bg-gradient-to-r from-cyan-500 to-blue-500 z-50" >
            {!user && <>
            <Link to="/" className="navbar-start"><h1 className="px-2 text-4xl font-extrabold text-primary">Friender</h1></Link>
            <div className="navbar-end">
                <NavLink to='/login' className={navLinkClass}>Login</NavLink>
                <NavLink to='/signup' className={navLinkClass}>Signup</NavLink>
            </div>
            </>}
            {user &&
            <>
            <div className="navbar-start">
                <NavLink to='/profile' className={navLinkClass}>Profile</NavLink>
                <button onClick={logout} className={navLinkClass}>Logout</button>
            </div>
            <Link to="/"><h1 className='text-4xl navbar-center font-extrabold text-primary'>Friender</h1></Link>
            <div className="navbar-end">
                <NavLink to="/people" className={navLinkClass}>Find Friends</NavLink>
                <NavLink to="/matches" className={navLinkClass}>Matches</NavLink>
            </div>
            </>
            }
    </nav>)
}

export default Navbar;