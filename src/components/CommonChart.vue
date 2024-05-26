<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
  />
</template>
<script>
import {Bar} from "vue-chartjs";
import {onMounted, computed} from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'CommonChart',
  components: { Bar },
  props: {
    chartOptions: {},
    chartData: {},
  },
  setup(props) {

    const chartData = computed(() => props.chartData)
    const chartOptions = computed(() => props.chartOptions)

    onMounted(() => {
      console.log(props.chartData)
      console.log(props.chartOptions)
    })

    return {
      chartData,
      chartOptions,
    }
  }
}
</script>
<style scoped>

</style>