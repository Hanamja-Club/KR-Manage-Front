<template>
  <body>
    <CommonHeader :title="'신규 팀원 추가'" />

    <section id="content">
  <!--    <div id="clubOrcrew">-->
  <!--      <h2>클럽/크루 명</h2>-->
  <!--      <select id="menu">-->
  <!--        <option value="none">클럽/크루를 골라주세요.</option>-->
  <!--        <option value="john-doe">John Doe</option>-->
  <!--        <option value="jane-smith">Jane Smith</option>-->
  <!--      </select>-->
  <!--    </div>-->

      <div id="typeNick">
        <h2>닉네임</h2>
        <input type="text" id="write" placeholder="닉네임을 입력해주세요." @input="pageFunc.nickNameCheck($event.target.value)">
      </div>
      <div id="clubOrcrew">
        <h2>스피드 군</h2>
        <select id="menu" @change="pageFunc.goonCheck($event.target.value)">
          <option value="none">군을 고르세요.</option>
          <option value="V_STRONG">강주력</option>
          <option value="STRONG">주력</option>
          <option value="FIRST">1군</option>
          <option value="SECOND">2군</option>
          <option value="THIRD">3군</option>
          <option value="FOURTH">4군</option>
          <option value="NORMAL">일반</option>
        </select>
      </div>
      <button id="addNew" v-if="isValid" @click="pageFunc.addNewMember()">팀원 추가하기</button>
    </section>
  </body>
</template>
<script>
import CommonHeader from "@/components/CommonHeader.vue";
import {krmanage} from "@/plugins/krmanage.js";
import {useRouter} from "vue-router";
import {onMounted, ref, watch} from "vue";
import {useStore} from "vuex";

export default {
  name: 'NewMember',
  components: {CommonHeader},
  setup() {

    const { $api, $ui, $utils } = krmanage()
    const router = useRouter();
    const store = useStore();

    const adminInfo = ref({})

    const checkedNickName = ref('')
    const goon = ref('')
    const isValid = ref(false)

    const pageFunc = {
      nickNameCheck: name => {
        checkedNickName.value = name;
      },
      goonCheck: val => {
        if (val === 'none') {
          goon.value = ''
          return false
        }
        goon.value = val;
      },
      addNewMember: () => {
        $ui.alert({
          title: "정보 확인",
          content: `입력하신 정보로 그룹 멤버를 등록하시겠습니까?`,
          callbackFunc: () => {
            // console.log("callback")
            $api('api/groupmember', {
              groupSeq : adminInfo.value.groupSeq,
              nickname: checkedNickName.value,
              kartTier: goon.value
            }, 'post', res => {
              // console.log(res)
              if (res.code === '000') {
                $ui.alert({
                  title: "성공",
                  content: res.message
                });
                document.querySelector("#write").value = ''
                checkedNickName.value = ''
                document.querySelector("#menu").value = 'none'
                goon.value = ''
              }
            }, err => {
              $ui.alert({
                title: "네트워크 오류",
                content: "세션이 만료되었거나 없습니다. 다시 로그인 바랍니다."
              });
              router.push("/")
            })
          }
        })
      }
    }

    watch([checkedNickName, goon], () => {
      !$utils.isEmpty(checkedNickName.value) && !$utils.isEmpty(goon.value) ? isValid.value = true : isValid.value = false
    })

    onMounted(() => {
      adminInfo.value = store.getters['getMemberInfo']
      console.log(adminInfo.value)
    })

    return {
      isValid,
      pageFunc,
    }
  }
}
</script>
<style scoped></style>