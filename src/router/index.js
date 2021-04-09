import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '../views/Tasks.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Tasks
        },
        {
            path: '/task/:taskId?',
            name: 'task',
            props: true,
            component: () => import(
                /* webpackChunkName: "task" */
                /* webpackMode: "lazy-once" */
                '../views/Task.vue'
            ),
            beforeEnter: (to, from, next) => {
                if (to.params.taskId) {
                    next();
                } else {
                    next({name: 'home'});
                }
            }
        },
        {
            path: '/new',
            name: 'new',
            component: () => import(
                /* webpackChunkName: "new" */
                /* webpackMode: "lazy-once" */
                '../views/New.vue'
            )
        },
        {
            path: '/:notFound(.*)',
            name: 'not-found',
            component: () => import(
                /* webpackChunkName: "not-found" */
                /* webpackMode: "lazy-once" */
                '../views/NotFound.vue'
            )
        }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
});

export default router;