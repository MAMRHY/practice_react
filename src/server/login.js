import {post} from '../utils/request'

export function loginApi(loginInfo){
    return post('/users/login', loginInfo)
}