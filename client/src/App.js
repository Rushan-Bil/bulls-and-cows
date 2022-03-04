import './App.css';
import './Auth.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { checkAuth } from './store/reducers/userSlice';
import AuthRoutes from './components/AuthRoutes/AuthRoutes';
import imageSrc from './images/logo.svg';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <div className="App">
      <Link to="/"><img className="logo" src={imageSrc} alt="logo"/></Link>
      <AuthRoutes />
    </div>
  );
}

export default App;
