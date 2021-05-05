import React, { Component }from 'react'

class Estaf extends Component {
    pf = React.createRef();
    state = {
        arc:{},
        sta: null
    }

    cha = () =>{
        this.setState({
            arc: this.pf.current.value,
            sta: "si"
        })

        
       
    }

    render(){
        console.log(this.state)
        return(
            <React.Fragment>
                <input name="prueba" ref={this.pf} onChange={this.cha}/>
            </React.Fragment>
        );
    }
}

export default Estaf;