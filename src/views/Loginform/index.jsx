import React from 'react'
import './index.css'
import {setToken} from '../../utils/auth'
import {loginApi} from '../../server/login'
// import axios from 'axios';

export default class Loginform extends React.Component{
    state={
        username: '',
        psw: '',
        tip: '',
        tip1: ''
    }
    login = ()=>{
        if(this.vaild(this.state.username)){
            this.setState({
                tip : ""
            })

            loginApi({
                username: this.state.username,
                password: this.state.psw
              })
              .then( (res) => {
                if(res.code === 200){
                    // 保存登录
                    setToken(res.id)
                    this.props.history.push('/admin/home')
                }else{
                    this.setState({
                        tip : res.message
                    })
                }
              })
              .catch( (error) =>{
                console.log(error);
              });


        }else{
            this.setState({
                tip : "用户名不能为空"
            })
        }
    }
    vaild(val){
        if(val === ''){
            return false
        }
        return true
    }
    handleChange(e){
        this.setState({
            username : e.target.value
        })
    }
    handlePsw(e){
        this.setState({
            psw : e.target.value
        })
    }
    render(){
        return (
                <div className='login'>
                    <form >
                        <p>用户名： 
                            <input className="inputbox" type="text" onChange={this.handleChange.bind(this)} name="username" value={this.username}  /> 
                            <span className="tip">{this.state.tip}</span>
                        </p>
                        <p>密　码： 
                            <input className="inputbox" type="password" onChange={this.handlePsw.bind(this)} name="password" value={this.psw}  /> 
                            <span className="tip">{this.state.tip1}</span>
                        </p>
                    </form>
                    <button className="btn" onClick={this.login}>登录</button>
                </div>
        )
    }
}

