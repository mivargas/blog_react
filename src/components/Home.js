import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Slider from './Slider';
import Articles from './Articles';
class Home extends Component {

    render() {
        const botonString = "Ir al blog"; //propiedad creada para usar en el hijo

        return (
            <div id="home">
                <Slider
                    titleSlider="Bienvenido al curso de Ract (Javascript)"
                    btn={botonString}
                    sliderZise="slider-big"
                />
                <div className="center">
                    <div id="content">
                        <Articles home={true} />
                    </div>
                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Home;