import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import userContext from "../../contexts/userContext";
import './Navbar.css'

function Navbar({ logout }) {
    const { user } = useContext(userContext);


    // return(<nav className='flex justify-between px-3 py-1 border-b-2' >
    return(<nav className="navbar border-b-2 border-b-base-300 bg-base-200" >
            {!user && <>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/signup'>Signup</NavLink>
            <Link to="/"><h1 className="prose">Friender</h1></Link>
            </>}
            {user &&
            <>
            <div className="navbar-start">
                <NavLink to='/profile' className="px-2">Profile</NavLink>
                <button onClick={logout} className="px-2">Logout</button>
            </div>
            <Link to="/"><h1 className='text-3xl navbar-center'>Friender</h1></Link>
            <div className="navbar-end">
                <NavLink to="/people" className="px-2">Find Friends</NavLink>
                <NavLink to="/matches" className="px-2">Matches</NavLink>
            </div>
            </>
            }
    </nav>)
}

export default Navbar;