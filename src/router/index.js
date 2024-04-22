import {createRouter, createWebHistory} from "vue-router";
import KRA0101P01 from "@/views/KRA/KRA0101P01.vue";
import MemManage from "@/views/contents/MemManage.vue";
import RaceNum from "@/views/contents/RaceNum.vue";

const routes = [
    {
        path: '/',
        component: KRA0101P01
    },
    {
        path: '/manage',
        component: MemManage
    },
    {
        path: '/RaceNum',
        component: RaceNum
    },
]

const router = createRouter({
    history: createWebHistory(), routes
})

export {router}