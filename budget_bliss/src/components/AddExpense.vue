<template>
  <div>
    <button @click="showForm = true">Add Expense</button>

    <div v-if="showForm" class="add-expense-form">
      <form @submit.prevent="addExpense">
        <input v-model="amount" placeholder="Amount" type="number" required />
        <input
          v-model="description"
          placeholder="Description"
          type="text"
          required
        />
        <select v-model="selectedCategoryId">
          <option disabled value="">Select Category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const emit = defineEmits(["expense-added"]);

const showForm = ref(false);
const amount = ref("");
const description = ref("");
const selectedCategoryId = ref("");
const categories = ref([
  { id: 1, name: "Food" },
  { id: 2, name: "Rent" },
  { id: 3, name: "Entertainment" },
  // Add more categories as necessary
]);

const addExpense = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/addExpenses", {
      userId: localStorage.getItem("userId"),
      categoryId: selectedCategoryId.value,
      amount: amount.value,
      date: new Date().toISOString().slice(0, 10),
      description: description.value,
    });

    console.log("Expense added:", response.data);
    showForm.value = false; // Hide form after submission
    emit("expense-added");
  } catch (error) {
    console.error(
      "Error adding expense:",
      error.response ? error.response.data : error.message
    );
  }
};
</script>

<style scoped>
.add-expense-form {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
