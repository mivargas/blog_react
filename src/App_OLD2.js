//import logo from './assets/images/logo.svg';
import './assets/css/App.css';

//importar componentes
import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
//import SeccionPruebas from "./components/SeccionPruebas";
//import Peliculas from './components/Peliculas'
import Router from './Router'

function App() {
  const botonString = "Ir al blog"; //propiedad creada para usar en el hijo

  return (
    <div className="App">
      <Header />
      <Slider  
        titleSlider="Bienvenido al curso de Ract (Javascript)"
        btn={botonString} 
      /> {/* Asi se pasan propiedades desde el padre al hijo */}

      <div className="center">

        {/*<SeccionPruebas /> */}

        {/*<Peliculas />*/}

        <Router />

        

        
        <Sidebar />
      </div>

      <div className="clearfix"></div>
      <Footer />

    </div>
    
  );
}

export default App;
