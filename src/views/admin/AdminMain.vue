<template>

</template>
<script>

import {krmanage} from "@/plugins/krmanage.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {ref} from "vue";

export default {
  name: 'AdminMain',
  components: {},
  setup() {

    const { $api, $ui, $utils } = krmanage()
    const router = useRouter();
    const store = useStore();

    return{

    }
  }
}
</script>
<style scoped></style>