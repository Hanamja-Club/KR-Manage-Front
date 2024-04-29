<template>
  <body>
  <article id="main_article">
    <img src="../../assets/img/logo_kartrush.png" alt="카트라이더 러쉬플러스 매니지먼트 앱입니다.">

    <div id="idInput">
      <label for="userId">ID</label>
      <input type="text" id="userId" name="userId" placeholder="ID를 입력하세요" v-model="userInf.userId" />
    </div>
    <div id="pwInput">
      <label for="userPW">패스워드</label>
      <input type="password" id="userPW" name="userPW" placeholder="패스워드를 입력하세요" v-model="userInf.userPw" />
    </div>

    <button id="loginButton" @click="pageFunc.loginAction()">로그인</button>
  </article>
  </body>
</template>
<script>
import {krmanage} from "@/plugins/krmanage.js";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
 name: 'KRA0101P01',
 components: {},
 setup() {

   const { $api, $ui, $utils } = krmanage()
   const router = useRouter();
   const store = useStore();

   const userInf = ref({
     userId: "",
     userPw: ""
   })

   const pageFunc = {
     loginAction : () => {
       if ($utils.isEmpty(userInf.value.userId) || $utils.isEmpty(userInf.value.userPw)) {
         $ui.alert({
           title : "입력 오류",
           content : "아이디나 비밀번호가 비어있습니다."
         })
         return false
       }

       $api('api/member/login', {
         memberId : userInf.value.userId,
         memberPassword: userInf.value.userPw
       }, 'post', res => {
         // console.log(res)
         if (res.code === '001') {
           $ui.alert({
             title: "로그인 오류",
             content: res.message
           });
         } else {
           store.commit('setMemberInfo', res.response)
           router.push("/RaceNum")
         }
       }, err => {
         console.log(err)
       })
     },
   }

   return {
     userInf,
     pageFunc,
   }
 }
}
</script>

<style>

</style>