import React from "react";

import { connect } from 'react-redux'
class ComA extends React.Component {
    styles = {
        width: '300px',
        height:'130px',
        border:'2px solid',
        marginTop: '20px',
        padding: '20px'
    }
    add = ()=>{
       this.props.sendAdd()
    }
    render(){
        return (
            <div style={this.styles}>
                <h3>ComA</h3>
                <button onClick={this.add}> add </button>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        sendAdd: ()=>{
            dispatch({
                type: 'addNum'
            })
        }
    }
}

export default connect(null , mapDispatchToProps)(ComA)