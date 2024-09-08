<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit" class="btn">Login</button>
    </form>

    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref(null);
const router = useRouter();

const login = async () => {
  try {
    // Clear previous error
    error.value = null;

    // Send POST request to backend login route
    const response = await axios.post('http://localhost:5000/api/login', {
      email: email.value,
      password: password.value
    });

    console.log('Login successful');

    // Store the token in local storage
    localStorage.setItem('authToken', response.data.token);

    // Redirect to the dashboard
    router.push('/dashboard');
  } catch (err) {
    // Display error message if login fails
    if (err.response && err.response.data) {
      error.value = err.response.data.message || 'Login failed. Please try again.';
    } else {
      error.value = 'An error occurred. Please try again later.';
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: #42b883;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #358a66;
}

.error-message {
  margin-top: 1rem;
  color: red;
  text-align: center;
}
</style>
