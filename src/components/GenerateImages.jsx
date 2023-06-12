import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from '@firebase/auth';
import app from './../components/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './../GenerateImages.css';


const GenerateImages = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const auth = getAuth(app);
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (!currentUser) {
				navigate('/login');
			}

			console.log(user);
		})
	}, []);

	

  return (
	  <div className='test home-container min-vh-100 pt-5'>
		  <div className='row'>
			  <div className="mx-3 col-md-5 card-1">
			  <h2 className='text-center'>Generador de imagenes</h2>
			  <p className='text-center'>Desata tu creatividad y descubre un mundo de posibilidades con nuestra plataforma de generación de imágenes con IA. Crea obras únicas y sorprendentes en tan solo unos clics.</p>
			  </div>

			  <div className="col-md-5">
				  <div className="d-flex">
				  	<input id='promptImage' type="text" className='form-control bg-dark text-white' placeholder='Introduce el prompt' />
				  	<button className='btn btn-success'>Generar</button>
				  </div>
				  
			  </div>
			  
		  </div>
		  
		  
	  </div>
  )
}

export default GenerateImages