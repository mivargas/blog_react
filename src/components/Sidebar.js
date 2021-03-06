import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Sidebar extends Component {

    searchRef = React.createRef();

    state =({
        search:"",
        redirect: false
    })
    
    redirectToSearch = (e) => {
        e.preventDefault()
        //alert(this.searchRef.current.value)

        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        })
    }

    render() {

        if(this.state.redirect){
            return(
                <Redirect to={`/redirect/${this.state.search}`} />
            )
        }
        
        return (
            <aside id="sidebar">
                {this.props.blog === true && //se debe usar === nunca ==
                    <div id="nav-blog" className="sidebar-item">
                        <h3>Puede hacer esto</h3>
                        <Link to={"/blog/crear"} className="btn btn-success">Crear articulo</Link>
                    </div>
                }
                <div id="search" className="sidebar-item">
                    <h3>Buscador</h3>
                    <p>Encuentra el articuliculo que buscas</p>
                    <form onSubmit={this.redirectToSearch}>
                        <input type="text" name="search" ref={this.searchRef} />
                        <input type="submit" name="submit" value="Buscar" className="btn" />
                    </form>
                </div>
            </aside>
        );
    }
}

export default Sidebar;