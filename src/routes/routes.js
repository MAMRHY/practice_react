import Home from "../views/Home";
import Hookdemo from "../views/Hookdemo";
import Loginform from "../views/Loginform";
import Reactredx from "../views/reactRedx";
import Redx from "../views/redx";
import UserList from "../views/UserList";
import ViewNotFind from "../views/viewNotFind";
import Message from "../views/Message";
import Classify from "../views/Classify";
import Tags from "../views/Tags";
import Articles from "../views/Articles";
import AddArticle from '../views/Articles/AddArticle'
import EditArticle from '../views/Articles/EditArticle'


export const mainRoutes = [
    {
        path: '/login',
        component: Loginform
    },
    {
        path: '/404',
        component: ViewNotFind
    }
]

export const adminRoutes = [
    {
        path: '/admin/home',
        component: Home
    },{
        path: '/admin/userList',
        component: UserList
    },{
        path: '/admin/hook',
        component: Hookdemo
    },{
        path: '/admin/redx',
        component: Redx
    },{
        path: '/admin/reactredx',
        component: Reactredx
    },{
        path: '/admin/message',
        component: Message
    },{
        path: '/admin/articles',
        component: Articles
    },{
        path: '/admin/addArticle',
        component: AddArticle
    },{
        path: '/admin/editArticle/:id',
        component: EditArticle
    },{
        path: '/admin/classify',
        component: Classify
    },{
        path: '/admin/tags',
        component: Tags
    }
]