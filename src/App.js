import StockCard from './components/StockCard';
import Dashboard from './container/Dashboard';
import UserPage from './container/UserPage'
import './App.css';
import { useAuth } from './context/use-auth'
import Landpage from './container/Landpage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './components/Nav';
import { useEffect } from 'react';

function App() {
  let auth = useAuth()

  useEffect(() => {
    (() => {
      auth.signInFromToken()
    })();
  }, [])

  return (
    <div className="App">
      {console.log(auth)}
      <Router>
      <Nav/>
      <Switch>
      <Route exact path="/">
      <Landpage/>
      </Route>
      <Route exact path ="/stocks/:id">
      <StockCard/>
      </Route>
      <Route exact path="/dash">
      <Dashboard/>
      </Route>
      <Route exact path="/account">
        <UserPage/>
      </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
