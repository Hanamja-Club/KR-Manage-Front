<template>
  <body>
    <hr style="height: 5px; background-color: #007bff; margin-bottom: 15px">
    <section id="content">
      <h1 style="font-size: 20pt">전체 조회</h1>
      <div id="selectors">
        <input type="text" id="searchTerm" placeholder="닉네임을 입력하세요" @input="memberSearchInfo.searchKeyword = $event.target.value" />
        <button id="search" @click="pageFunc.getMembers()">검색</button>
      </div>
      <table>
        <thead>
        <tr>
          <th>선택</th>
          <th>닉네임</th>
          <th>소속</th>
          <th>권한</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(itm, idx) in managerList" :key="idx">
          <td>
            <input type="checkbox" :id="'chkbox' + itm.memberSeq" />
          </td>
          <td>{{ itm.memberName }}</td>
          <td>{{ itm.groupName }}</td>
          <td>{{ itm.memberAuthorityKo }}</td>
        </tr>
        </tbody>
      </table>
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

    const managerList = ref([])

    const pageFunc = {
      movePage: pageName => {
        router.push(pageName)
      },
      getMembers: () => {
        $api('api/admin/members', memberSearchInfo.value, 'post', res => {
          managerList.value = res.response
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
      memberSearchInfo,
      managerList,
      pageFunc,
    }
  }
}
</script>
<style scoped></style>