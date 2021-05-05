import React, { Component } from 'react'
import logo from '../assets/images/logo.svg' //importamos el logo
import { NavLink } from "react-router-dom"; //importar para la navegacion
class Header extends Component {
    render() {
        return (
            <header id="header">
                <div className="center">
                    {/* Logo */}
                    <div id="logo">
                        <img src={logo} alt="logotipo" className="app-logo" /> {/* asi llamamos al logo */}
                        <span id="brand">
                            <strong>Curso</strong>React
                        </span>
                    </div>
                    {/*MENU*/}
                    <nav id="menu">
                        <ul>
                            <li>
                                <NavLink to="/home" activeClassName="active">Inicio</NavLink> {/* Forma de usar los link para la navegacion */}
                            </li>
                            <li>
                                <NavLink to="/blog" activeClassName="active">Blog</NavLink >
                            </li>
                            <li>
                                <NavLink to="/formulario" activeClassName="active">Formulario</NavLink >
                            </li>
                            <li>
                                <NavLink to="/peliculas" activeClassName="active">Peliculas</NavLink >
                            </li>
                            <li>
                                <NavLink to="/pruebas/miguel" activeClassName="active">Pagina 2</NavLink >
                            </li>
                        </ul>
                    </nav>
                    {/*limpiar flotados*/}
                    <div className="clearfix"></div>
                </div>

            </header>
        );
    }
}

export default Header;