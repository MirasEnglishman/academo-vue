<template>
  <div class="discipline-view">
    <DisciplineForm />
  </div>
</template>

<script>
import DisciplineForm from '@/components/DisciplineForm.vue'

export default {
  name: 'DisciplineView',
  components: {
    DisciplineForm
  }
}
</script>

<style scoped>
.discipline-view {
  padding-bottom: 30px;
}
</style>