import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Global from '../Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator'; //instalar simple-react-validator 

class CreateArticle extends Component {

    titleRef = React.createRef();
    contentRef = React.createRef();

    url = Global.url;

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    componentWillMount() {
        this.validator = new SimpleReactValidator();
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        })
    }

    saveArticle = (e) => {
        e.preventDefault();

        //relenar el state con el forulario
        this.changeState();

        if (this.validator.allValid()) { //validar formualrio

            //peticion http por post
            Axios.post(`${this.url}save`, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: "waiting" //esperar para comprobar si existe imagen que subir que se combrueba en el siguiente condiconal
                        });

                        //subir la imagen
                        if (this.state.selectedFile !== null) {

                            //sacar el id del articulo guardado
                            const articleId = this.state.article._id

                            //crear un form data y añadir fichero
                            const formData = new FormData();
                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            )

                            //peticion ajax
                            Axios.post(`${this.url}upload-image/${articleId}`, formData)
                                .then((res) => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: "success"
                                        });

                                    } else {
                                        this.setState({
                                            status: "failed"
                                        });
                                    }
                                })
                        } else {
                            this.setState({
                                status: "success"
                            })
                        }

                    } else {
                        this.setState({
                            status: "failed"
                        })
                    }
                })
        }else{
            this.setState({
                status: "failed"
            })
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    fileChange = (event) => {
        //console.log(event)
        this.setState({
            selectedFile: event.target.files[0] // como pueden venir varios y los archivos se guardan en un array ponemos [0] (por eso name="file0")
        })
        console.log(this.state)

    }


    render() {
        if (this.state.status === "success") {
            return <Redirect to="/blog"></Redirect>
        }
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear articulo</h1>
                    <form className="mid-form" onSubmit={this.saveArticle} >
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />

                            {this.validator.message('title', this.state.article.title, 'required|alpha')}

                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState} ></textarea>

                        </div>

                        <div className="form-group">
                            <label htmlFor="file0" ref={this.imageRef}>Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />

                        </div>

                        <div className="clearfix"></div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>
                <Sidebar />
            </div>
        );
    }

}

export default CreateArticle;