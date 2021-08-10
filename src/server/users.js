import {get, post, del} from '../utils/request'


export function getUsersApi(search,page,pageSize){
    return get('/users',{search,page,pageSize})
}


/**
 * 添加用户
 * @param username
 * @param password
 * @returns 
 */
export function addUserApi(n,p){
    return post('/users/add',{
        username: n,
        password: p
    })
}


/**
 * 编辑用户
 * @param id
 * @param username
 * @param password
 * @returns 
 */
export function editUserApi(id,n,p){
    return post('/users/edit',{
        id,
        username: n,
        password: p
    })
}


/**
 * 删除用户
 * @param id
 * @returns 
 */
 export function delUserApi(id){
    return del('/users/del', {id} )
}