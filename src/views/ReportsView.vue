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
              <template v-if="msg.content.summary">
                <h3>Анализ файла</h3>
                <p><strong>Краткий обзор:</strong> {{ msg.content.summary }}</p>
                <div v-if="msg.content.key_insights?.length">
                  <h4>Ключевые выводы:</h4>
                  <ul>
                    <li v-for="(i, idx) in msg.content.key_insights" :key="idx">{{ i }}</li>
                  </ul>
                </div>
                <div v-if="msg.content.recommendations?.length">
                  <h4>Рекомендации:</h4>
                  <ul>
                    <li v-for="(r, idx) in msg.content.recommendations" :key="idx">{{ r }}</li>
                  </ul>
                </div>
              </template>
              
              <template v-else-if="msg.content.message">
                <p>{{ msg.content.message }}</p>
                <div v-if="msg.content.suggestions?.length">
                  <h4>Предложения:</h4>
                  <ul>
                    <li v-for="(s, idx) in msg.content.suggestions" :key="idx">{{ s }}</li>
                  </ul>
                </div>
              </template>
              
              <template v-else>
                {{ typeof msg.content === 'object' ? JSON.stringify(msg.content) : msg.content }}
              </template>
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

      // Сначала пушим своё сообщение в историю
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
          if (res.data.success) {
            this.pushAssistant(res.data.analysis, res.data.file);
          }
        } else {
          res = await axios.post('http://127.0.0.1:8000/api/file-analysis/message', {
            message: this.message.trim()
          });
          if (res.data.success) {
            this.pushAssistant(res.data.response);
          }
        }
      } catch (err) {
        this.showError(err.response?.data?.error || 'Ошибка сервера');
      } finally {
        this.message = '';
        this.clearSelectedFile();
        this.isLoading = false;
      }
    },
    pushAssistant(content, fileName = null) {
      this.messages.push({
        id: Date.now() + '_a',
        type: 'assistant',
        content,
        file: fileName,
        timestamp: Math.floor(Date.now() / 1000)
      });
      this.$nextTick(this.scrollToBottom);
    },
    handleFileSelect(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) {
        this.showError('Макс. размер 10 МБ');
        return;
      }
      this.selectedFile = file;
    },
    clearSelectedFile() {
      this.selectedFile = null;
      this.$refs.fileInput.value = '';
    },
    clearChat() {
      this.messages = [];
      this.message = '';
      this.clearSelectedFile();
    },
    scrollToBottom() {
      const c = this.$refs.chatMessages;
      if (c) c.scrollTop = c.scrollHeight;
    },
    formatTime(ts) {
      return new Date(ts * 1000).toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit'
      });
    },
    showError(msg) {
      alert(msg);
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
  padding: 10px 15px;
  border-radius: 8px;
  max-width: 80%;
}

.message.user {
  background-color: #e3f2fd;
  margin-left: auto;
}

.message.assistant {
  background-color: #ffffff;
  margin-right: auto;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 12px;
}

.message-author {
  font-weight: bold;
}

.message-time {
  color: #757575;
}

.file-info {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.file-icon {
  margin-right: 5px;
}

.assistant-response h3 {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 16px;
}

.assistant-response h4 {
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 14px;
}

.assistant-response ul {
  margin: 5px 0;
  padding-left: 20px;
}

.chat-input {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.file-upload-container {
  margin-bottom: 10px;
}

.selected-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: #e3f2fd;
  border-radius: 4px;
}

.clear-file {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #757575;
}

.input-container {
  display: flex;
  align-items: center;
}

.file-upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: #2196f3;
}

.file-input {
  display: none;
}

.message-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  margin: 0 10px;
  font-size: 14px;
  outline: none;
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
}

.send-button:hover {
  background-color: #1976d2;
}

.send-button:disabled {
  background-color: #90caf9;
  cursor: not-allowed;
}
</style>