<template>
  <body>
    <hr style="height: 5px; background-color: #007bff; margin-bottom: 15px">
    <section id="content">
      <h1 style="font-size: 20pt">그룹</h1>
      <select id="menu" @change="selectedGroupSeq = $event.target.value">
        <option value="">모든 그룹</option>
        <option v-for="(itm, idx) in groupList" :key="idx" :value="itm.groupSeq">{{ itm.groupName }}</option>
      </select>
      <button id="addNew" @click="pageFunc.deleteGroup()">그룹 삭제</button>
      <hr style="margin-bottom: 35px; margin-top: 35px;">

      <h1 style="font-size: 20pt">그룹 추가 (클럽, 크루)</h1>
      <select id="menu" style="margin-bottom: 35px;">
        <option value="">그룹 구분</option>
        <option value="club">클럽</option>
        <option value="crew">크루</option>
      </select>
      <div id="typeNick">
        <input type="text" id="write" placeholder="추가할 그룹명" />
      </div>
      <button id="addNew">그룹 추가</button>
      <hr style="margin-bottom: 35px; margin-top: 35px;">
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

    const selectedGroupSeq = ref(0)

    const addGroup = ref({
      groupName: "",
      groupType: "",
    })

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
      deleteGroup: () => {
        if ($utils.isEmpty(selectedGroupSeq.value)) {
          $ui.alert({
            title: "실패",
            content: "그룹을 선택해주세요."
          });
          return false
        }
        $api(`api/admin/group/${selectedGroupSeq.value}`, {}, 'delete', res => {
          console.log(res)
          if (res.code === "000") {
            $ui.alert({
              title: "성공",
              content: res.message
            });
            pageFunc.getAllGroups()
          }
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
      pageFunc.getAllGroups()
    })

    return{
      groupList,
      selectedGroupSeq,
      addGroup,
      pageFunc,
    }
  }
}
</script>
<style scoped></style>