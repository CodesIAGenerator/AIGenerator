import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Home.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Background1 from './../img/POWERED BY.png';
import { getAuth, onAuthStateChanged, signOut,  } from '@firebase/auth';
import app from './../components/firebaseConfig';

function Home() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      // Sign-out successful.
      navigate('/'); // or wherever you want to redirect the user after sign out
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
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>

              {
                user
                  ? <>
                      <li className="nav-item">
                        <NavLink className="btn btn-outline-success mx-3" to="/dashboard">Dashboard</NavLink>
                      </li>
                      <li className="nav-item">
                        <button className="btn btn-outline-danger" onClick={handleSignOut}>Cerrar sesión</button>
                      </li>
                    </>
                  : <>
                      <li className="nav-item">
                        <NavLink className="btn btn-outline-success mx-3" to="/login">Login</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="btn btn-outline-primary" to="/register">Signup</NavLink>
                      </li>
                    </>
              }

              
            </ul>
          </div>
        </div>
      </nav>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="display-4">Short Video AI Generator</h1>
            <p className="lead">Bienvenido a nuestro sitio web. Prepárate para generar increíbles videos cortos utilizando IA.</p>
            <NavLink to="/register" className="btn btn-primary">Comenzar</NavLink>
          </div>
          <div className="col-md-6">
            <img src={Background1} alt="Descripción de la imagen" className="img-fluid" />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <h2>Nuestros Servicios</h2>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h4 className="card-title">Edición de video asistida por IA</h4>
                <p className="card-text">Facilitamos y automatizamos el proceso de edición de video. Generamos clips cortos, añadimos subtítulos, emojis, detectamos momentos destacados y mucho más.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h4 className="card-title">Análisis de video</h4>
                <p className="card-text">Proporcionamos información valiosa sobre tus videos, incluyendo el tiempo de visualización, los momentos de mayor interés, las palabras clave más utilizadas y más.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark text-white h-100">
              <div className="card-body">
                <h4 className="card-title">Transcripción de video</h4>
                <p className="card-text">Convertimos el audio de tus videos en texto escrito, facilitando la creación de subtítulos y la búsqueda y indexación de tus videos.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <h2>¿Qué hacemos?</h2>
            <p>En Short Video AI Generator, nos dedicamos a brindarte una experiencia revolucionaria en la generación de videos cortos utilizando inteligencia artificial. Nuestro objetivo es proporcionarte herramientas avanzadas y fáciles de usar para crear videos impactantes y cautivadores en cuestión de minutos.</p>
            <p>Con nuestra plataforma, puedes seleccionar plantillas predefinidas o crear tus propias composiciones visuales. Luego, utilizando la potencia de la inteligencia artificial, generaremos videos personalizados y de alta calidad en base a tus preferencias y requisitos.</p>
            <p>Ya sea que necesites crear contenido para redes sociales, anuncios publicitarios o presentaciones de productos, nuestro generador de videos AI te permitirá destacar en el mundo digital. Además, ofrecemos opciones de personalización, desde efectos visuales hasta selección de música y narración de voz, para que puedas hacer que cada video sea único y represente tu marca de manera efectiva.</p>
            <p>En Short Video AI Generator, nos enorgullece ofrecer una solución innovadora que agiliza y simplifica el proceso de creación de videos. ¡Únete a nosotros y descubre cómo puedes potenciar tu presencia en línea con videos cautivadores y profesionales!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
