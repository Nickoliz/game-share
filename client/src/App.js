import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Pages from './pages/Pages'
import {setUser} from './store/auth'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/session/current");
      if (res.ok) {
        res.data = await res.json();
        dispatch(setUser(res.data.user));
      }
      setLoading(false);
    }
    loadUser();
  }, [dispatch]);

  if(loading) return null;

  return (
    <BrowserRouter>
    <Navbar />
      <Pages />
    </BrowserRouter>
  );
}

export default App;
