import { createRouter, createWebHistory } from 'vue-router'
import DisciplineView from '../views/DisciplineView.vue'

const routes = [
  {
    path: '/',
    name: 'discipline',
    component: DisciplineView,
    meta: { title: 'Дисциплины' }
  },
  {
    path: '/pasport',
    name: 'pasport',
    component: () => import('../views/CurriculumPage.vue'),
    meta: { title: 'Паспорт ОП' }
  },
  {
    path: '/syllabus',
    name: 'syllabus',
    component: () => import('../views/SyllabusView.vue'),
    meta: { title: 'Силлабус' }
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('../views/ReportsView.vue'),
    meta: { title: 'Отчеты' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Обновление заголовка страницы при переходе
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Академическая система'
  next()
})

export default router