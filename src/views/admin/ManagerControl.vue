<template>
  <body>
    <hr style="height: 5px; background-color: #007bff; margin-bottom: 15px">
    <section id="content">
      <h1 style="font-size: 20pt">운영진 control</h1>
    </section>
  </body>
</template>
<script>

import {krmanage} from "@/plugins/krmanage.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {onMounted, ref, watch} from "vue";

export default {
  name: 'ManagerControl',
  components: {},
  setup() {

    const { $api, $ui, $utils } = krmanage()
    const router = useRouter();
    const store = useStore();

    const memberSearchInfo = ref({
      searchKeyword: "",
    })

    const pageFunc = {
      movePage: pageName => {
        router.push(pageName)
      },
      getMembers: () => {
        $api('api/admin/members', memberSearchInfo.value, 'post', res => {
          console.log(res)
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "권한이 없거나 세션이 없습니다. 다시 로그인 해주세요."
          });
          router.push("/")
        })
      }
    }

    onMounted(() => {
      pageFunc.getMembers()
    })

    return{
      pageFunc,
    }
  }
}
</script>
<style scoped></style>