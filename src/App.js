import StockCard from "./components/StockCard";
import Dashboard from "./container/Dashboard";
import UserPage from "./container/UserPage";
import "./App.css";
import { useAuth } from "./context/use-auth";
import Landpage from "./container/Landpage";
import TagPage from "./container/TagPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landpage />} />

        <Route exact path="/stocks/:id" element={<StockCard />} />
        <Route exact path="/dash" element={<Dashboard />} />

        <Route exact path="/account" element={<UserPage />} />

        <Route exact path="/tags/:id" element={<TagPage />} />

        <Route exact path="/allStocks" element={<AllStocksPage />} />
      </Routes>
    </div>
  );
}

export default App;
