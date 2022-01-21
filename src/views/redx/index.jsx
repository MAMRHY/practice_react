import store from '../../store'
import {sendAction} from '../../action'
// import React  from 'react';
import { useEffect, useState } from 'react';


export default function Redx(){
    const [setA] = useState('')
    useEffect(()=>{
        store.subscribe(()=>{
            console.log(store.getState());
            setA()
        })
    })

    function handelClick (){
        const action = sendAction();
        store.dispatch(action)
    }
    return (
        <div style={ {margin: "30px"}}>
            <h1>hello redux!</h1>

            <div>
                <button onClick={handelClick}>click me, send a action</button>
                <p>{ store.getState().value}</p>
            </div>
        </div>
    )
}


// export default class Redx extends React.Component{
    

//     handelClick =()=>{
//         const action = sendAction();
//         console.log(action);
//         // store.dispatch(action)
//     }
//     render(){
//         return (
//             <div style={ {margin: "30px"}}>
//                 <h1>hello redux!</h1>
    
//                 <div>
//                     <button onClick={this.handelClick}>click me, send a action</button>
//                     <p>{ store.getState().value}</p>
//                 </div>
//             </div>
//         )
//     }
// }