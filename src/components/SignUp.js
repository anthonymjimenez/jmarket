import React, {useState} from 'react'
import { useAuth } from '../context/use-auth';
import { Form, Button } from "react-bootstrap";

export default function SignUp({handleSignUp}) {
  const [state, setState] = useState({
    name: "",
    age: 0,
    username: "",
    pass: "",
  })

  const auth = useAuth();


  const handleChange = (e) => {
    setState({...state, [e.target.placeholder]: e.target.value})
  }

  const handleSubmit = (e) => {
      e.preventDefault()
      console.log(auth)
      auth.signup(state)
  }


  
  return(
      <div>
          <h1>Sign Up</h1>
          <Form className="ui form" onSubmit={handleSubmit}>
              <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control value={state.name} onChange={handleChange} type="text" placeholder="name"/>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Age  </Form.Label>
                  <Form.Control value={state.age} onChange={handleChange} type="number" placeholder="age"/>
              </Form.Group>
              <Form.Group>
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
  )
}