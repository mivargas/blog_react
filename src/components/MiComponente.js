import React, { Component } from 'react'; //usar el estructuring

//import React from 'react'; //sin el estructuring
//class MiComponente extends React.Component{ //asi se crean los componentes de react

class MiComponente extends Component {
    render() {
        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Jamon cocido'],
            calorias: 400
        };

        return (
            <React.Fragment> {/* JSX solo puede devolver una sola etiqueta por eso se deben agrupar en un div o en un React.Fragment que es una etiqueta vacia*/}
                <h1>{receta.nombre}</h1> {/* acceso a objetos */}
                <h2>{'Calorias: ' + receta.calorias}</h2> {/* concatenaciones */}

                {/* iterar bucles */}
                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            )
                        })
                    }
                </ol>
                <hr />
                {this.props.saludo &&
                    <React.Fragment>
                        <h2>DESDE UNA PROP DE ROUTE:</h2>
                        <h3>{this.props.saludo}</h3>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default MiComponente;