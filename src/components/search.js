import React, { Component } from 'react';
import Articles from './Articles';
import Sidebar from './Sidebar';
import Slider from './Slider';

class Search extends Component {


    render() {
        const searched = this.props.match.params.search

        return (
            <div id="search">
                <Slider
                    titleSlider={`Busqueda: ${searched}`}
                    sliderZise="slider-small"
                />
                <div className="center">
                    <div id="content">
                        <Articles search={searched} />
                    </div>
                    <Sidebar blog={true} />
                </div>
            </div>
        );
    }
}

export default Search;