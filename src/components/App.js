//seccion import

//.- de React, de archivos propios, Sass, Images
import '../styles/App.scss';
import {useEffect, useState } from 'react';
import data from '../data/data.json'
// FUNCIÓN DEL COMPONENTE
function App() {
  /*
    Variables de estado, funciones manejadoras de eventos, variables, funcion handle 
  */
const [objectList, setObjectList] = useState ([]);
const [quoteSearch, setQuoteSearch] = useState ('');
// SECCIÓN DE USEEFFECT (cuando carga la página)

useEffect(() => {
  fetch(
    'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
  )
    .then((response) => response.json())
    .then((data) => {
      const dataWithId = data.map((eachObject) => {
        return {
          id: crypto.randomUUID(),
          quote:eachObject.quote,
          character:eachObject.character,
        };
      });
        setObjectList(dataWithId);
          
      });

}, []);

const handleQuoteSearch = (ev) => {
  setQuoteSearch(ev.target.value);
}

const renderObjectList = () => {

  const filteredQuoteList = objectList.filter((eachObject) => 
  eachObject.quote.toLowerCase().includes(quoteSearch.toLowerCase())
  );

  return filteredQuoteList.map((eachObject, id) => 
  <li key={eachObject.id} className="item-list">{eachObject.quote} - {eachObject.character}</li>)
}
  
  /* RETURN --> HTML */
  return (
    <div>
      <header className='header'>
        <h1 className='header__title'>Frases de Friends</h1>
        <fieldset className='fieldset'>
          <form>
            <label htmlFor="filterquote">Filtrar por frase</label>
            <input
              className='header__search'
              autoComplete='off'
              type='search'
              name='search'
              placeholder='Filtrar por frase'
              value={quoteSearch}
              onInput={handleQuoteSearch}
            />
          </form>
          </fieldset>

        {/*
          <label>Filtrar por personajes</label>
          <select name="" 
          id="" 
          onChange="" 
          value="">
            <option 
            value="" disabled>
              Todos
            </option>
            <option value="R">Ross</option>
            <option value="M">Monica</option>
            <option value="J">Joey</option>
            <option value="P">Phoeby</option>
            <option value="C">Chandler</option>
            <option value="R">Rachel</option>
          </select>
        
  */}
        <fieldset>
          <ul>
           {renderObjectList()}
          </ul>
        </fieldset>
      </header>
    </div>

  )
}

/* export*/
export default App;
