import React from "react";
import { connect } from "react-redux";

class ComB extends React.Component {

    styles = {
        width: '300px',
        height:'200px',
        border:'2px solid',
        margin: '20px 0',
        padding: '20px'
    }
    send = ()=>{
        this.props.sonSend('这是给父组件的值')
    }
    render(){
        return (
            <div style={this.styles}>
                <h3>ComB</h3>
                <p>{this.props.num}</p>
                <p>父组件传来的值：{this.props.faName}</p>
                <button onClick={this.send}>给父组件传值</button>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return state
}

export default connect(mapStateToProps)(ComB)

