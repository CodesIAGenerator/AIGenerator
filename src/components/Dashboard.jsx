import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Home.css';
import './../Dashboard.css';
import { getAuth, signOut, onAuthStateChanged } from '@firebase/auth';
import app from './../components/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import userIcon from './../img/usericon.png';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate('/login');
      }

    });
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      // Sign-out successful.
      navigate('/login'); // or wherever you want to redirect the user after sign out
    } catch (error) {
      // An error happened.
      console.log(error);
    }
  };

  return (
    <div className="text-light min-vh-100 home-container">
      <nav className="navbar navbar-expand-lg navbar-dark home-container">
        <div className="container">
          <a className="navbar-brand" href="#">Short Video AI Generator</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item me-4">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="dark" id="dropdown-basic" className="profile-toggle">
                    <img src={user ? user.photoURL : userIcon} alt="User Avatar" className="user-avatar height-avatar" />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleSignOut}>Cerrar Sesión</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container py-5">
        
      </div>
    </div>
  );
}

export default Dashboard;
