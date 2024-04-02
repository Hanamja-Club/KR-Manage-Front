<template>
  <body>
  <article>
    <img src="@/assets/img/logo_kartrush.png" alt="카트라이더 러쉬플러스 매니지먼트 앱입니다.">

    <div id="idInput">
      <label for="userID">ID</label>
      <input type="text" id="userID" name="userID" placeholder="ID를 입력하세요">
    </div>
    <div id="pwInput">
      <label for="userPW">패스워드</label>
      <input type="text" id="userPW" name="userPW" placeholder="패스워드를 입력하세요">
    </div>

    <button>로그인</button>
  </article>
  </body>
</template>
<script>
import {krmanage} from "@/plugins/krmanage.js";

export default {
 name: 'KRA0101P01',
 components: {},
 setup() {

   const { $api } = krmanage()

   return {

   }
 }
}
</script>

<style scoped></style>