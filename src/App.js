import StockCard from "./components/StockCard";
import Dashboard from "./container/Dashboard";
import UserPage from "./container/UserPage";
import "./App.css";
import { useAuth } from "./context/use-auth";
import Landpage from "./container/Landpage";
import TagPage from "./container/TagPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Nav";
import AllStocksPage from "./container/AllStocksPage";
import { useEffect } from "react";

function App() {
  let auth = useAuth();

  useEffect(() => {
    (() => {
      auth.signInFromToken();
    })();
  }, []);

  return (
    <div className="App">
      {console.log(auth)}
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Landpage />
          </Route>
          <Route exact path="/stocks/:id">
            <StockCard />
          </Route>
          <Route exact path="/dash">
            <Dashboard />
          </Route>
          <Route exact path="/account">
            <UserPage />
          </Route>
          <Route exact path="/tags/:id">
            <TagPage />
          </Route>
          <Route exact path="/allStocks">
            <AllStocksPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
