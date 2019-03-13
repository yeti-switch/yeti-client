import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard'
import Login from '../components/Login'
import NotFound from '../components/NotFound'
import Cdr from '../components/Cdr'

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: 'login'
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/404',
            name: 'notfound',
            component: NotFound
        },
        {
            path: '/cdr',
            name: 'cdr',
            component: Cdr
        },
        {
            path: '*',
            redirect: {
                name: 'notfound'
            }
        },
    ]
})