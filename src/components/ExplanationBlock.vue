<template>
  <div class="explanation-block">
    <h2 class="block-title">Объяснения и рекомендации</h2>
    
    <div v-if="loading" class="loading-indicator">
      <div class="spinner"></div>
      <p>Анализируем дисциплину...</p>
    </div>
    
    <div v-else-if="error" class="error-message">
      <p>{{ error }}</p>
    </div>
    
    <div v-else class="explanation-content">
      <div v-if="!hasResults" class="no-results">
        <p>Нет данных для отображения. Пожалуйста, нажмите кнопку "Анализировать".</p>
      </div>
      
      <template v-else>
        <!-- Раздел знаний -->
        <div class="result-section">
          <h3>Знания</h3>
          <div class="language-tabs">
            <div 
              v-for="(lang, index) in languages" 
              :key="`knowledge-${index}`"
              class="tab"
              :class="{ active: activeKnowledgeTab === lang.code }"
              @click="activeKnowledgeTab = lang.code"
            >
              {{ lang.name }}
            </div>
          </div>
          
          <div class="tab-content">
            <div v-show="activeKnowledgeTab === 'kz'" class="tab-pane">
              <p>{{ result.knowledgeKz || 'Нет данных' }}</p>
            </div>
            <div v-show="activeKnowledgeTab === 'ru'" class="tab-pane">
              <p>{{ result.knowledgeRu || 'Нет данных' }}</p>
            </div>
            <div v-show="activeKnowledgeTab === 'en'" class="tab-pane">
              <p>{{ result.knowledgeEn || 'Нет данных' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Раздел навыков -->
        <div class="result-section">
          <h3>Навыки</h3>
          <div class="language-tabs">
            <div 
              v-for="(lang, index) in languages" 
              :key="`skills-${index}`"
              class="tab"
              :class="{ active: activeSkillsTab === lang.code }"
              @click="activeSkillsTab = lang.code"
            >
              {{ lang.name }}
            </div>
          </div>
          
          <div class="tab-content">
            <div v-show="activeSkillsTab === 'kz'" class="tab-pane">
              <p>{{ result.skillsKz || 'Нет данных' }}</p>
            </div>
            <div v-show="activeSkillsTab === 'ru'" class="tab-pane">
              <p>{{ result.skillsRu || 'Нет данных' }}</p>
            </div>
            <div v-show="activeSkillsTab === 'en'" class="tab-pane">
              <p>{{ result.skillsEn || 'Нет данных' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Раздел умений -->
        <div class="result-section">
          <h3>Умения</h3>
          <div class="language-tabs">
            <div 
              v-for="(lang, index) in languages" 
              :key="`abilities-${index}`"
              class="tab"
              :class="{ active: activeAbilitiesTab === lang.code }"
              @click="activeAbilitiesTab = lang.code"
            >
              {{ lang.name }}
            </div>
          </div>
          
          <div class="tab-content">
            <div v-show="activeAbilitiesTab === 'kz'" class="tab-pane">
              <p>{{ result.abilitiesKz || 'Нет данных' }}</p>
            </div>
            <div v-show="activeAbilitiesTab === 'ru'" class="tab-pane">
              <p>{{ result.abilitiesRu || 'Нет данных' }}</p>
            </div>
            <div v-show="activeAbilitiesTab === 'en'" class="tab-pane">
              <p>{{ result.abilitiesEn || 'Нет данных' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Дополнительные объяснения -->
        <div class="result-section" v-if="result.explanations">
          <h3>Дополнительные рекомендации</h3>
          <div class="tab-content">
            <p>{{ result.explanations }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExplanationBlock',
  props: {
    result: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: [String, null],
      default: null
    }
  },
  data() {
    return {
      activeKnowledgeTab: 'ru',
      activeSkillsTab: 'ru',
      activeAbilitiesTab: 'ru',
      languages: [
        { code: 'kz', name: 'Казахский' },
        { code: 'ru', name: 'Русский' },
        { code: 'en', name: 'Английский' }
      ]
    }
  },
  computed: {
    hasResults() {
      const result = this.result
      return !!(
        result.knowledgeKz || result.knowledgeRu || result.knowledgeEn ||
        result.skillsKz || result.skillsRu || result.skillsEn ||
        result.abilitiesKz || result.abilitiesRu || result.abilitiesEn ||
        result.explanations
      )
    }
  }
}
</script>

<style scoped>
.explanation-block {
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.block-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-left-color: #007bff;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  padding: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 5px;
  margin-bottom: 20px;
}

.no-results {
  padding: 20px;
  text-align: center;
  color: #666;
}

.result-section {
  margin-bottom: 25px;
}

.result-section h3 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #343a40;
}

.language-tabs {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #dee2e6;
}

.tab {
  padding: 8px 15px;
  cursor: pointer;
  border: 1px solid transparent;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: all 0.2s ease;
  margin-right: 5px;
  font-size: 14px;
}

.tab:hover {
  background-color: #f8f9fa;
}

.tab.active {
  border-color: #dee2e6;
  border-bottom-color: #fff;
  background-color: #fff;
  margin-bottom: -1px;
  color: #007bff;
  font-weight: 500;
}

.tab-content {
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 0 0 4px 4px;
}

.tab-pane {
  line-height: 1.6;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 767.98px) {
  .language-tabs {
    overflow-x: auto;
    white-space: nowrap;
    margin-bottom: 10px;
  }
  
  .tab {
    padding: 5px 10px;
    font-size: 13px;
  }
}
</style>
