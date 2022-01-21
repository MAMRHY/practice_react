import {get, post, del} from '../utils/request'

export function getTagsApi(page,pageSize){
    return get('/tags',{page,pageSize})
}

export function addTagsApi(name){
    return post('/tags/add',{name})
}

export function editTagsApi(id,name){
    return post('/tags/edit',{id,name})
}

export function delTagsApi(id){
    return del('/tags/del', {id})
}