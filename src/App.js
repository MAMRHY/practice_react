// import logo from './logo.svg';
import './App.css';

import Head from './components/header'
import Aside from './components/aside'

import { Route, Switch, Redirect} from 'react-router-dom'
import {adminRoutes} from './routes/routes'

// 做一个判断是否登录，没登录就走登录页面
import { isLogin } from './utils/auth'
 

function App() {
  return isLogin()? (
    <div className="App">
        <Head/>
        <div className='container'>
            <Aside></Aside>
            <div className='routeComponent'>
              <Switch>
                {adminRoutes.map((route)=>{
                  return <Route key={route.path} {...route}  render={routeProps=>{
                  return <route.component {...routeProps}/>
                  }} />
                })}
                <Redirect to='/admin/home'  from='/admin' />
                <Redirect to='/404' />
              </Switch>
            </div>
        </div>
    </div>
  ):(
    <Redirect to='/login' />
  );
}



export default App;
