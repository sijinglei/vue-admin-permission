import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则项目不会显示在边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           如果设置noRedirect，则不会在面包屑中重定向
 * name:'router-name'             该名称由<keep-alive>使用（必须设置！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（您可以设置多个角色）
    title: 'title'               名称显示在侧边栏和面包屑中（推荐设置）
    icon: 'svg-name'/'el-icon-x' 侧栏中的图标显示
    breadcrumb: false            如果设置为false，则该项目将隐藏在面包屑中（默认为true）
    activeMenu: '/example/list'  如果设置了路径，则侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
 * 可以访问所有角色
 */
export const constantRoutes = [{
        path: "/login",
        component: () => import("@/views/login/index"),
        hidden: true
    },
    {
        path: "/404",
        component: () => import("@/views/404"),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: 'Dashboard', icon: 'dashboard' }
        }]
    },
    {
        path: "/my",
        component: Layout,
        redirect: "/my/ower",
        hidden: true,
        children: [{
            path: "ower",
            name: "个人中心",
            component: () => import("@/views/ower"),
            meta: { title: "个人中心" },
            hidden: true
        }]
    },
    {
        path: "/example",
        component: Layout,
        // redirect: '/example/table',
        name: "Example",
        meta: { title: "Example", icon: "el-icon-s-help" },
        children: [{
                path: "table",
                name: "Table",
                component: () => import("@/views/table/index"),
                meta: { title: "Table", icon: "table" }
            },
            {
                path: "tree",
                name: "Tree",
                component: () => import("@/views/tree/index"),
                meta: { title: "Tree", icon: "tree" }
            }
        ]
    },

    {
        path: "/form",
        component: Layout,
        children: [{
            path: "index",
            name: "Form",
            component: () => import("@/views/form/index"),
            meta: { title: "Form", icon: "form" }
        }]
    }
];

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [{
    path: "/setting",
    component: Layout,
    redirect: '/setting/roles',
    name: "系统设置",
    meta: { title: "系统设置", icon: "el-icon-s-tools" },
    children: [{
            path: "roles",
            name: "角色列表",
            component: () => import("@/views/setting/roles"),
            meta: { title: "角色列表" }
        },
        {
            path: "menu",
            name: "菜单配置",
            component: () => import("@/views/setting/menu"),
            meta: { title: "菜单配置" }
        },
        {
            path: "users",
            name: "人员配置",
            component: () => import("@/views/setting/users"),
            meta: { title: "人员配置" }
        }
    ]
}];

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
