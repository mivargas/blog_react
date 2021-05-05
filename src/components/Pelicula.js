import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Pelicula extends Component {

    marcar = () => {
        this.props.marcarFavorita(this.props.pelicula);
    }
    render() {
        const { titulo, image } = this.props.pelicula
        //const pelicula = this.props.pelicula //para comunicacion de hijo a padre, guardamos el objeto de pelicula que llega por prop en una const (forma 1, paso 3)
        return (
            <article className="article-item">
                <div className="image-wrap">
                    <img src={image} alt={titulo} />
                </div>
                <h2>{titulo}</h2>
                <span className="date">
                    Hace 5 minutos
                                </span>
                <Link to="pagina">Leer más</Link>
                {/*<button onClick={()=>{this.props.marcarFavorita(pelicula)}}>Marcar como favorita</button> para comunicacion de hijo a padre,  en el onclick se crea una funcion de fleca para que detone la variable que llega en prop marcarFavorita para que la detone como uncion y pasa el parametro pelicula que recibe favorita como pelicualaMarcada(forma 1, paso 4)*/}
                <button onClick={this.marcar}>Marcar como favorita</button>
                <div className="clearfix"></div>
            </article>
            /*
            <article className="article-item">
                <div className="image-wrap">
                    <img src={this.props.pelicula.image} alt={this.props.pelicula.titulo} />
                </div>
                <h2>{this.props.pelicula.titulo}</h2>
                <span className="date">
                    Hace 5 minutos
                </span>
                <a href="">Leer más</a>
                <div className="clearfix"></div>
            </article>
            */
        )
    }
}

export default Pelicula;