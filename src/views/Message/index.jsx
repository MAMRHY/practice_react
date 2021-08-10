import react from 'react'
import ComB from '../../components/comB'

export default class Father extends react.Component{
    state ={
        name: '我是父组件',
        val: ''
    }
    getSon = (data)=>{
        this.setState({
            val: data
        })

    }
    render(){
        return (
        <div style={ {margin: "30px" }}>
            <h1>Father</h1>
            <ComB sonSend={this.getSon}  faName={this.state.name} />
            <p>接收到子组件的值：{this.state.val}</p>
        </div>
        )
    }

}