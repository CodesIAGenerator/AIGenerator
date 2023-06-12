import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Home.css';
import './../Dashboard.css';
import { getAuth, signOut, onAuthStateChanged } from '@firebase/auth';
import app from './../components/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Card, Row, Col } from 'react-bootstrap';
import userIcon from './../img/usericon.png';
import axios from 'axios';
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: "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",
})

const openai = new OpenAIApi(config);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
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

  const handleGenerateShorts = async () => {
    const videoUrl = document.getElementById('videoUrl').value;
    
  
    if (!videoUrl) {
      alert('Por favor, introduce la URL del video.');
      return;
    }
  
    try {
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `Resumen del video en ${videoUrl}`,
        max_tokens: 60
      }, {
        headers: {
          'Authorization': `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`
        }
      });
  
      console.log(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };


  const handleGenerateImages = async () => {
    const imageGenerate = document.getElementById('imagePrompt').value;
    const response = await openai.createImage({
      prompt: `${imageGenerate}`,
      n: 1,
      size: "1024x1024",
    });
    console.log(response);
  
    const url = response.data.data[0].url;
    setImageUrl(url);
  }
  

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
                <NavLink to="/" className="nav-link">Inicio</NavLink>
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
      <Row className="mt-4">
          <Col sm={3}>
            <NavLink className="text-decoration-none" to='/generateImage'>
          <Card className="bg-dark text-light">
            {/* <Card.Img variant="top" src="img_url" /> */}
            <Card.Body>
              <Card.Title>Generar imagenes</Card.Title>
              <Card.Text>
                Genera imagenes atravez de prompts
              </Card.Text>
            </Card.Body>
              </Card>
              </NavLink>
        </Col>
        <Col sm={3}>
          <Card className="bg-dark text-light">
            <Card.Img variant="top" src="img_url" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={3}>
          <Card className="bg-dark text-light">
            <Card.Img variant="top" src="img_url" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* {imageUrl && <img src={imageUrl} alt="Generated Image" style="height: 100px;" />} */}
    </div>
  </div>
  );
}

export default Dashboard;
