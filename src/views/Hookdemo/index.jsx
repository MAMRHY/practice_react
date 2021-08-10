import { useState } from "react"
import './index.css'

export default function Hookdemo(){
    const [num, setNum] = useState(0)
    const [name, setName] = useState('miemie')

    function handelName(e){
        setName(e.target.value)
    }

    return (<div className='hook01'>
        <h1>hello hook</h1> 
        <p className='p1'> <b>state hook 基础用法：</b> </p>
        <div>
            <p>当前num为：{num}</p>   
            <button onClick={() => { setNum(num+1) } } > num +1</button>
        </div>

        <p className='p1'> <b>state hook 多个值的用法：</b> </p>
        <div>
            昵称：<input type="text"  value={name} onChange={handelName} />
            <p>welcome {name} !</p>
        </div>




    </div>)
}