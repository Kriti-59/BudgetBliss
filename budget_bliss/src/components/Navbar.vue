<template>
  <nav class="navbar">
    <div class="navbar-container">
      <h1 class="navbar-title">BudgetBliss</h1>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #f5f5f5;
  padding: 1.5rem;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
}

.navbar-container {
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.navbar-title {
  flex: 1;
  text-align: center;
  margin: 0;
  font-size: 1.5rem;
}
</style>
