import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import userContext from "../../contexts/userContext";
import './Navbar.css'

function Navbar({ logout }) {
    const { user } = useContext(userContext);


    // return(<nav className='flex justify-between px-3 py-1 border-b-2' >
    return(<nav className="navbar fixed border-b-2 border-b-neutral-600 bg-gradient-to-r from-cyan-500 to-blue-500 z-50" >
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
            <Link to="/"><h1 className='text-4xl navbar-center font-extrabold text-primary'>Friender</h1></Link>
            <div className="navbar-end">
                <NavLink to="/people" className="px-2">Find Friends</NavLink>
                <NavLink to="/matches" className="px-2">Matches</NavLink>
            </div>
            </>
            }
    </nav>)
}

export default Navbar;