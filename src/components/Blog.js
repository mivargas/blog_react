import React, { Component } from 'react';
import Articles from './Articles';
import Sidebar from './Sidebar';
import Slider from './Slider';

class Blog extends Component {


    render() {

        return (
            <div id="blog">
                <Slider
                    titleSlider="Blog"
                    sliderZise="slider-small"
                />
                <div className="center">
                    <div id="content">
                        <Articles />
                    </div>
                    <Sidebar blog={true} />
                </div>
            </div>
        );
    }
}

export default Blog;