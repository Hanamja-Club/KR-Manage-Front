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
import {onMounted, ref, watch} from "vue";
import CommonChart from "@/components/CommonChart.vue";

export default {
  name: 'AppStatistics',
  components: {CommonChart},
  setup() {

    const { $api, $ui, $utils } = krmanage()
    const router = useRouter();
    const store = useStore();

    const chartData = ref({ // 임시 하드코딩이며 추후 수정 예정
      labels: ['asdsdfsdf'],
      datasets: [
        {
          label: '회원 군 통계',
          backgroundColor: '#f87979',
          data: ['123'],
        }
      ],
    })

    const chartOptions = {
      responsive: true
    }

    const pageFunc = {
      movePage: pageName => {
        router.push(pageName)
      },
      initApi: () => {
        console.log("init func call")
        $api('api/admin/statistics/groupmember/tier', {}, 'get', res => {
          res.response.forEach((itm, idx) => {
            chartData.value.labels[idx] = itm.kartTier
            chartData.value.datasets[0].data[idx] = itm.tierCount
          })
        }, err => {
          $ui.alert({
            title: "네트워크 오류",
            content: "권한이 없거나 세션이 없습니다. 다시 로그인 해주세요."
          });
          router.push("/")
        })
      },
    }

    onMounted(() => {
      pageFunc.initApi()
    })

    watch(chartData.value, ()=> {
      console.log(chartData.value)
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