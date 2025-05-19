<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-logo">
        <router-link to="/" class="navbar-brand">Академическая система</router-link>
      </div>
      <div class="navbar-menu">
        <router-link 
          v-for="(item, index) in menuItems" 
          :key="index"
          :to="item.route" 
          class="navbar-item"
          :class="{ active: $route.path === item.route }"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      menuItems: [
        { title: 'Дисциплины', route: '/' },
        { title: 'Паспорт ОП', route: '/pasport' },
        { title: 'Силлабус', route: '/syllabus' },
        { title: 'Отчеты', route: '/reports' }
      ]
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  display: flex;
  align-items: center;
}

.navbar-brand {
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  gap: 1rem;
}

.navbar-item {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.navbar-item:hover, .navbar-item.active {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 767.98px) {
  .container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .navbar-menu {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .navbar-item {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>