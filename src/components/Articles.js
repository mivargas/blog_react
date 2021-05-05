import React, { Component } from 'react'
import Axios from 'axios'
import Global from "../Global";
import imageDefault from '../assets/images/image-no-image.png';
import Moment from 'react-moment'; //insalar por npm
import 'moment/locale/es'; // si se desea formato español
import {Link} from 'react-router-dom';

class Articles extends Component {
    url = Global.url;
    state = {
        articles: {},
        status: false
    }

    getArticles = () => {
        Axios.get(`${this.url}/articles`)
            .then(res => {
                console.log(res.data.articles)
                this.setState({
                    articles: res.data.articles,
                    status: "success",
                    headerTitle: "Listado de articulos"
                })
            })

    }
    getLastArticles = () =>{
        Axios.get(`${this.url}/articles/last`)
            .then((res)=>{
                this.setState({
                    articles: res.data.articles,
                    status: "success",
                    headerTitle: "Últimos articulos"
                })
            })
    }

    getArticlesBySearch = (searched) =>{
        Axios.get(`${this.url}/search/${searched}`)
            .then((res)=>{
                this.setState({
                    articles: res.data.articles,
                    status: "success",
                    headerTitle: ""
                })
            })
            .catch(err => {
                this.setState({
                    articles: [],
                    status: "success", //se necesita el article[](vacio) y el status success para que muestre el bloque jsx que dice "No se han encotrado articulos"
                })
            })
    }

    componentDidMount() {
        const isHome= this.props.home;
        const search = this.props.search
        if (isHome) {
            this.getLastArticles()            
        } else if(search !== null && search !== undefined){
            this.getArticlesBySearch(search)    
        }else{
            this.getArticles()  
        }
        
    }

    render() {
        if (this.state.articles.length >= 1) {

            var listArticles = this.state.articles.map(article => {
                return (
                    <article className="article-item" key={article._id}>
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
                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment locale="es" fromNow>{article.date}</Moment>
                        </span>
                        <Link to={`/blog/articulo/${article._id}`}>Leer más</Link>
                        <div className="clearfix"></div>
                    </article>
                )
            })

            return (
                
                <div id="article">
                    <h2 className="subheader">{this.state.headerTitle}</h2>
                    {listArticles}
                </div>
            )
        } else if (this.state.articles.length === 0 && this.state.status === "success") {
            return (
                <div id="article">
                    <h2 className="subheader">NO HAY ARTICULOS PARA MOSTRAR</h2>
                    <p>Todavia no hay contenido en esta seccion</p>

                </div>
            )
        } else {
            return (
                <div id="article">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras carga el contenido</p>

                </div>
            )
        }
    }
}


export default Articles;