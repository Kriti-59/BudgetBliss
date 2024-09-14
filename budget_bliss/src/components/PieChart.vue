<template>
  <canvas id="myPieChart"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart } from 'chart.js/auto';

const props = defineProps({
  chartData: Object,
});

const chart = ref(null);

onMounted(() => {
  createChart();
});

watch(() => props.chartData, () => {
  if (chart.value) {
    chart.value.destroy(); 
    createChart();
  }
}, { deep: true });

const createChart = () => {
  const ctx = document.getElementById('myPieChart').getContext('2d');
  chart.value = new Chart(ctx, {
    type: 'pie',
    data: props.chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (context.parsed !== null) {
                label += ': $' + context.parsed.toLocaleString();
              }
              return label;
            }
          }
        }
      }
    }
  });
};
</script>

<style scoped>
canvas {
  max-width: 100%;
  margin: 0 auto;
}
</style>
