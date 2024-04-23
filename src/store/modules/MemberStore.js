const memberStore = {
    namespace : true,
    state: {
        memberInfo : {},
    },

    getters: {
        getMemberInfo(state) {
            return state.memberInfo
        },
    },

    mutations: {
        setMemberInfo(state, data) {
            state.memberInfo = data
        },
    }
}

export default memberStore