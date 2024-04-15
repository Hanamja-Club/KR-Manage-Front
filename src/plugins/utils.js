import {isEmpty} from "lodash";

export default {
    install: (app, {}) => {
        const utils = {
            isEmpty : val => {
                return isEmpty(val)
            }
        }
        app.config.globalProperties.$utils = utils
        app.provide('$utils', utils)
    },
}