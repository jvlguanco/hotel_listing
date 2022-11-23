import './login.scss'
import { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
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
            if(res.data.isAdmin){
                dispatch({type: 'LOGIN_SUCCESS', payload: res.data.details});
                navigate('/');
            }else{
                dispatch({type: 'LOGIN_FAIL', payload: {message: "You are not an admin"}});
            }
        }catch(err){
            dispatch({type: 'LOGIN_FAIL', payload: err.response.data});
        }
    };

    return (
        <div className="login">
            <div className="lContainer">
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput" />
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput" />
                <button onClick={handleClick} className="lButton">Login</button>
                <button onClick={()=>{window.location.replace('http://localhost:3000/');}} className="lButton">Back To Client</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login