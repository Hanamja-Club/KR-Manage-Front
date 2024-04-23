<template>
  <CommonHeader :title="'회원 관리'" />
  <section id="content">
    <select id="menu">
      <option value="none">메뉴를 선택하세요</option>
      <option value="john-doe">John Doe</option>
      <option value="jane-smith">Jane Smith</option>
    </select>

    <div id="info">
      <div>
        <h2 id="name">이름:</h2>
        <p id="name-info"></p>
      </div>
      <div>
        <h2 id="nickname">닉네임:</h2>
        <p id="nickname-info"></p>
      </div>
      <div>
        <h2 id="club">클럽:</h2>
        <p id="club-info"></p>
      </div>
      <div>
        <h2 id="crew">크루:</h2>
        <p id="crew-info"></p>
      </div>
      <div>
        <h2 id="rank-tier">랭킹전 티어:</h2>
        <p id="rank-tier-info"></p>
      </div>
    </div>
  </section>

  <!-- 임시데이터 -->
  <table>
    <tr>
      <th>이름</th>
      <td>John Doe</td>
    </tr>
    <tr>
      <th>닉네임</th>
      <td>JD</td>
    </tr>
    <tr>
      <th>클럽</th>
      <td>Speedsters</td>
    </tr>
    <tr>
      <th>크루</th>
      <td>Nitro Team</td>
    </tr>
    <tr>
      <th>랭킹전 티어</th>
      <td>Diamond</td>
    </tr>
  </table>
  <table>
    <tr>
      <th>이름</th>
      <td>Jane Smith</td>
    </tr>
    <tr>
      <th>닉네임</th>
      <td>JS</td>
    </tr>
    <tr>
      <th>클럽</th>
      <td>Race Kings</td>
    </tr>
    <tr>
      <th>크루</th>
      <td>Turbo Crew</td>
    </tr>
    <tr>
      <th>랭킹전 티어</th>
      <td>Gold</td>
    </tr>
  </table>
</template>
<script>
import {krmanage} from "@/plugins/krmanage.js";
import CommonHeader from "@/components/CommonHeader.vue";

export default {
  name: 'MemManage',
  components: {CommonHeader},
  setup() {

    const { $api, $ui, $utils } = krmanage()

    const pageFunc = {
      menuControl : () => {
        document.querySelector("#mobile-nav").classList.toggle('on')
      },
    }

    return{
      pageFunc,
    }
  }
}
</script>
<style scoped></style>