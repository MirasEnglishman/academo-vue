<template>
  <div class="curriculum-container">
    <!-- Перебираем модули из Vuex -->
    <div
      v-for="(mod, mi) in modules"
      :key="mi"
      class="module-card"
    >
      <div class="module-header">
        <button @click="addModule" class="btn btn-add">
          <span>+</span>
        </button>
        <h2 class="module-title">{{ mod.title }}</h2>
        <button @click="removeModule(mi)" class="btn btn-remove">
          <span>🗑</span>
        </button>
      </div>

      <!-- Перебираем дисциплины внутри модуля -->
      <div
        v-for="(disc, di) in mod.disciplines"
        :key="di"
        class="discipline-row"
      >
        <div class="discipline-fields">
          <div class="select-container">
            <select v-model="disc.type" class="form-select">
              <option
                v-for="opt in typeOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.value }}
              </option>
            </select>
          </div>

          <div class="select-container">
            <select v-model="disc.component" class="form-select">
              <option
                v-for="opt in componentOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.value }}
              </option>
            </select>
          </div>

          <div class="select-container small">
            <select v-model="disc.semester" class="form-select">
              <option
                v-for="n in 8"
                :key="n"
                :value="n"
              >
                {{ n }}
              </option>
            </select>
          </div>

          <div class="select-container large">
            <select v-model="disc.course" class="form-select">
              <option
                v-for="item in availableDisciplines"
                :key="item.code"
                :value="item.code"
              >
                {{ item.name_rus }} — {{ item.code }}
              </option>
            </select>
          </div>

          <div class="select-container small">
            <select v-model="disc.credits" class="form-select">
              <option
                v-for="n in 12"
                :key="n"
                :value="n"
              >
                {{ n }}
              </option>
            </select>
          </div>

          <button
            @click="removeDiscipline(mi, di)"
            class="btn btn-remove"
          >
            <span>🗑</span>
          </button>
          
          <!-- Процент и кнопка объяснения (отображается только после анализа) -->
          <div v-if="hasAnalysisResults && getResultForDiscipline(disc)" class="result-indicators">
            <div class="percentage-badge" :class="getPercentageClass(getResultForDiscipline(disc).percentage)">
              {{ getResultForDiscipline(disc).percentage }}%
            </div>
            <button 
              @click="showExplanation(getResultForDiscipline(disc).explanation)" 
              class="btn btn-info"
            >
              <span>i</span>
            </button>
          </div>
        </div>
      </div>

      <div class="add-discipline-btn-container">
        <button
          @click="addDiscipline(mi)"
          class="btn btn-add"
        >
          <span>+</span> Добавить дисциплину
        </button>
      </div>
    </div>

    <div class="add-module-btn-container">
      <button @click="addModule" class="btn btn-add">
        <span>+</span> Добавить модуль
      </button>
    </div>

    <!-- Кнопка Анализировать -->
    <div class="analyze-btn-container">
      <button
        class="btn btn-analyze"
        :disabled="loading"
        @click="onAnalyze"
      >
        {{ loading ? 'Анализирую...' : 'Проанализировать' }}
      </button>
    </div>

    <!-- Вывод ошибки -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Опциональный вывод результата для отладки -->
    <div v-if="debugMode && analysisResult" class="result-block">
      <h3>Результат анализа:</h3>
      <pre>{{ analysisResult }}</pre>
    </div>
    
    <!-- Модальное окно с объяснением -->
    <div v-if="showModal" class="explanation-modal">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <h3>Объяснение</h3>
        <p>{{ currentExplanation }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { analyzeCurriculum } from '@/services/api.js'

export default {
  name: 'CurriculumPage',
  setup() {
    const store = useStore()

    // получаем из Vuex
    const modules = computed(() => store.getters.modules)
    const availableDisciplines = computed(() => store.getters.availableDisciplines)

    // локально
    const loading = ref(false)
    const error = ref(false)
    const analysisResult = ref(null)
    const debugMode = ref(false)
    
    // для модального окна
    const showModal = ref(false)
    const currentExplanation = ref('')

    const typeOptions = [
      { value: 'ООД', text: 'Общеобразовательные дисциплины' },
      { value: 'БД',  text: 'Базовые дисциплины' },
      { value: 'ПД',  text: 'Профилирующие дисциплины' },
      { value: 'ИА',  text: 'Итоговая аттестация' }
    ]
    const componentOptions = [
      { value: 'ОК (Обязательный компонент)',           text: 'Обязательный компонент' },
      { value: 'ВОК (вузовский обязательный компонент)', text: 'Вузовский обязательный компонент' },
      { value: 'КВ (компонент по выбору)',               text: 'Компонент по выбору' },
      { value: 'Профессиональная практика',             text: 'Профессиональная практика' },
      { value: 'Написание и защита дипломной работы',   text: 'Написание и защита дипломной работы' }
    ]

    // Проверяем, есть ли результаты анализа
    const hasAnalysisResults = computed(() => {
      return analysisResult.value && analysisResult.value.length > 0
    })

    // Получаем результат для конкретной дисциплины
    function getResultForDiscipline(discipline) {
      if (!hasAnalysisResults.value) return null
      
      // Ищем соответствующую дисциплину в результатах
      const foundDiscipline = availableDisciplines.value.find(d => d.code === discipline.course)
      if (!foundDiscipline) return null
      
      return analysisResult.value.find(result => result.name === foundDiscipline.name_rus)
    }

    // Определяем класс для процента в зависимости от значения
    function getPercentageClass(percentage) {
      if (percentage >= 90) return 'percentage-high'
      if (percentage >= 70) return 'percentage-medium'
      return 'percentage-low'
    }

    // Показываем модальное окно с объяснением
    function showExplanation(explanation) {
      currentExplanation.value = explanation
      showModal.value = true
    }

    // Закрываем модальное окно
    function closeModal() {
      showModal.value = false
    }

    onMounted(() => {
      store.dispatch('loadInitialData')
    })

    function addModule() {
      store.dispatch('addModule')
    }
    function removeModule(idx) {
      store.dispatch('removeModule', idx)
    }
    function addDiscipline(mi) {
      store.dispatch('addDiscipline', mi)
    }
    function removeDiscipline(mi, di) {
      store.dispatch('removeDiscipline', { moduleIndex: mi, disciplineIndex: di })
    }

    // собираем payload, где вместо кода отправляем name_rus
    async function onAnalyze() {
      loading.value = true
      error.value = null
      analysisResult.value = null

      const payload = modules.value.flatMap(mod =>
        mod.disciplines.map(d => {
          // ищем полное описание дисциплины по коду
          const found = availableDisciplines.value.find(item => item.code === d.course) || {}
          return {
            type:      d.type,
            component: d.component,
            semester:  d.semester,
            name:      found.name_rus || '',   // вот здесь отправляем name
            credits:   d.credits
          }
        })
      )

      try {
        const res = await analyzeCurriculum(payload)
        analysisResult.value = res
      } catch (e) {
        error.value = e.message || 'Не удалось выполнить анализ'
      } finally {
        loading.value = false
      }
    }

    return {
      modules,
      availableDisciplines,
      typeOptions,
      componentOptions,
      loading,
      error,
      analysisResult,
      debugMode,
      hasAnalysisResults,
      showModal,
      currentExplanation,
      addModule,
      removeModule,
      addDiscipline,
      removeDiscipline,
      onAnalyze,
      getResultForDiscipline,
      getPercentageClass,
      showExplanation,
      closeModal
    }
  }
}
</script>

<style scoped>
.curriculum-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  position: relative;
}

.module-card {
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  overflow: hidden;
}

.module-header {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #4a4a9c;
  color: white;
}

.module-title {
  flex-grow: 1;
  margin: 0;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}

.discipline-row {
  padding: 10px;
  border-bottom: 1px solid #e1e1e1;
}

.discipline-fields {
  display: flex;
  gap: 5px;
  align-items: center;
}

.select-container {
  position: relative;
  width: 180px;
}

.select-container.small {
  width: 70px;
}

.select-container.large {
  flex-grow: 1;
}

.form-select {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
  appearance: none;
}

.btn {
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 35px;
  height: 35px;
}

.btn-add {
  background-color: #2c3e50;
  color: white;
}

.btn-remove {
  background-color: #e74c3c;
  color: white;
}

.btn-info {
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  min-width: 24px;
  font-size: 12px;
  font-weight: bold;
}

.add-discipline-btn-container {
  padding: 10px;
}

.add-module-btn-container {
  display: flex;
  justify-content: center;
  margin: 20px 0 40px;
}

.analyze-btn-container {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.btn-analyze {
  background-color: #0066cc;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-analyze:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.result-block {
  background: #fafafa;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
  white-space: pre-wrap;
}

/* Стили для отображения процентов */
.result-indicators {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 10px;
}

.percentage-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 24px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 12px;
  color: white;
}

.percentage-high {
  background-color: #27ae60;
}

.percentage-medium {
  background-color: #f39c12;
}

.percentage-low {
  background-color: #e74c3c;
}

/* Стили для модального окна */
.explanation-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.close-btn:hover {
  color: #e74c3c;
}
</style>