import React, { Component } from 'react';
import Pelicula from './Pelicula'

class Peliculas extends Component {
    state = {}

    cambiarTitulo = ()=>{
        let {peliculas} = this.state
        peliculas[1].titulo = "Tarzan de la selva"
        this.setState({
            peliculas
        })
    }

    favorita = (pelicualaMarcada) => { //para comunicacion de hijo a padre, definimos metodo recibiendo un paametro que llega desde el componente hijo (forma 1, paso 1) y (forma 2, paso 1)
        console.log(pelicualaMarcada)
        this.setState({
            //peliculaFavoritaMarcada: pelicualaMarcada.titulo //solo el valor que queremos mostrat
            peliculaFavoritaMarcada: pelicualaMarcada //objeto completo
        })
    }
    
    componentWillMount(){ //antes de montar el componentre (ciclo de civa del componente) NOTA:  obsoleto apartir de React v16.3.0 Debe evitar usar componentWillSomethingpara usar constructorocomponentDidMount
        alert("voy a ontar el componente(estados de propiedades, valores, etc)")
        this.setState({
        
            peliculas: [
                { titulo: 'La sirenita', image: 'https://i0.wp.com/frasesdelapelicula.com/wp-content/uploads/2012/05/la-sirenita-1.jpg?fit=1200%2C630&ssl=1' },
                { titulo: 'Tarzan', image: 'https://www.lacasadeel.net/wp-content/uploads/2014/01/Tarzan.jpg' },
                { titulo: 'Mulan', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRIC-kKp6EnJTlObfedDMexHkY1D2Crhaeeg&usqp=CAU' }
            ],
    
            nombre: "Miguel Vargas",
            peliculaFavoritaMarcada:{} //si fuera solo un valor (como titulo) seria peliculaFavoritaMarcada:''
        })
    }

    componentDidMount(){
        alert("se monto el componete");
        
    }

    render() {
        let pstyle = { background: 'green', color:'white', padding:'10px' }

        var peliFavorita;

        if(this.state.peliculaFavoritaMarcada.titulo){ //segunda forma del condicional para usar en jsx
            peliFavorita=(
            <p style={pstyle}><strong>La pelicula favorita es: </strong>
                <span>{this.state.peliculaFavoritaMarcada.titulo}</span>
            </p>)
        }else{
            peliFavorita = (
            <p>NO HAY PELICULA FAVORITA SELECCIONADA</p>
            )
        }

        return (
            <section id="content" className="pelicula">
                <h2 className="subheader">Peliculas</h2>
                <p>Seleccion de las peliculas favoritas de {this.state.nombre}</p>
                <p>
                    <button type="button" onClick={this.cambiarTitulo}>Cambiar titulo de pelicula</button>
                </p>

                {/* primera forma con condicionales en jsx
                {this.state.peliculaFavoritaMarcada.titulo ? ( //condicional en jsx(si existe peliculaFavoritaMarcada.titulo) esto seria un 'si'
                        <p style={pstyle}><strong>La pelicula favorita es: </strong>
                        <span>{this.state.peliculaFavoritaMarcada.titulo}</span> // si fuera solo un valor (como peliculaFavoritaMarcada: pelicualaMarcada.titulo) this.state.peliculaFavoritaMarcada 
                        </p>
                    ) : (
                        <p>NO HAY PELICULA FAVORITA SELECCIONADA</p>
                    )
                }
                */}

                {peliFavorita} {/* mostrar el condicional de la segunda forma */}

                {/* crear peliculas */}
                <div id="article" className="pelicula">
                    {this.state.peliculas.map((pelicula, i) => {
                        return(
                            <Pelicula pelicula={pelicula} key={i} marcarFavorita={this.favorita} />  //para comunicacion de hijo a padre, pasar la variable de funcion en una prop (forma 1, paso 2) y (forma 2, paso 2)
                        )
                    })}
                </div>

            </section>


        )
    }
}

export default Peliculas;