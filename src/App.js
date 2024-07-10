import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import { AuthContext, FirebaseContext } from './store/Context';
import Post from './store/PostContext';
import Home from './Pages/Home';

function App() {
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [firebase, setUser]);

  return (
    <Post>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/viewpost' element={<View />} />
          </Routes>
        </div>
      </Router>
    </Post>
  );
}

export default App;
