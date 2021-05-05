import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

class Slider extends Component {
    render() {
        //console.log(this.props) //ver que se esta enviando en las propiedades desde el padre
        return (
            <div id="slider" className={this.props.sliderZise}>
                <h1>{this.props.titleSlider}</h1> {/* propiedad que llega desde el componente padre (debe usarse this.props seguido de un . y la propiedad)*/}
                {this.props.btn &&
                    <NavLink to="pagina" className="btn-white">{this.props.btn}</NavLink>
                }
            </div>
        );
    }
}

export default Slider;