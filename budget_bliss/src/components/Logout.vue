<template>
  <div class="navbar" v-if="isUserLoggedIn">
    <button @click="handleLogout" class="logout-button">Logout</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isUserLoggedIn = ref(false);

const checkLoginStatus = () => {
  const token = localStorage.getItem("token");
  isUserLoggedIn.value = !!token; // Set to true if token exists
};

checkLoginStatus();

const handleLogout = async () => {
  try {
    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    localStorage.removeItem("token");
    isUserLoggedIn.value = false; // Update login status
    router.push("/login");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.logout-button {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #d32f2f;
}
</style>
