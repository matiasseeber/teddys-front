import HomePage from "./components/homePage";
import NavBar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewTeddy from "./components/newTeddy";
import { createContext, useState, Dispatch, SetStateAction } from "react";

interface TokenContextType {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

export const TokenContext = createContext<TokenContextType>({
  token: "",
  setToken: () => { },
});

function App() {
  const [token, setToken] = useState("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/newTeddy" Component={NewTeddy} />
        </Routes>
      </Router>
    </TokenContext.Provider>
  );
}

export default App;
