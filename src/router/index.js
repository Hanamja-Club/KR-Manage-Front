import {createRouter, createWebHistory} from "vue-router";
import KRA0101P01 from "@/views/KRA/KRA0101P01.vue";

const routes = [
    {
        path: '/',
        component: KRA0101P01
    }
]

const router = createRouter({
    history: createWebHistory(), routes
})

export {router}