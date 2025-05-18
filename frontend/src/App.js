import logo from './logo.svg';    
import './App.css';
import Ticket from "./Components/Ticket";
import TicketsPage from "./Components/TicketsPage";

import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import NotFound from "./Components/NotFound";



import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { DomainContext } from "./DomainContext";
import { AuthenticationContextProvider } from "./AuthenticationContext";

function App() {
  return (
    <DomainContext.Provider value={"http://localhost:8000/"}>
      <div className="App">
        <Router>
          <AuthenticationContextProvider>
            <Routes>
              <Route exact path="/" element={<RegisterPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              {/* <Route path="logout" element={<Logout />} /> */}
              <Route path="/tickets" element={<TicketsPage />} >
              </Route>
              <Route path="/tickets/:id" element={<Ticket />} />
            
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthenticationContextProvider>
        </Router>
      </div>
    </DomainContext.Provider>
  );
}

export default App;
