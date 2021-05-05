import logo from './assets/images/logo.svg';
import './assets/css/App.css';

//importar componentes
import MiComponente from './components/MiComponente';
import Peliculas from './components/Peliculas';

function HolaMundo(Minombre, edad){
  //let hola = <h2>Hola mundo, soy {Minombre}</h2>; //ejemplo 1
  
  /*let hola = //esto no se debe hacer devulve ERROR se debe agrupar en div o en una sola ertiqueta
    <h2>Hola mundo, soy {Minombre}</h2>
    <h3>Hola mundo, soy {edad}</h3>;
  */
/*
 let hola = <div> ejemplo 2
  <h2>Hola mundo, soy {Minombre}</h2>
  <h3>y tengo {edad} años</h3>
</div>;
*/

let hola = ( //mejor practica
  <div> ejemplo 2
    <h2>Hola mundo, soy {Minombre}</h2>
    <h3>y tengo {edad} años</h3>
  </div>
);

  return hola
}

function App() {
  //todo esto es codigo jsx
  var nombre = "Miguel";
  var presentacion =  <h2>hola mi nombre es {nombre}</h2>;

  //dentro de jsx no se pueden definir variables (dentro del return) tiene que ser afuera. NOTA: no usar ; dentro del jsx
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> 
        <p>
          Edit <code>src/App.js</code> and save to reload--hola.
        </p>
        {presentacion}
        {HolaMundo(nombre, 22)}

        <section className="componentes"> {/*esto es un comentario: poder usar la propiedad class en las etiquetas html se usa className */}
          <MiComponente /> {/* asi se llama a un componente */}
          <Peliculas />
        </section>

      </header>
      
    </div>
  );
}

export default App;
