import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Home.css';
import app from './../components/firebaseConfig';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, PhoneAuthProvider, RecaptchaVerifier, signInWithCredential } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in 
      const user = userCredential.user;
      console.log(user.displayName)
      // Navigate to Dashboard
		navigate('/dashboard');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // You can show an error message here
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;
      // Navigate to Dashboard
      navigate('/dashboard');
      // console.log(user.displayName);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage);
      // You can show an error message here
    }
  };
  

  return (
    <div className="text-light min-vh-100 home-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h2 className="mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="d-grid gap-2 mb-3">
                <button className="btn btn-primary" type="submit">Iniciar Sesión</button>
              </div>
              <div className="text-center">
                <p>O inicie sesión con:</p>
                <button className="btn btn-outline-light me-2" type="button" onClick={handleGoogleSignIn}>Google</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
