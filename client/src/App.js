import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/reducers/userSlice';
import AuthRoutes from './components/AuthRoutes/AuthRoutes';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <div className="App">
      <AuthRoutes />
    </div>
  );
}

export default App;
