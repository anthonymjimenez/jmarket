import React, {useState} from 'react'
import { useAuth } from '../context/use-auth';

export default function SignIn() {
    const auth = useAuth()
    const [state, setState] = useState({username: "", pass: ""})

    const handleChange = (e) => {
        setState({...state, [e.target.placeholder]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(auth)
        auth.signin(state)
    }

    // make css
    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "80%"
    }
    return(
        <div>
            <div style={formDivStyle}>
            <h1>Log In</h1>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Username</label>
                    <input value={state.username} onChange={handleChange} type="text" placeholder="username"/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input value={state.password} onChange={handleChange} type="password" placeholder="pass"/>
                </div>
                
                <button className="ui button" type="submit">Submit</button>
            </form>
        </div>
        </div>
    )
} 