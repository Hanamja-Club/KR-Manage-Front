<template>
관리자 페이지 입니다
</template>
<script>

import {krmanage} from "@/plugins/krmanage.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {onMounted, ref} from "vue";

export default {
  name: 'AdminMain',
  components: {},
  setup() {

    const { $api, $ui, $utils } = krmanage()
    const router = useRouter();
    const store = useStore();

    const pageFunc = {
      getAllGroups: () => {
        $api('api/admin/group', {}, 'get', res => {
          console.log(res)
        }, err => {
          console.log(err)
        })
      },
    }

    onMounted(() => {
      pageFunc.getAllGroups()
    })

    return{
      pageFunc,
    }
  }
}
</script>
<style scoped></style>