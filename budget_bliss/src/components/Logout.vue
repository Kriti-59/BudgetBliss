<template>
  <div class="logout-container">
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Are you sure you want to logout?</h2>
        <div class="modal-buttons">
          <button @click="confirmLogout" class="confirm-logout">
            Yes, Logout
          </button>
          <button @click="cancelLogout" class="cancel-logout">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits();

const router = useRouter();

const confirmLogout = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    emit("close");

    // Redirect to login
    router.push("/login");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

const cancelLogout = () => {
  emit("close");
};
</script>

<style scoped>
.logout-container {
  position: relative;
}

.logout-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #ff3335;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 90%;
  max-width: 400px;
}

.modal h2 {
  margin-bottom: 1rem;
  color: #333;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 1rem;
}

.confirm-logout {
  padding: 10px 20px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-logout:hover {
  background-color: #902022;
}

.cancel-logout {
  padding: 10px 20px;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-logout:hover {
  background-color: #bbb;
}
</style>
