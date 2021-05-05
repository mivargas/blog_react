//para esto se necesita una libreria (npm i --save react-router-dom)
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; //importa los componentes necesario de la libretia
//import SeccionPruebas from './components/SeccionPruebas';
import MiComponente from './components/MiComponente';
import Error from './components/Error'

//importar componentes
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from "./components/Blog";
import Peliculas from './components/Peliculas'
import Formulario from './components/Formulario';
import Search from './components/search';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import Estaf from './components/Estaf';
import EditArticle from './components/EditArticle';

class Router extends React.Component {
    render() {

        return (
            <BrowserRouter>
                <Header />
                {/* CONFIGURAR RUTAS Y PAGINAS */}
                <Switch>
                    <Route exact path="/" component={Home} /> {/* se necesita el exact porque sino todo lo que sea / se interpreta que todo lo que siga alli es de la misma ruta (sin el exact va heredando) */}
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/staf" component={Estaf} />
                    <Route path="/formulario" component={Formulario} />
                    <Route path="/peliculas" component={Peliculas} />
                    <Route exact path="/blog/articulo/:id" component={Article} />
                    <Route exact path="/blog/crear" component={CreateArticle} />
                    <Route exact path="/blog/editar/:id" component={EditArticle} />

                    {/*<Route exact path="/blog/articulo/:id" render={ () => (
                        <React.Fragment>
                            <h1>aqui</h1>
                        </React.Fragment>
                    )} */}
                    <Route exact path="/blog/busqueda/:search" component={Search} />
                    <Route exact path="/redirect/:search" render={ (props) =>{
                        const search = props.match.params.search;

                        return(
                            <Redirect to={`/blog/busqueda/${search}`} />
                        )
            
                        }
                    } />

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
                <div className="clearfix"></div>
                <Footer />
            </BrowserRouter>
        );
    }


}


export default Router;