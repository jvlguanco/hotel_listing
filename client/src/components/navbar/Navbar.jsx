import './navbar.css'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem('user');
        window.location.reload()
        navigate('/');
    }

    return (
        <div className='navbar'>
            <div className='navContainer'>
                <Link to='/' style={{color:'inherit', textDecoration:'none'}}>
                <span className='logo'>Hotel Listing</span>
                </Link>
                {!user ? (
                    <div className="navItems">
                        <button onClick={() => { navigate('/register')}} className="navButton">Register</button>
                        <button onClick={() => { navigate('/login')}} className="navButton">Login</button>
                    </div>
                ) : (
                <div className="navItems">
                    <button onClick={()=>{
                        window.location.replace('http://localhost:3001/');
                    }} className="navButton">Admin</button>
                    <button onClick={handleLogout} className="navButton">Logout</button>
                </div>)}
            </div>
        </div>
    )
}

export default Navbar