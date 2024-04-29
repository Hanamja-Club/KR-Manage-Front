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
<!--        <p id="name-info">{{ selectedMember.nickname }}</p>-->
        <input type="text" id="name-info" :value="selectedMember.nickname" readonly />
      </div>
      <div>
        <h2 id="nickname">닉네임:</h2>
<!--        <p id="nickname-info">{{ selectedMember.nickname }}</p>-->
        <input type="text" id="nickname-info" :value="selectedMember.nickname" @input="selectedMember.nickname = $event.target.value" />
      </div>
      <div>
        <h2 id="club">소속:</h2>
<!--        <p id="club-info">{{ selectedMember.groupName }}</p>-->
        <input type="text" id="club-info" :value="selectedMember.groupName" readonly />
      </div>
      <div>
        <h2 id="rank-tier">스피드 군:</h2>
<!--        <p id="rank-tier-info">{{ selectedMember.kartTierKo }}</p>-->
<!--        <input type="text" id="rank-tier-info" :value="selectedMember.kartTierKo" />-->
        <select id="menu" class="goon" @input="selectedMember.kartTierKo = $event.target.value">
          <option value="">군을 입력해주세요</option>
          <option value="V_STRONG">강주력</option>
          <option value="STRONG">주력</option>
          <option value="FIRST">1군</option>
          <option value="SECOND">2군</option>
          <option value="THIRD">3군</option>
          <option value="FOURTH">4군</option>
          <option value="NORMAL">일반</option>
        </select>
      </div>
    </div>
  </section>
  <div class="buttons">
    <button id="editMem" v-if="isSelectedMember" @click="pageFunc.updateMember()">회원정보 수정</button> &nbsp;
    <button id="deleteMem" v-if="isSelectedMember" @click="pageFunc.deleteMember()">회원 삭제</button>
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
            document.querySelector('.goon').value = ''
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
          document.querySelector('.goon').value = selectedMember.value.kartTier
        } else {
          selectedMember.value = {}
          document.querySelector('.goon').value = ''
        }
      },
      updateMember: () => {
        if ($utils.isEmpty(selectedMember.value.kartTier)) {
          $ui.alert({
            title: "실패",
            content: "군은 반드시 입력되어야합니다."
          });
          return false
        }
        $api(`api/groupmember/${selectedMember.value.seq}`, selectedMember.value , 'post', res => {
          console.log(res)
          if (res.code === '000') {
            $ui.alert({
              title: "성공",
              content: res.message,
            });
            pageFunc.afterUpdate();
          }
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "세션이 만료되었거나 없습니다. 다시 로그인 바랍니다."
          });
          router.push("/")
        })
      },
      afterUpdate: () => {
        selectedMember.value = {}
        document.querySelector("#menu").value = 'none'
        pageFunc.initMembers()
      },
      deleteMember: () => {
        $api(`api/groupmember/${selectedMember.value.seq}`, {}, 'delete', res => {
          console.log(res)
          if (res.code === '000') {
            $ui.alert({
              title: "성공",
              content: res.message,
            });
            pageFunc.afterUpdate();
          }
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "세션이 만료되었거나 없습니다. 다시 로그인 바랍니다."
          });
          router.push("/")
        })
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