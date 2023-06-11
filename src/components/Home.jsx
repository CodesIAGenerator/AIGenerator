import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Home.css';

function Home() {
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
              <li className="nav-item">
                <a className="btn btn-success mx-3" href="#">Login</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-signup" href="#">Signup</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="display-4">Short Video AI Generator</h1>
            <p className="lead">Bienvenido a nuestro sitio web. Prepárate para generar increíbles videos cortos utilizando IA.</p>
            <button className="btn btn-primary">Comenzar</button>
          </div>
          <div className="col-md-6">
            <img src="ruta-de-la-imagen" alt="Descripción de la imagen" className="img-fluid" />
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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae diam at erat ullamcorper eleifend at et lacus. Sed et mi a elit maximus finibus. Phasellus sodales nibh vel ante sagittis, at pulvinar mi condimentum. Aliquam a pharetra purus.</p>
            <p>Fusce vel consequat nunc. Vivamus dapibus placerat facilisis. Sed laoreet commodo mi vel volutpat. Pellentesque ac tortor vel metus gravida commodo. In rutrum quam sit amet tortor blandit congue.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
