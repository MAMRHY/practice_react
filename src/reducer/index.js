/**
 * 创建reducer,专门处理发送过来的action
 */

const initState = {
    value: '默认值',
    num: 0
}

const reducer = (state = initState,action)=>{
    console.log(action);
    switch (action.type) {
        case 'send_type':
            return Object.assign({},state,action)
        case 'addNum':
            return {
                num: state.num+1
            }
        default:
            return state
    };
};

module.exports = {reducer};