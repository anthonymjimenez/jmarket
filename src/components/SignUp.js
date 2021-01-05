import React, {useState} from 'react'
import { useAuth } from '../context/use-auth';

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

  // add to css
  const formDivStyle = {
      margin: "auto",
      padding: "20px",
      width: "80%"
  }
  
  return(
      <div style={formDivStyle}>
          <h1>Sign Up</h1>
          <form className="ui form" onSubmit={handleSubmit}>
              <div className="field">
                  <label>Name</label>
                  <input value={state.name} onChange={handleChange} type="text" placeholder="name"/>
              </div>
              <div className="field">
                  <label>Age</label>
                  <input value={state.age} onChange={handleChange} type="number" placeholder="age"/>
              </div>
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
  )
}