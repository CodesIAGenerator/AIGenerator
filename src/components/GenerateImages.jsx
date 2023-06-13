import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from '@firebase/auth';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import app from './../components/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './../GenerateImages.css';
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: "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",
})

const openai = new OpenAIApi(config);



const GenerateImages = () => {
	const [user, setUser] = useState(null);
	const [imageCount, setImageCount] = useState("");
	const [images, setImages] = useState([]);
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

	const handleGenerateImage = async () => {
		const promptImage = document.getElementById("promptImage").value;
		const storage = getStorage(app);

	
		const response = await openai.createImage({
		  prompt: `${promptImage}`,
		  n: Number(imageCount),
		  size: "1024x1024",
		});

    setImages([...images, ...response.data.data.map(item => item.url)]);
    
    // jdfgk



  }
  
  const handleSavePhotoFireBase = () => {
    const url = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-sqW6BJcQRqn0PfHgl7MYWXZR/user-MV3nZV95gMa5ljl37e5DC7HI/img-FGBccHBJ1gWzhbaVFROmCsbq.png?st=2023-06-13T07%3A56%3A27Z&se=2023-06-13T09%3A56%3A27Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-12T20%3A38%3A05Z&ske=2023-06-13T20%3A38%3A05Z&sks=b&skv=2021-08-06&sig=iaHa4o/CBA/jsCoZShF%2BoGGgrVuAYPjwikUS1eyPVvE%3D';
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
  
    fetch(corsProxy + url)
      .then(response => response.blob())
      .then(blob => {
        // Ahora tienes un blob
        console.log(blob);
      })
      .catch(error => console.error(error));
  }
  

	

	return (
    <div className='home-container min-vh-100 pt-5'>
      <div className='container'>
        <div className='row justify-content-md-between overflow-auto'>
          <div className="mx-3 col-md-5 card-1 p-4 bg-dark text-light rounded">
            <h2 className='text-center mb-3'>Generador de imagenes</h2>
            <p className='text-center'>Desata tu creatividad y descubre un mundo de posibilidades con nuestra plataforma de generación de imágenes con IA. Crea obras únicas y sorprendentes en tan solo unos clics.</p>
          </div>

          <div className="col-md-5">
            <div className="d-flex align-items-center justify-content-center mt-3">
              <input id='promptImage' type="text" className='form-control bg-dark text-white mr-2' placeholder='Introduce el prompt' />
              <label htmlFor="imageCount" className="me-2 text-light">Cantidad:</label>
              <select id="imageCount" className='form-select w-25 me-3' name="imageCount" value={imageCount} onChange={e => setImageCount(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <button className='btn btn-success' onClick={handleGenerateImage}>Generar</button>
              <button className='btn btn-info mx-3 w-100' onClick={handleSavePhotoFireBase}>Guardar foto</button>
            </div>
          </div>
        </div>

        {/* Aquí es donde mostramos las imágenes generadas */}
        <div className="row mt-5">
          {images.map((image, index) => (
            <div key={index} className="col-md-3 mb-4">
              <img src={image} alt={`Imagen generada ${index + 1}`} className="img-fluid" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
			
}

export default GenerateImages