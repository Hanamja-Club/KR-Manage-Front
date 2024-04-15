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
      <input type="text" id="userPW" name="userPW" placeholder="패스워드를 입력하세요" v-model="userInf.userPw" />
    </div>

    <button id="loginButton" @click="pageFunc.loginAction()">로그인</button>
  </article>
  </body>
</template>
<script>
import {krmanage} from "@/plugins/krmanage.js";
import {ref} from "vue";

export default {
 name: 'KRA0101P01',
 components: {},
 setup() {

   const { $api, $ui, $utils } = krmanage()

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
       }
     },
   }

   return {
     userInf,
     pageFunc,
   }
 }
}
</script>

<style scoped></style>