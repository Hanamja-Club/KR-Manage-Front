<template>
  <body>
  <CommonHeader :title="'친선경기 횟수 조회'" />

  <section id="content">
    <div id="selectors">
      <select id="periodSelect" @change="pageFunc.changePeriod($event.target.value)">
        <option value="" disabled hidden>기간을 선택하세요</option>
        <option value="daily" selected>단위 - 일별</option>
        <option value="monthly">단위 - 월별</option>
      </select>
      <input type="text" id="searchTerm" placeholder="닉네임을 입력하세요" @input="searchKeyword = $event.target.value">
      <button id="search" @click="pageFunc.searchByKeyword()">검색</button>
    </div>

    <table>
      <thead>
      <tr>
        <th>닉네임</th>
        <th>경기 횟수</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(itm, idx) in raceList" :key="idx">
        <td>{{ itm.nickname }}</td>
        <td>{{ itm.raceCount }}</td>
      </tr>
      </tbody>

    </table>
    <button id="loadMore" @click="pageFunc.pagingList()" v-if="!isLast">더보기</button>
  </section>
  </body>
</template>
<script>
import {krmanage} from "@/plugins/krmanage.js";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import CommonHeader from "@/components/CommonHeader.vue";

export default {
  name: 'RaceNum',
  components: {CommonHeader},
  setup() {

    const { $api, $ui, $utils } = krmanage()
    const router = useRouter();

    const selectPeriod = ref('daily')
    const searchKeyword = ref('')

    const raceList = ref([])
    const pageNumber = ref(0)
    const isLast = ref(false)

    const pageFunc = {
      menuControl : () => {
        document.querySelector("#mobile-nav").classList.toggle('on')
      },
      changePeriod: val => {
        selectPeriod.value = val

        if (pageNumber.value !== 0) {
          pageNumber.value = 0
        }
        const params = { page: pageNumber.value, keyword: ''};

        // 기간 별 api 호출
        $api(`api/race/${selectPeriod.value}`, {params}, 'get', res => {
          console.log(res.response.content)
          raceList.value = res.response.content
          res.response.last === true ? isLast.value = true : isLast.value = false
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "세션이 만료되었거나 없습니다. 다시 로그인 바랍니다."
          });
          router.push("/")
        })
      },
      pagingList: () => {
        pageNumber.value = pageNumber.value + 1
        const params = {
          keyword: searchKeyword.value,
          page: pageNumber.value
        }

        // 기간 별 api 호출
        $api(`api/race/${selectPeriod.value}`, {params}, 'get', res => {
            res.response.content.forEach( itm => {
              raceList.value.push(itm)
            });
          res.response.last === true ? isLast.value = true : isLast.value = false
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "세션이 만료되었거나 없습니다. 다시 로그인 바랍니다."
          });
          router.push("/")
        })
      },
      searchByKeyword: () => {
        pageNumber.value = 0

        const params = {
          keyword: searchKeyword.value,
          page: pageNumber.value
        }

        // 기간 별 api 호출
        $api(`api/race/${selectPeriod.value}`, {params}, 'get', res => {
          raceList.value = res.response.content
          res.response.last === true ? isLast.value = true : isLast.value = false
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "세션이 만료되었거나 없습니다. 다시 로그인 바랍니다."
          });
          router.push("/")
        })
      },
      routerPage: path => {
        router.push(path)
      }
    }

    onMounted(() => {
      pageFunc.changePeriod(selectPeriod.value)
    })

    return{
      selectPeriod,
      searchKeyword,
      raceList,
      isLast,
      pageFunc,
    }
  }
}
</script>
<style scoped></style>