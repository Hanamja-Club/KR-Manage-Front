import {createStore} from "vuex";
import memberStore from "@/store/modules/MemberStore.js";
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    modules: {
        memberStore: memberStore
    },
    plugins: [
        createPersistedState({
            paths: ["memberStore"]
        })
    ]
});