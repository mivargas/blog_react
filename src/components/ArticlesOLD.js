import React, { Component } from 'react'
import Axios from 'axios'

class Articles extends Component {
    state = {
        articles: {},
        status: false
    }

    getArticles = () => {
        Axios.get("http://localhost:3900/api/articles")
            .then(res => {
                console.log(res.data.articles)
                this.setState({
                    articles: res.data.articles,
                    status: "success"
                })
            })

    }

    componentDidMount() {
        this.getArticles()
    }

    render() {
        return (
            <div id="article">
                <h3>hola articulos</h3>
                {this.state.status === "success" &&

                    <div>
                        {this.state.articles.map(article => {
                            return (
                                <p key={article._id}>{article.title}</p>
                            )
                        })}
                    </div>

                }

            </div>
        )
    }
}


export default Articles;