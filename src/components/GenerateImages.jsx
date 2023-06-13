import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from '@firebase/auth';
import { getStorage, ref, getDownloadURL, uploadBytesResumable, listAll } from "firebase/storage";
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
  const [newImages, setNewImages] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const auth = getAuth(app);
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (!currentUser) {
				navigate('/login');
			}
			// console.log(user);
		})
  }, []);
  
  
	const handleGenerateImage = async () => {
    const promptImage = document.getElementById("promptImage").value;

    
  
    const response = await openai.createImage({
      prompt: `${promptImage}`,
      n: Number(imageCount),
      size: "1024x1024",
    });
  
    const newImages = response.data.data.map(item => item.url);
    setImages([...images, ...newImages]);
  
    // Guardamos las fotos en la base de datos
    const storage = getStorage(app);
    const userId = user.uid;
    const userEmail = user.email;
    const files = await decodeJsonToFile(`${userEmail}`, newImages);
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];  
      const storageRef = ref(storage, `${userId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle the upload progress
        }, 
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        }, 
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      );
    }
  }
  

  
  
  const getUserFiles = async (userId, userEmail) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, userId + '/' + userEmail);
    const res = await listAll(storageRef);
    const urlPromises = res.items.map((item) => getDownloadURL(item));
    const urls = await Promise.all(urlPromises);
    return urls;
  };
  
  useEffect(() => {
    const loadImages = async () => {
      if (user) {
        const userId = user.uid;
        const userEmail = user.email;
        const urls = await getUserFiles(userId, userEmail);
        setImages(urls);
      }
    };

    // console.log(user.displayName)
  
    loadImages();
  }, [user]); // Agrega 'user' a la lista de dependencias
  
  

  async function decodeJsonToFile(path, images) {
    let result = [];
    for (let i = 0; i < images.length; i++) {
      const response = await fetch(images[i]);
      const blob = await response.blob();
      const timestamp = Date.now(); // Obtiene el timestamp actual
      const file = new File([blob], `${path}/image_${i}_${timestamp}.png`, {type: 'image/png'}); // Agrega el timestamp al nombre del archivo
      result.push(file);
    }
    return result;
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