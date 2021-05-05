import React, {Component} from 'react';
import MensajeEstatico from './MensajeEstatico'

class Peliculas extends Component{
    render(){
        return (
            <div id="componet">
                <h3>Soy el componente de peliculas</h3>
                <MensajeEstatico />
            </div>

        )
    }
}

export default Peliculas;