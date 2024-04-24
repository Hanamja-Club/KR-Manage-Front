<template>
  <body>
    <CommonHeader :title="'친선 횟수 추가'" />
    <section id="content">
      <table>
        <thead>
        <tr>
          <th>선택</th>
          <th>닉네임</th>
          <th>경기 횟수</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <input type="checkbox"/>
          </td>
          <td>사람1</td>
          <td>123</td>
        </tr>
        </tbody>
      </table>
      <button id="loadMore">더보기</button>
      <button id="addMore">횟수 추가</button>
    </section>
  </body>
</template>
<script>
import CommonHeader from "@/components/CommonHeader.vue";

export default {
  name: 'AddNewRace',
  components: {CommonHeader},
  setup() {

    return {

    }
  }
}
</script>
<style scoped></style>