<template>
  <header>
    <h1 id="app-title">{{ headerTitle }}</h1>
    <button id="menuOpen" @click="pageFunc.menuControl()"><img src="@/assets/img/menu-button.png"
                                                               alt="this is menu button. click to see other menus.">
    </button>
    <nav id="mobile-nav">
      <ul>
        <li><a>{{ adminInfo.groupName }} Management</a></li>
        <li><a @click="pageFunc.routerPage('/manage')" id="member-management"> 회원 관리</a></li>
        <li><a @click="pageFunc.routerPage('/NewMember')" id="add-new-member"> 신규 팀원 추가</a></li>
        <li><a @click="pageFunc.routerPage('/RaceNum')" id="friendly-match"> 친선경기 횟수 조회</a></li>
        <li><a @click="pageFunc.routerPage('/AddNewRace')" id="add-race-number"> 경기 횟수 추가</a></li>
        <li v-if="adminInfo.memberAuthority === 'SUPER'"><a @click="pageFunc.routerPage('/AdminMain')" id="add-race-number"> 관리자 설정</a></li>
        <li @click="pageFunc.menuControl()">
          <img id="menuClose" src="@/assets/img/menu_close.png"
               alt="this is menu close button. click to close the menu.">
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import {krmanage} from "@/plugins/krmanage.js";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: 'CommonHeader',
  components: {},
  props: {
    title: String,
  },
  setup(props) {
    const { $api, $ui, $utils } = krmanage()
    const router = useRouter();
    const store = useStore();

    const adminInfo = ref({})

    const headerTitle = ref(props.title);

    const pageFunc = {
      menuControl : () => {
        document.querySelector("#mobile-nav").classList.toggle('on')
      },
      routerPage: path => {
        router.push(path)
      }
    }

    onMounted(() => {
      adminInfo.value = store.getters['getMemberInfo']
    })

    return{
      headerTitle,
      adminInfo,
      pageFunc,
    }
  }
}
</script>
<style scoped></style>