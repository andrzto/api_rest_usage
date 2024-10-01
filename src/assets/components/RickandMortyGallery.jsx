
import { useEffect, useState } from "react"

export const RickandMortyGallery = () => {

  // Estado para almacenar las imágenes de gatitos, lo inicializamos con un array vacío
  const [rick, setRick] = useState([]);

  // Estado para manejar posibles errores
  const [error, setError] = useState(null);

  // Método para realizar la petición a la API con fetch
  const fetchData = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');

      // Convertimos la respuesta a formato JSON
      const data = await response.json();

      // Setear la variable de estado cats a través de su método setCats con los datos recibidos de la API
      setRick(data);

    } catch (error) {
      console.log('Error al realizar la solicitud', error); // Debugg
      setError('Error al realizar la solicitud');
    }
  };

  // useEffect ejecuta el método fetchData la primera vez que se monta el componente ( hace petición de la API)
  useEffect(() => {
    fetchData();
  }, []);

  // Si hay error, mostramos el mensaje de error
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className='container mt-5'>
      <h2 className='text-center text-white mb-4'>Galería Rick con Fetch</h2>
      {/* Agregamos un contenedor scroll y altura fija */}
      <div className='row overflow-auto vh-80' style={{ maxHeight: '80vh', overflowY: 'scroll'}}>
        
          {rick.map((rick, index) => (
            <div className='col-md-4 mb-4' key={index} >
              <div className='card h-100 d-flex flex-column'>
                <img src={rick.url} className='card-img-top img-fluid object-fit-cover' alt="Rick" />
                <div className='card-body'>
                  <h5 className='card-title'>Hamurai {index + 1}</h5>
                  <p className='card-text'>¡Hamurai, Rick and Morty!</p>
                </div>
              </div>
            </div>

          ))}

      </div>
    </div>
  )
}
