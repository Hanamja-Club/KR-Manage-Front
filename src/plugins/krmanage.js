import {inject} from "vue";

export function krmanage() {
    return {
        $api: inject('$api'),
        $utils: inject('$utils'),
        $ui: inject('$ui'),
    }
}