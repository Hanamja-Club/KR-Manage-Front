import {createStore} from "vuex";
import memberStore from "@/store/modules/MemberStore.js";

export default createStore({
    modules: {
        memberStore: memberStore
    }
});