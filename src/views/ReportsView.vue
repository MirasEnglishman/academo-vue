<template>
  <div class="file-analysis-chat">
    <div class="chat-container">
      <div class="chat-header">
        <h1>Анализ файлов</h1>
        <button @click="clearChat" class="clear-button">Очистить чат</button>
      </div>
      
      <div class="chat-messages" ref="chatMessages">
        <div v-if="!messages.length" class="empty-chat">
          Загрузите файл или отправьте сообщение для анализа.
        </div>
        
        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['message', msg.type]"
        >
          <div class="message-header">
            <span class="message-author">
              {{ msg.type === 'user' ? 'Вы' : 'Ассистент' }}
            </span>
            <span class="message-time">{{ formatTime(msg.timestamp) }}</span>
          </div>
          
          <div class="message-content">
            <div v-if="msg.file" class="file-info">
              <span class="file-icon">📎</span>
              <span class="file-name">{{ msg.file }}</span>
            </div>
            
            <div v-if="msg.type === 'user'">
              {{ msg.content }}
            </div>
            
            <div v-else class="assistant-response">
              <div v-if="isFileAnalysis(msg.content)" class="analysis-report">
                <h3 class="report-title">📊 Отчет по анализу файла</h3>
                
                <!-- Название файла -->
                <div v-if="msg.content.file" class="file-header">
                  <span class="file-icon">📄</span>
                  <span class="analyzed-file-name">{{ msg.content.file }}</span>
                </div>
                
                <!-- Краткое резюме -->
                <div v-if="msg.content.summary" class="report-section">
                  <h4 class="section-title">📝 Краткое резюме</h4>
                  <p class="summary-text">{{ msg.content.summary }}</p>
                </div>
                
                <!-- Ключевые находки -->
                <div v-if="msg.content.findings" class="report-section">
                  <h4 class="section-title">🔍 Ключевые находки</h4>
                  <ul class="findings-list">
                    <li v-for="(finding, idx) in msg.content.findings" :key="idx" class="finding-item">
                      <span class="bullet">•</span>
                      {{ finding }}
                    </li>
                  </ul>
                </div>
                
                <!-- Практические рекомендации -->
                <div v-if="msg.content.recommendations" class="report-section">
                  <h4 class="section-title">💡 Практические рекомендации</h4>
                  <ul class="recommendations-list">
                    <li v-for="(rec, idx) in msg.content.recommendations" :key="idx" class="recommendation-item">
                      <span class="bullet">▶</span>
                      {{ rec }}
                    </li>
                  </ul>
                </div>
                
                <!-- Следующие шаги -->
                <div v-if="msg.content.next_steps" class="report-section">
                  <h4 class="section-title">🎯 Следующие шаги</h4>
                  <ul class="next-steps-list">
                    <li v-for="(step, idx) in msg.content.next_steps" :key="idx" class="next-step-item">
                      <span class="step-number">{{ idx + 1 }}.</span>
                      {{ step }}
                    </li>
                  </ul>
                </div>
              </div>
              
              <!-- Обычный ответ на сообщение -->
              <div v-else-if="msg.content.message" class="simple-response">
                <p class="response-text">{{ msg.content.message }}</p>
                <div v-if="msg.content.suggestions?.length" class="suggestions-section">
                  <h4 class="suggestions-title">💭 Предложения:</h4>
                  <ul class="suggestions-list">
                    <li v-for="(suggestion, idx) in msg.content.suggestions" :key="idx" class="suggestion-item">
                      {{ suggestion }}
                    </li>
                  </ul>
                </div>
              </div>
              
              <!-- Fallback для необработанных ответов -->
              <div v-else class="raw-response">
                <pre>{{ formatContent(msg.content) }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chat-input">
        <div class="file-upload-container" v-if="selectedFile">
          <div class="selected-file">
            <span class="file-name">{{ selectedFile.name }}</span>
            <button @click="clearSelectedFile" class="clear-file">×</button>
          </div>
        </div>
        
        <div class="input-container">
          <label for="file-upload" class="file-upload-label">
            <span class="file-icon">📎</span>
          </label>
          <input
            id="file-upload"
            type="file"
            @change="handleFileSelect"
            class="file-input"
            ref="fileInput"
          />
          
          <input
            v-model="message"
            @keyup.enter="sendMessage"
            placeholder="Введите сообщение..."
            class="message-input"
          />
          
          <button
            @click="sendMessage"
            class="send-button"
            :disabled="isLoading"
          >
            <span v-if="isLoading">⏳</span>
            <span v-else>➤</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FileAnalysisChat',
  data() {
    return {
      messages: [],
      message: '',
      selectedFile: null,
      isLoading: false
    };
  },
  methods: {
    async sendMessage() {
      if (this.isLoading || (!this.message.trim() && !this.selectedFile)) return;
      this.isLoading = true;

      // Добавляем сообщение пользователя
      this.messages.push({
        id: Date.now() + '_u',
        type: 'user',
        content: this.message.trim(),
        file: this.selectedFile?.name,
        timestamp: Math.floor(Date.now() / 1000)
      });

      try {
        let res;
        if (this.selectedFile) {
          const fd = new FormData();
          fd.append('file', this.selectedFile);
          if (this.message.trim()) {
            fd.append('message', this.message.trim());
          }
          res = await axios.post('http://127.0.0.1:8000/api/file-analysis/analyze', fd, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          res = await axios.post('http://127.0.0.1:8000/api/file-analysis/message', {
            message: this.message.trim()
          });
        }

        // Обрабатываем успешный ответ
        if (res.data.success) {
          if (res.data.data && res.data.data.analysis) {
            // Ответ с анализом файла (для нового формата JSON)
            const analysis = res.data.data.analysis[0]; // Берем первый элемент анализа из массива
            this.pushAssistant({
              file: res.data.data.file,
              summary: analysis.summary,
              findings: analysis.findings,
              recommendations: analysis.recommendations,
              next_steps: analysis.next_steps
            });
          } else if (res.data.response) {
            // Обычный ответ на сообщение
            this.pushAssistant(res.data.response);
          }
        } else {
          this.showError(res.data.error || 'Произошла ошибка при обработке запроса');
        }
      } catch (err) {
        console.error('Ошибка запроса:', err);
        this.showError(err.response?.data?.error || 'Ошибка сервера');
      } finally {
        this.message = '';
        this.clearSelectedFile();
        this.isLoading = false;
      }
    },

    pushAssistant(content) {
      this.messages.push({
        id: Date.now() + '_a',
        type: 'assistant',
        content,
        timestamp: Math.floor(Date.now() / 1000)
      });
      this.$nextTick(this.scrollToBottom);
    },

    isFileAnalysis(content) {
      // Проверяем, является ли контент анализом файла для нового формата
      return content && 
             typeof content === 'object' && 
             (content.summary || content.findings || content.recommendations || content.next_steps);
    },

    formatContent(content) {
      if (typeof content === 'object') {
        return JSON.stringify(content, null, 2);
      }
      return content;
    },

    handleFileSelect(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      // Проверяем размер файла (максимум 10 МБ)
      if (file.size > 10 * 1024 * 1024) {
        this.showError('Максимальный размер файла: 10 МБ');
        return;
      }
      
      this.selectedFile = file;
    },

    clearSelectedFile() {
      this.selectedFile = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },

    clearChat() {
      this.messages = [];
      this.message = '';
      this.clearSelectedFile();
    },

    scrollToBottom() {
      const container = this.$refs.chatMessages;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },

    formatTime(timestamp) {
      return new Date(timestamp * 1000).toLocaleTimeString([], {
        hour: '2-digit', 
        minute: '2-digit'
      });
    },

    showError(message) {
      alert(message);
      // Можно заменить на более красивое уведомление
    }
  }
};
</script>

<style scoped>
.file-analysis-chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chat-header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.clear-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.clear-button:hover {
  background-color: #d32f2f;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
}

.empty-chat {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #757575;
  font-style: italic;
}

.message {
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 12px;
  max-width: 85%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message.user {
  background-color: #e3f2fd;
  margin-left: auto;
  border: 1px solid #bbdefb;
}

.message.assistant {
  background-color: #ffffff;
  margin-right: auto;
  border: 1px solid #e0e0e0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
}

.message-author {
  font-weight: bold;
  color: #1976d2;
}

.message-time {
  color: #757575;
}

.file-info {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 6px 10px;
  background-color: rgba(25, 118, 210, 0.1);
  border-radius: 6px;
  border-left: 3px solid #1976d2;
}

.file-icon {
  margin-right: 8px;
}

/* Стили для отчета по анализу */
.analysis-report {
  line-height: 1.6;
}

.report-title {
  color: #1976d2;
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid #e3f2fd;
  padding-bottom: 8px;
}

.file-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 6px;
  border-left: 4px solid #4caf50;
}

.analyzed-file-name {
  font-weight: 600;
  color: #2e7d32;
}

.report-section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fafafa;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.section-title {
  color: #333;
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
}

.summary-text {
  margin: 0;
  padding: 10px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  font-style: italic;
  line-height: 1.5;
}

.findings-list, .recommendations-list, .next-steps-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.finding-item, .recommendation-item, .next-step-item {
  margin-bottom: 10px;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: flex-start;
}

.finding-item .bullet {
  color: #4caf50;
  font-weight: bold;
  margin-right: 10px;
  font-size: 16px;
}

.recommendation-item .bullet {
  color: #ff9800;
  font-weight: bold;
  margin-right: 10px;
  font-size: 14px;
}

.next-step-item .step-number {
  color: #9c27b0;
  font-weight: bold;
  margin-right: 10px;
  min-width: 20px;
}

/* Стили для простого ответа */
.simple-response {
  line-height: 1.6;
}

.response-text {
  margin: 0 0 15px 0;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 6px;
  border-left: 3px solid #2196f3;
}

.suggestions-section {
  margin-top: 15px;
}

.suggestions-title {
  color: #333;
  margin: 0 0 10px 0;
  font-size: 14px;
  font-weight: 600;
}

.suggestions-list {
  margin: 0;
  padding-left: 20px;
}

.suggestion-item {
  margin-bottom: 8px;
  color: #555;
}

/* Стили для необработанного контента */
.raw-response pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #ddd;
  overflow-x: auto;
  font-size: 13px;
  color: #333;
}

/* Стили для ввода */
.chat-input {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.file-upload-container {
  margin-bottom: 10px;
}

.selected-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #e3f2fd;
  border-radius: 6px;
  border: 1px solid #bbdefb;
}

.clear-file {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #757575;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: #2196f3;
  border: 2px solid #e0e0e0;
  border-radius: 50%;
  transition: all 0.3s;
}

.file-upload-label:hover {
  border-color: #2196f3;
  background-color: #e3f2fd;
}

.file-input {
  display: none;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.message-input:focus {
  border-color: #2196f3;
}

.send-button {
  background-color: #2196f3;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover:not(:disabled) {
  background-color: #1976d2;
}

.send-button:disabled {
  background-color: #90caf9;
  cursor: not-allowed;
}

/* Адаптивность */
@media (max-width: 768px) {
  .message {
    max-width: 95%;
  }
  
  .chat-container {
    padding: 10px;
  }
}
</style>