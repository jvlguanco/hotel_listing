import './login.css'
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../components/context/AuthContext'
import axios from 'axios'

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const {loading , error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev)=>({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({type: 'LOGIN_START'});
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({type: 'LOGIN_SUCCESS', payload: res.data.details});
            navigate('/');
        }catch(err){
            dispatch({type: 'LOGIN_FAIL', payload: err.response.data});
        }
    };

    return (
        <div className="login">
            <div className="lContainer">
                <h1>Login</h1>
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
                <button onClick={handleClick} className="lButton">Login</button>
                <button onClick={()=>{navigate('/register')}} className="lButton">Register</button>
                <button onClick={()=>{navigate('/')}} className="lButton">Home</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login