import './App.css';
import { Routes, Route } from 'react-router-dom';
import Authorisation from './components/auth/Authorisation';
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/registration" element={<Authorisation />} />
      </Routes>
    </div>
  );
}

export default App;
