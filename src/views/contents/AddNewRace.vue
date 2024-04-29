<template>
  <body>
    <CommonHeader :title="'친선 횟수 추가'" />
    <section id="content">
      <table>
        <thead>
        <tr>
          <th>선택</th>
          <th>닉네임</th>
          <th>스피드 군</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(itm, idx) in membersList" :key="idx">
            <td>
              <input type="checkbox" :id="'chkbox' + itm.seq" @change="pageFunc.raceAdd(itm)" />
            </td>
            <td>{{ itm.nickname }}</td>
            <td>{{ itm.kartTierKo }}</td>
          </tr>
        </tbody>
      </table>
      <button id="loadMore" v-if="!isLast" @click="pageFunc.getMoreMemberList()">더보기</button>
      <button id="addMore" @click="pageFunc.callRaceAddApi()">횟수 추가</button>
    </section>
  </body>
</template>
<script>
import CommonHeader from "@/components/CommonHeader.vue";
import {krmanage} from "@/plugins/krmanage.js";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: 'AddNewRace',
  components: {CommonHeader},
  setup() {

    const { $api, $ui, $utils } = krmanage()
    const router = useRouter();
    const store = useStore();

    const adminInfo = ref({})

    const membersList = ref([])
    const pageNumber = ref(0)
    const isLast = ref(false)

    const raceAddList = ref([])

    const pageFunc = {
      getAllMemberList: () => {
        let params = {page: pageNumber.value}

        $api(`api/groupmember/paging`, {params}, 'get', res => {
          membersList.value = res.response.content
          res.response.last === true ? isLast.value = true : isLast.value = false
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "세션이 만료되었거나 없습니다. 다시 로그인 바랍니다."
          });
          router.push("/")
        })
      },
      getMoreMemberList: () => {
        pageNumber.value += 1
        let params = {page: pageNumber.value}

        $api(`api/groupmember/paging`, {params}, 'get', res => {
          res.response.content.forEach(itm => {
            membersList.value.push(itm)
          })
          res.response.last === true ? isLast.value = true : isLast.value = false
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "세션이 만료되었거나 없습니다. 다시 로그인 바랍니다."
          });
          router.push("/")
        })
      },
      raceAdd: itm => {
        if ($utils.isEmpty(raceAddList.value.find(listItm => listItm === itm))) {
          raceAddList.value.push(itm);
        } else {
          let findIndex = raceAddList.value.findIndex(listItm => listItm === itm);
          raceAddList.value.splice(findIndex, 1)
        }
        console.log(raceAddList.value)
      },
      callRaceAddApi: () => {
        if ($utils.isEmpty(raceAddList.value)) {
          $ui.alert({
            title: "실패",
            content: "선택된 멤버가 없습니다."
          });
          return false
        }

        let params = {
          groupSeq: adminInfo.value.groupSeq,
          members: raceAddList.value
        }

        $api(`api/race/add`, params, 'post', res => {
          // console.log(res)
          if (res.code === '000') {
            $ui.alert({
              title: "성공",
              content: res.message
            });
            raceAddList.value.forEach(itm => {
              document.querySelector(`#chkbox${itm.seq}`).checked = false
            })
            raceAddList.value = []
          } else {
            $ui.alert({
              title: "실패",
              content: res.message
            });
            raceAddList.value.forEach(itm => {
              document.querySelector(`#chkbox${itm.seq}`).checked = false
            })
            raceAddList.value = []
          }
        },err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "세션이 만료되었거나 없습니다. 다시 로그인 바랍니다."
          });
          router.push("/")
        })
      },
    }

    onMounted(() => {
      adminInfo.value = store.getters['getMemberInfo']
      pageFunc.getAllMemberList();
    });

    return {
      membersList,
      isLast,
      pageFunc,
    }
  }
}
</script>
<style scoped></style>