//seccion import

//.- de React, de archivos propios, Sass, Images
import '../styles/App.scss';
import { useEffect, useState } from 'react';

// FUNCIÓN DEL COMPONENTE
function App() {
  /*
    Variables de estado, funciones manejadoras de eventos, variables, funcion handle 
  */
  const [objectList, setObjectList] = useState([]);
  const [quoteSearch, setQuoteSearch] = useState(''); //recoge lo que escribe la usuaria
  const [filterCharacter, setFilterCharacter] = useState('all');
  // SECCIÓN DE USEEFFECT (cuando carga la página)

  useEffect(() => {
    fetch(
      'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
    )
      .then((response) => response.json())
      .then((objectList) => {

        console.log(objectList)
        setObjectList(objectList);

      });

  }, []);

  const handleQuoteSearch = (ev) => {
  console.log(ev.target.value)
  setQuoteSearch(ev.target.value);
  }
  const handleCharacter = (ev) => {
    setFilterCharacter(ev.target.value);
  }

  const renderObjectList = () => {
    return objectList
    .filter((element)=> element.quote.toLowerCase().includes(quoteSearch.toLowerCase()))

    .filter((element) => {
      
      /*
      if(filterCharacter === "all"){
        return true;//también podría poner return = element
      }else{
        return element.character === filterCharacter;
      }
      */
    })
    .map((element, index) => (<li key={index}>
      <h2>{element.quote}</h2>
      <span>{element.character}</span>
    </li>));
  };

  /* RETURN --> HTML */
  return (
    <div>
      <form>
        <label htmlFor="">Filtrar por frase</label>
        <input type="text" onInput={handleQuoteSearch}/>
        <label >Filtrar por personaje</label>
        <select name="" id="" onChange={handleCharacter}>
          <option value="all">Todos</option>
          <option value="Joey">Joey</option>
          <option value="Phoeby">Phoeby</option>
          <option value="Chandler">Chandler</option>
          <option value="Rachel">Rachel</option>
          <option value="Ross">Ross</option>
          <option value="Monica">Monica</option>
        </select>
      </form>
      <ul>{renderObjectList()}</ul>
    </div>
  )
}

/* export*/
export default App;
