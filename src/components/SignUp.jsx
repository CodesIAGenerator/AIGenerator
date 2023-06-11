import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Home.css';

const Register = () => {
  return (
    <div className="text-light min-vh-100 home-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h2 className="mb-4">Registro</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirme su contraseña" />
              </div>
              <div className="d-grid gap-2 mb-3">
                <button className="btn btn-primary" type="submit">Registrarse</button>
              </div>
              <div className="text-center">
                <p>O regístrese con:</p>
                <button className="btn btn-outline-light me-2" type="button">Google</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
