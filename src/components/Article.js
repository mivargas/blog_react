import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';
import Sidebar from './Sidebar';
import Global from '../Global';
import Moment from 'react-moment';
import imageDefault from '../assets/images/image-no-image.png'
import Swal from 'sweetalert2';

class Article extends Component {

    url = Global.url;
    state = {
        article: false,
        status: null
    }

    getArticle = () => {
        const articleId = this.props.match.params.id

        Axios.get(`${this.url}article/${articleId}`)
            .then((res) => {
                console.log(res.data.article)
                this.setState({
                    article: res.data.article,
                    status: "success"
                })
            })
            .catch((err) => {
                this.setState({
                    status: "error"
                })
            })
    }

    deleteArticle = (id) => {

        Swal.fire({
            title: '¿Seguro de eliminar?',
            text: `Usted va a eliminar el registro de ${this.state.article.title}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, Eliminarlo!',
            cancelButtonText: '¡No, cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.delete(`${this.url}article/${id}`)
                    .then(res => {
                        this.setState({
                            article: res.data.article,
                            status: "deleted"
                        })
                    })
                Swal.fire(
                    '¡Elimnado!',
                    'El articulo ha sido elominado.',
                    'success'
                )
            }
        })

    }

    componentDidMount() {
        this.getArticle()
    }

    render() {
        if (this.state.status === "deleted") {
            return <Redirect to="/blog" />
        }
        let article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    {this.state.article && this.state.status === "success" &&
                        <div id="article">
                            <article className="article-item article-detail">
                                <div className="image-wrap">
                                    {article.image !== null ? (
                                        <img src={`${this.url}/get-image/${article.image}`}
                                            alt={article.title} />
                                    ) :
                                        (
                                            <img src={imageDefault}
                                                alt={article.title} />
                                        )
                                    }
                                </div>
                                <h1 className="subheader">{article.title}</h1>
                                <span className="date">
                                    <Moment fromNow>{article.date}</Moment>
                                </span>
                                <p>
                                    {article.content}
                                </p>

                                <Link to={'/blog/editar/'+article._id} className="btn btn-warning">Editar</Link>
                                <button onClick={() => {
                                    this.deleteArticle(article._id)
                                }}  className="btn btn-danger">eliminar</button>

                                <div className="clearfix"></div>
                            </article>
                        </div>
                    }
                    {!this.state.article && this.state.status === "error" &&
                        <div id="article">
                            <h2 className="suheader">No se concontro articulo</h2>
                            <p>Intentelo más tarde</p>
                        </div>
                    }

                    {!this.state.article && this.state.status === null &&
                        <div id="article">
                            <h2 className="suheader">Cargando...</h2>
                            <p>Espere mientras carga el contenido</p>
                        </div>
                    }


                </section>

                <Sidebar />

                <div className="clearfix"></div>
            </div>
        )
    }
}

export default Article;