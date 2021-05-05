import React, { Component } from "react";
import Sidebar from './Sidebar';
//import Slider from "./Slider";

class Formulario extends Component {

    nombreRef = React.createRef(); //propiedad ref
    apellidoRef = React.createRef();
    bioRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    state = {

        user: {}
    }

    recibirFormulario = (e) => {
        e.preventDefault();
        //alert("formulario enviado")
        let generoMark = "";

        if (this.generoHombreRef.current.checked) {
            generoMark = this.generoHombreRef.current.value;
        } else if (this.generoMujerRef.current.checked) {
            generoMark = this.generoMujerRef.current.value;
        } else {
            generoMark = this.generoOtroRef.current.value;
        }

        let usuario = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidoRef.current.value,
            bio: this.bioRef.current.value,
            genero: generoMark,
        }
        //console.log(this.nombreRef.current.value)

        console.log(usuario)

        this.setState({
            user: usuario
        })
    }
    render() {
        if (this.state.user.nombre) {
            var user = this.state.user;   //se crea variable para acortar         
        }
        return (
            <div id="Formulario">

                <h1 className="subheader">Formulario</h1>
                <div className="center">
                    <div id="content">

                        {/* mostrando valores de capos */}
                        {this.state.user.nombre &&
                            <div id="user-data">
                                {/* Nombre: <strong>{this.state.user.nombre}</strong> se acorto con variable*/}
                                <p>Nombre: <strong>{user.nombre}</strong></p>
                                <p>Apellido: <strong>{user.apellido}</strong></p>
                                <p>Bio: <strong>{user.bio}</strong></p>
                                <p>Genero: <strong>{user.genero}</strong></p>
                            </div>
                        }

                        {/* CREAR FORMULARIO */}

                        <form className="mid-form" onSubmit={this.recibirFormulario} > {/* se puede ver la reactividad con un onChange={this.recibirFormulario} */}
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef} /> {/* se crea una referencia "ref" para poder usar los elementos del formulario con react */}

                            </div>
                            <div className="form-group">
                                <label htmlFor="apellido">Apellido</label>
                                <input type="text" name="apellido" ref={this.apellidoRef} />

                            </div>
                            <div className="form-group">
                                <label htmlFor="bio">Biografía</label>
                                <textarea name="bio" ref={this.bioRef}></textarea>

                            </div>
                            <div className="form-group radiobuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef} />Hombre
                            <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef} />Mujer
                            <input type="radio" name="genero" value="otro" ref={this.generoOtroRef} />Otro
                        </div>
                            <div className="clearfix"></div>
                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>

                    </div>
                    <Sidebar blog={false} />
                </div>
            </div>
        );
    }
}

export default Formulario;