/**
 * action 的构建函数
 */

const sendAction = ()=>{
    //返回一个action对象
    return {
        type: 'send_type',
        value: '我是一个action'
    };
};

module.exports ={sendAction} ;