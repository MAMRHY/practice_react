import {get, post, del} from '../utils/request'

export function getArticlesApi(page,pageSize){
    return get('/articles',{page,pageSize})
}


export function getTagsClassifyApi(){
    return get('/articles/tagsClassify')
}

export function addArticlesApi(val){
    return post('/articles/add',val)
}

export function getArticleInfoApi(id){
    return get('/articles/info',{id})
}

export function delArticleApi(id){
    return del('/articles/del',{id})
}