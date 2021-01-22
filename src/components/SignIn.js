import React, {useState} from 'react'
import { useAuth } from '../context/use-auth';
import { Form, Button } from "react-bootstrap";

export default function SignIn() {
    const auth = useAuth()
    const [state, setState] = useState({username: "", pass: ""})

    const handleChange = (e) => {
        setState({...state, [e.target.placeholder]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(state)
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
            <Form className="ui form" onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={state.username} onChange={handleChange} type="text" placeholder="username"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={state.password} onChange={handleChange} type="password" placeholder="pass"/>
                </Form.Group>
                
                <Button className="ui button" type="submit">Submit</Button>
            </Form>
        </div>
        </div>
    )
} 