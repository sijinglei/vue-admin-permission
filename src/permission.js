import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/home' })
            NProgress.done()
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    // note: 角色必须是对象数组！例如：['admin']或，['developer'，'editor']
                    const { roles } = await store.dispatch('user/getInfo')
                    // const roles = ['admin']
                    // 根据角色生成可访问的路线图
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    // 动态添加可访问的路线
                    router.addRoutes(accessRoutes)

                    // hack方法，以确保addRoutes是完整的
                    // 设置replace：true，因此导航将不会留下历史记录
                    next({ ...to, replace: true })
                } catch (error) {
                    // 删除token并进入登录页面重新登录
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            //在免费登录白名单中，直接进入
            next()
        } else {
            // 其他无权访问的页面将被重定向到登录页面。
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
