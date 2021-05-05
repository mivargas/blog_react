import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Slider from './Slider';
import axios from "axios"

class Blog extends Component {

    state = {
        articles: {},
        status: null // necesario para validar que el componente no cargue antes que ña data (detona error). lo cambiamos a "success" en el metodo ajax axios getArticles
    }

    getArticulos = () => {
        axios.get("http://localhost:3900/api/articles")
            .then(res => {
                console.log(res.data)

                this.setState({
                    articles: res.data.articles,
                    status: "success"
                })

            })
    }

    componentDidMount() {
        this.getArticulos()
    }

    render() {

        return (
            <div id="blog">
                <Slider
                    titleSlider="Blog"
                    sliderZise="slider-small"
                />
                <div className="center">
                    <div id="content">

                        {this.state.status === "success" && //validamosque esta cargada la data antes de mostrar los datos en el map
                            <div>
                                {this.state.articles.map((article) => {
                                    return (
                                        <h3 key={article._id}>
                                            {article.title}
                                        </h3>
                                    )
                                })}
                            </div>
                        }

                    </div>
                    <Sidebar blog={true} />
                </div>
            </div>
        );
    }
}

export default Blog;