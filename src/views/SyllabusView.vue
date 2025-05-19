<template>
  <div class="syllabus-page">
    <h1 class="page-title">Содержание дисциплины: Digital Marketing</h1>

    <!-- Кнопка отправки на анализ -->
    <button class="btn-submit" @click="submitSyllabus">
      Отправить на анализ
    </button>

    <!-- кнопка добавления содержания недель -->
    <button class="btn-add-content" @click="showWeeksModal = true">
      Добавить содержание
    </button>

      <div v-if="analysisResult" class="analysis-section">
      <h2 class="analysis-title">Результат анализа по силлабусу</h2>
      <p class="analysis-intro">{{ analysisResult.introduction }}</p>

      <h3>Сильные стороны:</h3>
      <ol class="analysis-list">
        <li v-for="(item, i) in analysisResult.strongSides" :key="i">{{ item }}</li>
      </ol>

      <h3>Слабые стороны:</h3>
      <ol class="analysis-list">
        <li v-for="(item, i) in analysisResult.weakSides" :key="i">{{ item }}</li>
      </ol>

      <h3>Рекомендации:</h3>
      <ol class="analysis-list">
        <li v-for="(item, i) in analysisResult.recommendations" :key="i">{{ item }}</li>
      </ol>
    </div>

    <!-- ===== Основные задания ===== -->
    <div class="section tasks-section">
      <div class="section-header">
        <div class="section-title">Основные задания в рамках курса</div>
        <button class="close-btn" @click="clearTasks">×</button>
      </div>
      <div v-for="t in tasks" :key="t.id" class="section-item">
        <div class="fields-grid">
          <div class="field">
            <label>Задание</label>
            <input v-model="t.name" />
          </div>
          <div class="field">
            <label>Описание</label>
            <input v-model="t.description" />
          </div>
          <div class="field">
            <label>Период сдачи</label>
            <input v-model="t.period" />
          </div>
          <div class="field">
            <label>Критерии оценки</label>
            <input v-model="t.criteria" />
          </div>
        </div>
        <div class="divider"></div>
      </div>
      <div class="actions">
        <button class="btn-add" @click="addTask">Добавить</button>
        <button class="btn-save" :disabled="!tasks.length" @click="saveTasks">
          Сохранить
        </button>
      </div>
    </div>

    <!-- ===== Литература ===== -->
    <div class="section literature-section">
      <div class="section-header">
        <div class="section-title">Литература</div>
        <button class="close-btn" @click="clearLiterature">×</button>
      </div>
      <div v-for="l in literature" :key="l.id" class="section-item">
        <div class="fields-grid">
          <div class="field">
            <label>Название</label>
            <input v-model="l.title" />
          </div>
          <div class="field">
            <label>Автор</label>
            <input v-model="l.author" />
          </div>
          <div class="field">
            <label>Год</label>
            <select v-model="l.year">
              <option v-for="y in years" :key="y">{{ y }}</option>
            </select>
          </div>
          <div class="field">
            <label>Тип</label>
            <select v-model="l.type">
              <option v-for="t in literatureTypes" :key="t">{{ t }}</option>
            </select>
          </div>
        </div>
        <div class="divider"></div>
      </div>
      <div class="actions">
        <button class="btn-add" @click="addLiterature">Добавить</button>
        <button class="btn-save" :disabled="!literature.length" @click="saveLiterature">
          Сохранить
        </button>
      </div>
    </div>

    <!-- ===== Офисные часы ===== -->
    <div class="section office-section">
      <div class="section-header">
        <div class="section-title">Офисные часы</div>
        <button class="close-btn" @click="clearOfficeHours">×</button>
      </div>
      <div v-for="o in officeHours" :key="o.id" class="section-item">
        <div class="fields-grid">
          <div class="field">
            <label>День</label>
            <select v-model="o.day">
              <option v-for="d in weekdays" :key="d">{{ d }}</option>
            </select>
          </div>
          <div class="field">
            <label>Время</label>
            <select v-model="o.time">
              <option v-for="t in timeSlots" :key="t">{{ t }}</option>
            </select>
          </div>
        </div>
        <div class="divider"></div>
      </div>
      <div class="actions">
        <button class="btn-add" @click="addOfficeHour">Добавить</button>
        <button class="btn-save" :disabled="!officeHours.length" @click="saveOfficeHours">
          Сохранить
        </button>
      </div>
    </div>

    <!-- ===== Модальное окно 15 недель ===== -->
    <div v-if="showWeeksModal" class="week-modal">
      <div class="week-modal__content">
        <button class="close-btn" @click="showWeeksModal = false">×</button>
        <h2 class="week-modal__header">Содержание силлабуса</h2>
        <div v-for="w in weeks" :key="w.number" class="week-section">
          <div class="hr-section"></div>
          <div class="section-title">Неделя {{ w.number }}</div>
          <div class="form-group">
            <label>Тема лекции *</label>
            <textarea v-model="w.topic" rows="2" maxlength="1024"></textarea>
            <div class="char-count">{{ w.topic.length }}/1024</div>
          </div>
          <div class="form-group">
            <label>Вопросы</label>
            <button class="btn-add-question" @click="addQuestion(w)">+ Добавить вопрос</button>
            <div v-for="(q, idx) in w.questions" :key="idx" class="question-item">
              <input v-model="w.questions[idx]" />
              <button class="btn-remove" @click="removeQuestion(w, idx)">×</button>
            </div>
          </div>
          <div class="form-group">
            <label>Семинар</label>
            <textarea v-model="w.seminar" rows="1" maxlength="1024"></textarea>
            <div class="char-count">{{ w.seminar.length }}/1024</div>
          </div>
          <div class="form-group">
            <label>Материалы</label>
            <textarea v-model="w.materials" rows="1" maxlength="1024"></textarea>
            <div class="char-count">{{ w.materials.length }}/1024</div>
          </div>
          <div class="form-group half">
            <div>
              <label>Лекции, ч.</label>
              <input v-model="w.lectureHours" />
            </div>
            <div>
              <label>Семинары, ч.</label>
              <input v-model="w.seminarHours" />
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="saveWeeks">Сохранить</button>
          <button @click="showWeeksModal = false">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

// Импортируем вашу функцию из services/api.js
import { analyzeSyllabus } from '@/services/api'

const store = useStore()

// Получаем из Vuex
const tasks       = computed(() => store.getters.syllabusTasks)
const literature  = computed(() => store.getters.syllabusLiterature)
const officeHours = computed(() => store.getters.syllabusOfficeHours)
const weeks       = computed(() => store.getters.syllabusWeeks)

const showWeeksModal = ref(false)

const analysisResult = ref(null)

// Справочники
const years           = Array.from({ length: 35 }, (_, i) => 1990 + i)
const literatureTypes = ['Учебник','Статья','Монография']
const weekdays        = ['Понедельник','Вторник','Среда','Четверг','Пятница']
const timeSlots       = ['10:00–12:00','14:00–16:00','16:00–18:00']

// CRUD-настройки
function addTask()       { store.commit('addSyllabusTask',        { id: Date.now(), name:'',description:'',period:'',criteria:'' }) }
function saveTasks()     { console.log('Tasks:', tasks.value) }
function clearTasks()    { store.commit('setSyllabusTasks',      []) }

function addLiterature()    { store.commit('addSyllabusLiterature', { id: Date.now(), title:'',author:'',year:years[0],type:'Учебник' }) }
function saveLiterature()   { console.log('Literature:', literature.value) }
function clearLiterature()  { store.commit('setSyllabusLiterature', []) }

function addOfficeHour()    { store.commit('addSyllabusOfficeHour', { id: Date.now(), day:weekdays[0],time:timeSlots[0] }) }
function saveOfficeHours()  { console.log('Office Hours:', officeHours.value) }
function clearOfficeHours() { store.commit('setSyllabusOfficeHours',[]) }

function addQuestion(w)     { w.questions.push('') }
function removeQuestion(w,i){ w.questions.splice(i,1) }

function saveWeeks() {
  store.commit('setSyllabusWeeks', weeks.value)
  showWeeksModal.value = false
  console.log('Weeks:', weeks.value)
}

// Вот теперь вместо inline-fetch используем вашу функцию:
async function submitSyllabus() {
  const payload = {
    tasks: tasks.value,
    literature: literature.value,
    officeHours: officeHours.value,
    weeks: weeks.value
  }

  try {
    const result = await analyzeSyllabus(payload)
    analysisResult.value = result  
    console.log('Результат анализа:', result)
    alert('Силлабус отправлен на анализ успешно')
  } catch (e) {
    console.error(e)
    alert('Ошибка при отправке на анализ: ' + e.message)
  }
}
</script>

<style scoped>
.analysis-section {
  background: #fff;
  padding: 1rem;
  border-radius: .5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}
.analysis-title {
  font-size: 1.25rem;
  margin-bottom: .5rem;
  text-align: center;
}
.analysis-intro {
  font-style: italic;
  margin-bottom: 1rem;
}
.analysis-list {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}
.analysis-list li {
  margin-bottom: .25rem;
}

.btn-submit {
  padding: 0.5rem 1rem;
  background: #10B981;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  margin-bottom: 1rem;
  cursor: pointer;
}
.btn-submit:hover {
  opacity: 0.9;
}
.syllabus-page {
  max-width: 800px;
  margin: 2rem auto;
  background: #EFF0F6;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
}
.page-title {
  text-align: center;
  font-weight: 500;
  margin-bottom: 1.5rem;
}
.btn-add-content {
  padding: 0.5rem 1rem;
  background-color: #5E4AE3;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
}
.section {
  background: #F5F3FF;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-title {
  font-weight: 500;
}
.close-btn {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: #374151;
  cursor: pointer;
}
.fields-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}
.field label {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}
.field input,
.field select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #CBD5E0;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}
.divider {
  height: 2px;
  background: #000;
  margin: 1rem 0;
}
.actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}
.btn-add {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  color: #fff;
  cursor: pointer;
}
.tasks-section  .btn-add { background: #556574; }
.literature-section .btn-add { background: #A64FFF; }
.office-section .btn-add { background: #0093FF; }
.btn-save {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  color: #fff;
  cursor: pointer;
}
.tasks-section  .btn-save { background: #A0AEC0; }
.literature-section .btn-save { background: #C08CFF; }
.office-section .btn-save { background: #0083E8; }
.btn-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.week-modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.week-modal__content {
  position: relative;
  background: #fff;
  border-radius: 0.5rem;
  width: 90%; max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
}
.week-modal__header {
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
.hr-section {
  border-top: 2px solid #1F2E45;
  margin: 1.5rem 0;
}
.form-group {
  margin-top: 0.75rem;
}
.form-group label {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}
.form-group input,
.form-group textarea {
  width: 100%;
  border: 1px solid #CBD5E0;
  border-radius: 0.375rem;
  padding: 0.5rem;
  font-size: 0.875rem;
}
.form-group.half {
  display: flex;
  gap: 1rem;
}
.form-group.half > div {
  flex: 1;
}
.btn-add-question {
  margin-bottom: 0.5rem;
  padding: 0.375rem 0.75rem;
  background-color: #4C51BF;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
.question-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.question-item input {
  flex: 1;
}
.btn-remove {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: #E53E3E;
  cursor: pointer;
}
.char-count {
  font-size: 0.75rem;
  color: #A0AEC0;
  text-align: right;
  margin-top: 0.25rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
.modal-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
}
.modal-actions button:first-child {
  background: #5E4AE3;
}
.modal-actions button:last-child {
  background: #4A5568;
}
</style>
