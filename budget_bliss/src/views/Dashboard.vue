<template>
  <h1>BudgetBliss</h1>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Expense Overview</h1>
    <div v-if="loading" class="loading-message">Loading data...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <PieChart v-if="!loading && !error" :chartData="formattedData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import PieChart from "../components/PieChart.vue";

const formattedData = ref({ labels: [], datasets: [] });
const loading = ref(true);
const error = ref(null);

const fetchExpenses = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/expenses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    formatData(res.data.expenses);
  } catch (err) {
    error.value = "Error fetching expenses. Please try again later.";
    console.error("Error fetching expenses:", err);
  } finally {
    loading.value = false;
  }
};

const formatData = (data) => {
  const categories = data.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  const labels = Object.keys(categories);
  const values = Object.values(categories);

  formattedData.value = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: values,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

onMounted(fetchExpenses);
</script>

<style scoped>
.dashboard-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
}

.loading-message {
  text-align: center;
  font-size: 1.2rem;
  color: #007bff;
}

.error-message {
  margin-top: 1rem;
  color: red;
  text-align: center;
  font-size: 1rem;
}

canvas {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}
</style>
