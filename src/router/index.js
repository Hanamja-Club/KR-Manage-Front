import {createRouter, createWebHistory} from "vue-router";
import KRA0101P01 from "@/views/KRA/KRA0101P01.vue";
import MemManage from "@/views/contents/MemManage.vue";
import RaceNum from "@/views/contents/RaceNum.vue";
import NewMember from "@/views/contents/NewMember.vue";
import AddNewRace from "@/views/contents/AddNewRace.vue";

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
    {
        path: '/NewMember',
        component: NewMember
    },
    {
        path: '/AddNewRace',
        component: AddNewRace
    },
]

const router = createRouter({
    history: createWebHistory(), routes
})

export {router}