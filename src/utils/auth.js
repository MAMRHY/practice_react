export function getToken(){
    return localStorage.getItem('token');
}

export function setToken(token){
    return localStorage.setItem('token',token);
}


export function isLogin(){
    if(localStorage.getItem('token')){
        return true
    }else{
        return false
    }
}