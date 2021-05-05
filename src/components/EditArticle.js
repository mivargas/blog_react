import Axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Global from '../Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator'; //instalar simple-react-validator 
import Swal from 'sweetalert2';
import imageDefault from '../assets/images/image-no-image.png';

// 1. recoger el articulo a editar de la url
// 2. crear un metodo para sacar ese objeto del api (backend)
// 3. rellenar el formulario con esos datos
// 4. actualizar el objeto haciendo una peticion al backend

class EditArticle extends Component {
    articleIdEdit = null//paso 1

    titleRef = React.createRef();
    contentRef = React.createRef();

    url = Global.url;

    constructor(props) { //solucion para inicalicar valor por defecto antes de montar componentes (evitar el componentWillMount())
        super(props);

        this.validator = new SimpleReactValidator({
            messages: {
                required: "Este campo es requerio"
            }
        });

        this.articleIdEdit = this.props.match.params.id // recogiendo el id (primer paso)

    }

    state = {
        article: false,
        status: null,
        selectedFile: null,
    }

    /*componentWillMount() { //deprecado
        this.validator = new SimpleReactValidator();
    }*/

    componentDidMount() {
        this.getArticle(this.articleIdEdit)
    }

    getArticle = (id) => {

        Axios.get(`${this.url}article/${id}`)
            .then((res) => {
                this.setState({
                    article: res.data.article,
                })
            })
            .catch((err) => {
                this.setState({
                    status: "error"
                })
            })
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        })

        this.validator.showMessages(); //asi se muestra en el primer tipeo
        this.forceUpdate();
    }

    saveArticle = (e) => {
        e.preventDefault();

        //relenar el state con el forulario
        this.changeState();

        if (this.validator.allValid()) { //validar formualrio

            //peticion http por post
            Axios.put(`${this.url}article/${this.articleIdEdit}`, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: "waiting" //esperar para comprobar si existe imagen que subir que se combrueba en el siguiente condiconal
                        });

                        Swal.fire({
                            title: 'Articulo modificado',
                            text: 'El articulo se ha editado correcatamente ',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                        })

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
        } else {
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
        const article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar articulo</h1>
                    {this.state.article !== false &&
                        <form className="mid-form" onSubmit={this.saveArticle} >
                            <div className="form-group">
                                <label htmlFor="title">Título</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />

                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}

                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState} ></textarea>

                                {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}

                            </div>

                            <div className="form-group">
                                <label htmlFor="file0" ref={this.imageRef}>Imagen</label>
                                
                                <input type="file" name="file0" onChange={this.fileChange} />

                                <div className="image-wrap">
                                    {article.image !== null ? (
                                        <img src={`${this.url}get-image/${article.image}`}
                                            alt={article.title} className="thumb" />
                                    ) :
                                        (
                                            <img src={imageDefault}
                                                alt={article.title} className="thumb" />
                                        )
                                    }
                                </div>

                            </div>

                            <div className="clearfix"></div>
                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }
                    {!this.state.article.title &&

                        <h1 className="subheader">Cargando...</h1>

                    }
                </section>
                <Sidebar />
            </div>
        );
    }

}

export default EditArticle;