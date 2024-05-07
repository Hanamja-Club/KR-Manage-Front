<template>
  <body>
    <hr style="height: 5px; background-color: #007bff; margin-bottom: 15px">
    <section id="content">
      <h1 style="font-size: 20pt">그룹</h1>
      <select id="menu">
        <option v-for="(itm, idx) in groupList" :key="idx" :value="itm.groupSeq">{{ itm.groupName }}</option>
      </select>
    </section>
  </body>
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

    const groupList = ref([])

    const pageFunc = {
      getAllGroups: () => {
        $api('api/admin/group', {}, 'get', res => {
          // console.log(res)
          groupList.value = res.response
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "권한이 없거나 세션이 없습니다. 다시 로그인 해주세요."
          });
          router.push("/")
        })
      },
    }

    onMounted(() => {
      pageFunc.getAllGroups()
    })

    return{
      groupList,
      pageFunc,
    }
  }
}
</script>
<style scoped></style>