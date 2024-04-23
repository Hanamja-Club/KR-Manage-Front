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
    const isValid = ref(false)

    const pageFunc = {
      nickNameCheck: name => {
        checkedNickName.value = name;
      },
      addNewMember: () => {
        $ui.alert({
          title: "닉네임 확인",
          content: `입력하신 닉네임은 <b>${checkedNickName.value}</b> 입니다. 등록하시겠습니까?`,
          callbackFunc: () => {
            // console.log("callback")

          }
        })
      }
    }

    watch(checkedNickName, () => {
      !$utils.isEmpty(checkedNickName.value) ? isValid.value = true : isValid.value = false
    })

    onMounted(() => {
      adminInfo.value = store.getters['getMemberInfo']
    })

    return {
      isValid,
      pageFunc,
    }
  }
}
</script>
<style scoped></style>