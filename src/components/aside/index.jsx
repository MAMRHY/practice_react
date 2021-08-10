import react from 'react'
import './index.css'
import {HashRouter as Router,NavLink} from 'react-router-dom'

export default class Aside extends react.Component{
    
    render(){
        return (
           <Router>
                <div className='aside'>
                    <ul className='ul'>
                        <li>
                            <NavLink to="/admin/userList" activeClassName="actived">用户列表</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/hook" activeClassName="actived">HOOK学习</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/redx" activeClassName="actived">redux学习</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/reactredx" activeClassName="actived">react-redux学习</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/message" activeClassName="actived">组件传值</NavLink>
                        </li>
                    </ul>
                </div>
           </Router>
        )
    }
}