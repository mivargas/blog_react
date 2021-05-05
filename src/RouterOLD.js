//para esto se necesita una libreria (npm i --save react-router-dom)
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; //importa los componentes necesario de la libretia
import SeccionPruebas from './components/SeccionPruebas';
import MiComponente from './components/MiComponente';
import Peliculas from './components/Peliculas';
import Error from './components/Error'

//importar componentes
import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';


class Router extends React.Component {
    render() {
        const botonString = "Ir al blog"; //propiedad creada para usar en el hijo

        return (
            <BrowserRouter>
                <Header />
                <Slider
                    titleSlider="Bienvenido al curso de Ract (Javascript)"
                    btn={botonString}
                />

                <div className="center">

                    {/* CONFIGURAR RUTAS Y PAGINAS */}
                    <Switch>
                        <Route exact path="/" component={Peliculas} /> {/* se necesita el exact porque sino todo lo que sea / se interpreta que todo lo que siga alli es de la misma ruta (sin el exact va heredando) */}
                        <Route exact path="/home" component={Peliculas} /> 
                        <Route path="/ruta-prueba" component={SeccionPruebas} />
                        <Route path="/segunda-ruta" component={MiComponente} />
                        <Route path="/pagina" render={() => (
                            <React.Fragment>
                                <h1>Hola desde la ruta: PAGINA</h1>
                                <MiComponente saludo="Hola amigo" />
                            </React.Fragment>
                        )} /> {/*Definir routas sin componente (No se recomienda puesto que una manera muy desordenada ) */}
                        <Route exact path="/pruebas/:nombre/:apellido?" render={(props) => {
                            let nombre = props.match.params.nombre;
                            let apellido = props.match.params.apellido;
                            return (
                                <div id="content">
                                    <h1 className="subheader">Página pruebas</h1>
                                    <h2>
                                        {nombre && !apellido &&
                                            <span>{nombre}</span>
                                        }
                                        {nombre && apellido &&
                                            <span>{nombre} {apellido}</span>
                                        }
                                    </h2>
                                </div>
                            )
                        }
                        } />
                        <Route component={Error} /> {/* se configura 404 */}
                    </Switch>
                    <Sidebar />
                </div>

                <div className="clearfix"></div>
                <Footer />
            </BrowserRouter>
        );
    }


}


export default Router;