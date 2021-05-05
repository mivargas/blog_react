import React, { Component } from 'react'; //usar el estructuring
import MiComponente from './MiComponente';
//import Peliculas from './Peliculas';

class SeccionPruebas extends Component {

    /* //forma larga
    contador = 0; //se declara propiedad

    constructor(props){ //el constructor con el parametro props es ecesario para la manipulacion de estado
        super(props); //super poner props es necerario

        this.state = { //aqui se establece el estado de la propiedad
            contador:0
        }
    }
    */
    //forma corta
    state = {
        contador:0
    }
    HolaMundo(Minombre, edad) {


        let hola = ( //mejor practica
            <div> ejemplo 2
                <h2>Hola mundo, soy {Minombre}</h2>
                <h3>y tengo {edad} años</h3>
            </div>
        );

        return hola
    }

    sumar = (e) => { //se usan arrow function en vez de metodos normales para evitar usar el bild en la llamada de estos
       
        this.setState({
            contador:(this.state.contador+1)
        });
    } 

    restar = (e) => {
        if(this.state.contador > 0){
            this.setState({
                contador:(this.state.contador-1)
            });
        }
    }

    render() {
        var nombre = "Miguel";
        var presentacion = <h2>hola mi nombre es {nombre}</h2>;


        return (
            <section id="content">
                <h2 className="subheader">Últimos articulos</h2>

                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>

                <h2 className="subheader">Funciones y jsx básico</h2>
                {presentacion}
                {this.HolaMundo(nombre, 22)}

                <h2 className="subheader">Componentes</h2>
                <section className="componentes"> {/*esto es un comentario: poder usar la propiedad class en las etiquetas html se usa className */}
                    <MiComponente /> {/* asi se llama a un componente */}
                    {/*<Peliculas />*/}
                </section>

                <h2 className="subheader">Estados</h2>
                <p>Contador: {this.state.contador}</p> {/* muestra el estado actual de la propiedad (el valor que tiene)*/}

                <p>
                    <input type="button" onClick={this.sumar} value="+"/> {/* no es necesario usar el bild si usas arrow functions en ves de metodos normales */}
                    <input type="button" onClick={this.restar} value="-"/>
                </p>
            </section>
        );
    }
}

export default SeccionPruebas;