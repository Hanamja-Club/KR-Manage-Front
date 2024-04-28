<template>
  <CommonHeader :title="'회원 관리'" />
  <section id="content">
    <select id="menu" @change="pageFunc.selectMemberBySeq($event.target.value)">
      <option value="none">회원을 선택하세요</option>
      <option v-for="(itm, idx) in memberList" :key="idx" :value="itm.seq">{{ itm.nickname }}</option>
    </select>

    <div id="info">
      <div>
        <h2 id="name">이름:</h2>
        <p id="name-info">{{ selectedMember.nickname }}</p>
      </div>
      <div>
        <h2 id="nickname">닉네임:</h2>
        <p id="nickname-info">{{ selectedMember.nickname }}</p>
      </div>
      <div>
        <h2 id="club">소속:</h2>
        <p id="club-info">{{ selectedMember.groupName }}</p>
      </div>
      <div>
        <h2 id="rank-tier">스피드 군:</h2>
        <p id="rank-tier-info">{{ selectedMember.kartTierKo }}</p>
      </div>
    </div>
  </section>
  <div class="buttons">
    <button id="editMem" v-if="isSelectedMember">회원정보 수정</button>
    <button id="deleteMem" v-if="isSelectedMember">회원 삭제</button>
  </div>
</template>
<script>
import {krmanage} from "@/plugins/krmanage.js";
import CommonHeader from "@/components/CommonHeader.vue";
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";

export default {
  name: 'MemManage',
  components: {CommonHeader},
  setup() {

    const { $api, $ui, $utils } = krmanage()
    const router = useRouter();

    const memberList = ref([])
    const selectedMember = ref({})

    const isSelectedMember = ref(false)

    const pageFunc = {
      menuControl : () => {
        document.querySelector("#mobile-nav").classList.toggle('on')
      },
      initMembers: () => {
        $api('api/groupmember', {}, 'get', res => {
          if (res.code === '000') {
            memberList.value = res.response
          }
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "세션이 만료되었거나 없습니다. 다시 로그인 바랍니다."
          });
          router.push("/")
        })
      },
      selectMemberBySeq: seq => {
        if (seq != "none") {
          selectedMember.value = memberList.value.filter(itm => itm.seq == seq)[0];
        } else {
          selectedMember.value = {}
        }
      }
    }

    watch(selectedMember, () => {
      $utils.isEmpty(selectedMember.value) ? isSelectedMember.value = false : isSelectedMember.value = true
    })

    onMounted(() => {
      pageFunc.initMembers();
    })

    return{
      memberList,
      selectedMember,
      isSelectedMember,
      pageFunc,
    }
  }
}
</script>
<style scoped></style>