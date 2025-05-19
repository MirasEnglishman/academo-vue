<template>
  <div class="discipline-form">
    <h1 class="form-title">{{ title }}</h1>
    
    <form @submit.prevent="submitForm">
      <div class="row">
        <!-- Уровень обучения -->
        <div class="col-md-6 mb-3">
          <label for="level" class="form-label">Уровень обучения <span class="required">*</span></label>
          <select 
            id="level" 
            v-model="form.level" 
            class="form-select"
            required
            :class="{'changed': changedFields.includes('level')}"
          >
            <option value="Бакалавриат">Бакалавриат</option>
            <option value="Магистратура">Магистратура</option>
            <option value="Докторантура">Докторантура</option>
          </select>
        </div>
        
        <!-- Код дисциплины -->
        <div class="col-md-6 mb-3">
          <label for="code" class="form-label">Код дисциплины <span class="required">*</span></label>
          <input 
            type="text" 
            id="code" 
            v-model="form.code" 
            class="form-control"
            required
            placeholder="Например: AG 1101"
            :class="{'changed': changedFields.includes('code')}"
          >
        </div>
      </div>
      
      <div class="row">
        <!-- Наименование на казахском -->
        <div class="col-md-6 mb-3">
          <label for="nameKz" class="form-label">Наименование дисциплины на казахском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="nameKz" 
            v-model="form.nameKz" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('nameKz')}"
          >
        </div>
        
        <!-- Описание на казахском -->
        <div class="col-md-6 mb-3">
          <label for="descriptionKz" class="form-label">Описание дисциплины на казахском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="descriptionKz" 
            v-model="form.descriptionKz" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('descriptionKz')}"
          >
        </div>
      </div>
      
      <div class="row">
        <!-- Наименование на русском -->
        <div class="col-md-6 mb-3">
          <label for="nameRu" class="form-label">Наименование дисциплины на русском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="nameRu" 
            v-model="form.nameRu" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('nameRu')}"
          >
        </div>
        
        <!-- Описание на русском -->
        <div class="col-md-6 mb-3">
          <label for="descriptionRu" class="form-label">Описание дисциплины на русском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="descriptionRu" 
            v-model="form.descriptionRu" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('descriptionRu')}"
          >
        </div>
      </div>
      
      <div class="row">
        <!-- Наименование на английском -->
        <div class="col-md-6 mb-3">
          <label for="nameEn" class="form-label">Наименование дисциплины на английском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="nameEn" 
            v-model="form.nameEn" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('nameEn')}"
          >
        </div>
        
        <!-- Описание на английском -->
        <div class="col-md-6 mb-3">
          <label for="descriptionEn" class="form-label">Описание дисциплины на английском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="descriptionEn" 
            v-model="form.descriptionEn" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('descriptionEn')}"
          >
        </div>
      </div>
      
      <div class="row">
        <!-- Знания на казахском -->
        <div class="col-md-6 mb-3">
          <label for="knowledgeKz" class="form-label">Знания на казахском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="knowledgeKz" 
            v-model="form.knowledgeKz" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('knowledgeKz')}"
          >
        </div>
        
        <!-- Навыки на казахском -->
        <div class="col-md-6 mb-3">
          <label for="skillsKz" class="form-label">Навыки на казахском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="skillsKz" 
            v-model="form.skillsKz" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('skillsKz')}"
          >
        </div>
      </div>
      
      <div class="row">
        <!-- Знания на русском -->
        <div class="col-md-6 mb-3">
          <label for="knowledgeRu" class="form-label">Знания на русском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="knowledgeRu" 
            v-model="form.knowledgeRu" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('knowledgeRu')}"
          >
        </div>
        
        <!-- Навыки на русском -->
        <div class="col-md-6 mb-3">
          <label for="skillsRu" class="form-label">Навыки на русском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="skillsRu" 
            v-model="form.skillsRu" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('skillsRu')}"
          >
        </div>
      </div>
      
      <div class="row">
        <!-- Знания на английском -->
        <div class="col-md-6 mb-3">
          <label for="knowledgeEn" class="form-label">Знания на английском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="knowledgeEn" 
            v-model="form.knowledgeEn" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('knowledgeEn')}"
          >
        </div>
        
        <!-- Навыки на английском -->
        <div class="col-md-6 mb-3">
          <label for="skillsEn" class="form-label">Навыки на английском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="skillsEn" 
            v-model="form.skillsEn" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('skillsEn')}"
          >
        </div>
      </div>
      
      <div class="row">
        <!-- Умения на казахском -->
        <div class="col-md-6 mb-3">
          <label for="abilitiesKz" class="form-label">Умения на казахском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="abilitiesKz" 
            v-model="form.abilitiesKz" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('abilitiesKz')}"
          >
        </div>
        
        <!-- Умения на русском -->
        <div class="col-md-6 mb-3">
          <label for="abilitiesRu" class="form-label">Умения на русском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="abilitiesRu" 
            v-model="form.abilitiesRu" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('abilitiesRu')}"
          >
        </div>
      </div>
      
      <div class="row">
        <!-- Умения на английском -->
        <div class="col-md-6 mb-3">
          <label for="abilitiesEn" class="form-label">Умения на английском языке <span class="required">*</span></label>
          <input 
            type="text" 
            id="abilitiesEn" 
            v-model="form.abilitiesEn" 
            class="form-control"
            required
            :class="{'changed': changedFields.includes('abilitiesEn')}"
          >
        </div>
        
        <!-- Форма контроля экзамена -->
        <div class="col-md-6 mb-3">
          <label for="examForm" class="form-label">Форма контроля экзамена <span class="required">*</span></label>
          <select 
            id="examForm" 
            v-model="form.examForm" 
            class="form-select"
            required
            :class="{'changed': changedFields.includes('examForm')}"
          >
            <option value="Экзамен">Экзамен</option>
            <option value="Защита проекта">Защита проекта</option>
            <option value="Тестирование">Тестирование</option>
          </select>
        </div>
      </div>
      
      <div class="row">
        <!-- Пререквизиты -->
        <div class="col-md-6 mb-3">
          <label for="prerequisite" class="form-label">Пререквизиты <span class="required">*</span></label>
          <select 
            id="prerequisite" 
            v-model="form.prerequisite" 
            class="form-select"
            required
            :class="{'changed': changedFields.includes('prerequisite')}"
          >
            <option value="Математика 1">Математика 1</option>
            <option value="Физика 1">Физика 1</option>
            <option value="Информатика">Информатика</option>
          </select>
        </div>
      </div>
      
      <div class="row">
        <!-- Языковая дисциплина -->
        <div class="col-4 mb-3">
          <label for="languageDiscipline" class="form-label">Языковая дисциплина <span class="required">*</span></label>
          <div class="radio-group">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="languageDiscipline" id="languageDisciplineYes" value="Да" v-model="form.languageDiscipline">
              <label class="form-check-label" for="languageDisciplineYes">Да</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="languageDiscipline" id="languageDisciplineNo" value="Нет" v-model="form.languageDiscipline">
              <label class="form-check-label" for="languageDisciplineNo">Нет</label>
            </div>
          </div>
        </div>
        
        <!-- Физическая подготовка -->
        <div class="col-4 mb-3">
          <label for="physicalTraining" class="form-label">Физическая подготовка <span class="required">*</span></label>
          <div class="radio-group">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="physicalTraining" id="physicalTrainingYes" value="Да" v-model="form.physicalTraining">
              <label class="form-check-label" for="physicalTrainingYes">Да</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="physicalTraining" id="physicalTrainingNo" value="Нет" v-model="form.physicalTraining">
              <label class="form-check-label" for="physicalTrainingNo">Нет</label>
            </div>
          </div>
        </div>
        
        <!-- Мультиязычная дисциплина -->
        <div class="col-4 mb-3">
          <label for="multilingualDiscipline" class="form-label">Мультиязычная дисциплина <span class="required">*</span></label>
          <div class="radio-group">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="multilingualDiscipline" id="multilingualDisciplineYes" value="Да" v-model="form.multilingualDiscipline">
              <label class="form-check-label" for="multilingualDisciplineYes">Да</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="multilingualDiscipline" id="multilingualDisciplineNo" value="Нет" v-model="form.multilingualDiscipline">
              <label class="form-check-label" for="multilingualDisciplineNo">Нет</label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" class="btn btn-primary analyze-btn" @click="analyze">
          Анализировать
        </button>
        <button type="submit" class="btn btn-success">Обновить</button>
        <button type="button" class="btn btn-danger" @click="resetForm">Отмена</button>
      </div>
    </form>
    
    <!-- Блок анализа и результатов -->
    <ExplanationBlock 
      v-if="showExplanations" 
      :result="analysisResult" 
      :loading="loading"
      :error="error"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import ExplanationBlock from './ExplanationBlock.vue'

export default {
  name: 'DisciplineForm',
  components: {
    ExplanationBlock
  },
  props: {
    title: {
      type: String,
      default: 'Обновление дисциплины'
    }
  },
  data() {
    return {
      showExplanations: false,
      changedFields: [] // Для отслеживания измененных полей
    }
  },
  computed: {
    ...mapGetters(['error']),
    ...mapState({
      form: state => state.disciplineForm,
      analysisResult: state => state.analysisResult,
      loading: state => state.loading
    }),
  },
  methods: {
    ...mapActions(['analyzeDiscipline']),
    
    async analyze() {
      try {
        await this.analyzeDiscipline()
        this.showExplanations = true
        
        // После анализа применяем данные из результата анализа
        if (this.analysisResult) {
          this.applyAnalysisResults()
        }
      } catch (error) {
        console.error('Ошибка при анализе:', error)
      }
    },
    
    // Новый метод для применения результатов анализа
    applyAnalysisResults() {
      this.changedFields = [] // Сбрасываем список изменений
      
      // Маппинг полей для заполнения из результатов анализа
      const fieldMapping = {
        knowledgeKz: 'knowledgeKz',
        knowledgeRu: 'knowledgeRu',
        knowledgeEn: 'knowledgeEn',
        skillsKz: 'skillsKz',
        skillsRu: 'skillsRu',
        skillsEn: 'skillsEn',
        abilitiesKz: 'abilitiesKz',
        abilitiesRu: 'abilitiesRu',
        abilitiesEn: 'abilitiesEn',
        prerequisite: 'prerequisite',
        examForm: 'examForm',
        languageDiscipline: 'languageDiscipline',
        physicalTraining: 'physicalTraining',
        multilingualDiscipline: 'multilingualDiscipline',
        level: 'level',
        code: 'code',
        nameKz: 'nameKz',
        nameRu: 'nameRu',
        nameEn: 'nameEn',
        descriptionKz: 'descriptionKz',
        descriptionRu: 'descriptionRu',
        descriptionEn: 'descriptionEn',
      }
      
      // Проходимся по маппингу и заполняем поля формы
      Object.entries(fieldMapping).forEach(([formField, resultField]) => {
        if (this.analysisResult[resultField] && this.form[formField] !== this.analysisResult[resultField]) {
          const oldValue = this.form[formField]
          this.$store.commit('updateForm', { field: formField, value: this.analysisResult[resultField] })
          
          // Добавляем поле в список измененных
          if (!this.changedFields.includes(formField)) {
            this.changedFields.push(formField)
          }
        }
      })
    },
    
    submitForm() {
      alert('Форма отправлена!')
      // Можно добавить дополнительную логику отправки формы
    },
    
    resetForm() {
      // Сброс значений формы к начальным
      Object.keys(this.form).forEach(key => {
        if (key === 'level') {
          this.$store.commit('updateForm', { field: key, value: 'Бакалавриат' })
        } else if (['languageDiscipline', 'physicalTraining', 'multilingualDiscipline'].includes(key)) {
          this.$store.commit('updateForm', { field: key, value: 'Нет' })
        } else if (key === 'examForm') {
          this.$store.commit('updateForm', { field: key, value: 'Экзамен' })
        } else {
          this.$store.commit('updateForm', { field: key, value: '' })
        }
      })
      
      this.showExplanations = false
      this.changedFields = [] // Сбрасываем список изменений
    }
  },
  watch: {
    // Обновление значений в хранилище при изменении в форме
    form: {
      deep: true,
      handler(newVal, oldVal) {
        Object.keys(newVal).forEach(key => {
          if (newVal[key] !== oldVal[key]) {
            this.$store.commit('updateForm', { field: key, value: newVal[key] })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.discipline-form {
  background-color: #fff;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.required {
  color: red;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 1.5rem;
  justify-content: flex-start;
}

.analyze-btn {
  margin-right: auto;
}

/* Стиль для измененных полей */
.changed {
  border-color: #28a745 !important;
  border-width: 2px !important;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 767.98px) {
  .discipline-form {
    padding: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions button {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .analyze-btn {
    margin-right: 0;
  }
}

.form-select-long {
  width: 100%;
}

/* Стили для радио-кнопок */
.radio-group {
  display: flex;
  align-items: center;
}

.form-check-inline {
  margin-right: 15px;
}
</style>