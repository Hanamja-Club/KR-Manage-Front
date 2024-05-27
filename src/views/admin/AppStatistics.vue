<template>
  <body>
    <hr style="height: 5px; background-color: #007bff; margin-bottom: 15px">
    <section id="content">
      <h1 style="font-size: 20pt">앱 통계</h1>
      <div style="margin-top: 20px;">
        <CommonChart :chart-options="chartOptions" :chart-data="chartData" />
      </div>
    </section>
  </body>
</template>
<script>

import {krmanage} from "@/plugins/krmanage.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {onMounted} from "vue";
import CommonChart from "@/components/CommonChart.vue";

export default {
  name: 'AppStatistics',
  components: {CommonChart},
  setup() {

    const { $api, $ui, $utils } = krmanage()
    const router = useRouter();
    const store = useStore();

    const chartData = { // 임시 하드코딩이며 추후 수정 예정
      labels: [ '강주력', '주력', '1군', '2군', '3군', '4군', '일반' ],
      datasets: [
          {
            label: '회원 군 통계',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 40, 20, 12, 30],
          }
      ],
    }

    const chartOptions = {
      responsive: true
    }

    const pageFunc = {
      movePage: pageName => {
        router.push(pageName)
      },
    }

    onMounted(() => {
    })

    return{
      chartData,
      chartOptions,
      pageFunc,
    }
  }
}
</script>
<style scoped></style>