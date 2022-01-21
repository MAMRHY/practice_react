import {get, post, del} from '../utils/request'

export function getClassifyApi(page,pageSize){
    return get('/classify',{page,pageSize})
}

export function addClassifyApi(name){
    return post('/classify/add',{name})
}

export function editClassifyApi(id,name){
    return post('/classify/edit',{id,name})
}

export function delClassifyApi(id){
    return del('/classify/del', {id})
}