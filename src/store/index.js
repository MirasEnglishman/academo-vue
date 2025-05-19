import { createStore } from 'vuex'
import { analyzeDiscipline } from '../services/api'

// Инициализация модулей дисциплин
function initModules() {
  return [
    {
      title: 'Модуль 1: Социально гуманитарный',
      disciplines: [
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 1, course: 'Psi 1102', credits: 3 },
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 1, course: 'SIK 1101', credits: 5 },
        { type: 'БД',  component: 'ВОК (вузовский обязательный компонент)', semester: 1, course: 'OPAK 1201', credits: 5 },
        { type: 'ООД', component: 'ВОК (вузовский обязательный компонент)', semester: 2, course: 'MEKDKP 2223', credits: 3 },
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 2, course: 'OP 1107', credits: 3 },
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 3, course: 'Fil 2102', credits: 5 }
      ]
    },
    {
      title: 'Модуль 2: Информационно - математический',
      disciplines: [
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 1, course: 'AG 1101', credits: 5 },
        { type: 'БД', component: 'КВ (компонент по выбору)', semester: 2, course: 'MA 1201', credits: 4 },
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 2, course: 'IKT 1105', credits: 5 },
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 3, course: 'DMML 2401', credits: 4 },
        { type: 'БД', component: 'КВ (компонент по выбору)', semester: 4, course: 'TVMS 2203', credits: 3 }
      ]
    },
    {
      title: 'Модуль 3: Языковой',
      disciplines: [
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 1, course: 'K(R)Ya1 1105', credits: 5 },
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 1, course: 'IYa1 1103', credits: 5 },
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 2, course: 'IYa2 1104', credits: 5 },
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 2, course: 'K(R)Ya2 1106', credits: 5 },
        { type: 'БД',  component: 'ВОК (вузовский обязательный компонент)', semester: 3, course: 'K(R)Ya3 2203', credits: 3 },
        { type: 'БД',  component: 'ВОК (вузовский обязательный компонент)', semester: 3, course: 'IYa3 2201', credits: 5 },
        { type: 'БД',  component: 'ВОК (вузовский обязательный компонент)', semester: 4, course: 'K(R)Ya4 2204', credits: 3 },
        { type: 'БД',  component: 'ВОК (вузовский обязательный компонент)', semester: 4, course: 'IYa4 2202', credits: 5 },
        { type: 'БД',  component: 'ВОК (вузовский обязательный компонент)', semester: 5, course: 'IYa5 3201', credits: 5 },
        { type: 'БД',  component: 'ВОК (вузовский обязательный компонент)', semester: 6, course: 'IYa6 3202', credits: 5 }
      ]
    },
    {
      title: 'Модуль 4: Личностного развития',
      disciplines: [
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 1, course: 'PhK 1106', credits: 2 },
        { type: 'ООД', component: 'ВОК (вузовский обязательный компонент)', semester: 2, course: 'VvAP 1203', credits: 2 },
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 2, course: 'PhK 1106', credits: 2 },
        { type: 'БД',  component: 'ВОК (вузовский обязательный компонент)', semester: 3, course: 'ET1110',   credits: 3 },
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 3, course: 'PhK 1106', credits: 2 },
        { type: 'ООД', component: 'ОК (Обязательный компонент)', semester: 4, course: 'PhK 1106', credits: 2 },
        { type: 'БД',  component: 'КВ (компонент по выбору)',                semester: 5, course: 'DM 3302',   credits: 5 },
        { type: 'БД',  component: 'КВ (компонент по выбору)',                semester: 5, course: 'IT-inf 3602', credits: 4 },
        { type: 'БД',  component: 'ВОК (вузовский обязательный компонент)', semester: 7, course: 'Mis 4401',  credits: 3 }
      ]
    },
    {
      title: 'Модуль 5: Практики',
      disciplines: [
        { type: 'БД', component: 'Профессиональная практика', semester: 2, course: 'EP',    credits: 1  },
        { type: 'БД', component: 'Профессиональная практика', semester: 4, course: 'PP',    credits: 3  },
        { type: 'ПД', component: 'Профессиональная практика', semester: 6, course: 'PP',    credits: 5  },
        { type: 'ПД', component: 'Профессиональная практика', semester: 8, course: 'PredP', credits: 12 }
      ]
    },
    {
      title: 'Модуль 6: Общепрофессиональный: Программирование, Базы данных, Технология программирования',
      disciplines: [
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 3, course: 'Fiz 2203',    credits: 3 },
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 3, course: 'ASDP 2202',   credits: 5 },
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 4, course: 'OOS 2603',    credits: 4 },
        { type: 'БД', component: 'КВ (компонент по выбору)',                semester: 4, course: 'OOP 2501',    credits: 5 },
        { type: 'БД', component: 'КВ (компонент по выбору)',                semester: 4, course: 'BD 2011',     credits: 5 },
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 5, course: 'KDG 3301',    credits: 4 },
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 5, course: 'AOKS 3610',   credits: 4 },
        { type: 'БД', component: 'КВ (компонент по выбору)',                semester: 5, course: 'WebProg 3301',credits: 4 }
      ]
    },
    {
      title: 'Модуль 7: Профессиональный',
      disciplines: [
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 5, course: 'Mark 3602',    credits: 4 },
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 6, course: 'VMO 3503',     credits: 5 },
        { type: 'ПД', component: 'ВОК (вузовский обязательный компонент)', semester: 6, course: 'TP 3507',      credits: 4 },
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 6, course: 'OACI 3604',    credits: 4 },
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 6, course: 'VOS 3305',     credits: 4 },
        { type: 'БД', component: 'ВОК (вузовский обязательный компонент)', semester: 6, course: 'CE 3203',      credits: 5 },
        { type: 'ПД', component: 'КВ (компонент по выбору)',                semester: 7, course: 'PSI 3610',     credits: 4 },
        { type: 'ПД', component: 'КВ (компонент по выбору)',                semester: 7, course: 'PKS 3608',     credits: 4 },
        { type: 'ПД', component: 'ВОК (вузовский обязательный компонент)', semester: 7, course: 'IBZI 4605',    credits: 5 },
        { type: 'ПД', component: 'КВ (компонент по выбору)',                semester: 7, course: 'APOPP4611',    credits: 5 },
        { type: 'ПД', component: 'КВ (компонент по выбору)',                semester: 7, course: 'RKP 4609',     credits: 5 },
        { type: 'ПД', component: 'ВОК (вузовский обязательный компонент)', semester: 7, course: 'MTP 4606',     credits: 4 }
      ]
    },
    {
      title: 'Модуль 7.1: Развитие специальности',
      disciplines: [
        { type: 'ПД', component: 'ВОК (вузовский обязательный компонент)', semester: 7, course: 'CK 4705',      credits: 5 },
        { type: 'ПД', component: 'ВОК (вузовский обязательный компонент)', semester: 7, course: 'UITP 4701',    credits: 5 },
        { type: 'ПД', component: 'КВ (компонент по выбору)',                semester: 7, course: 'RPMU F/D 4703',credits: 4 },
        { type: 'ПД', component: 'КВ (компонент по выбору)',                semester: 7, course: 'RМP 4704',     credits: 5 }
      ]
    },
    {
      title: 'Модуль 8: Модуль итоговой аттестации',
      disciplines: [
        { type: 'ИА', component: 'Написание и защита дипломной работы', semester: 8, course: 'IAB', credits: 12 }
      ]
    }
  ]
}

// Инициализация мок-данных силлабуса (15 недель + прочее)
function initSyllabusData() {
  return {
    tasks: [
      { id: 1, name: 'Определение целевой аудитории', description: 'Сегментировать аудиторию и описать портрет ЦА', period: 'Неделя 1', criteria: 'Детальный портрет ЦА' },
      { id: 2, name: 'SEO-аудит сайта',               description: 'Провести базовый SEO-аудит главной страницы', period: 'Неделя 2', criteria: 'Отчет с 5 ключевыми рекомендациями' },
      { id: 3, name: 'Настройка контекстной рекламы', description: 'Создать кампанию в Google Ads и запустить тестовый бюджет', period: 'Неделя 3', criteria: 'CTR ≥ 2%' }
    ],
    literature: [
      { id: 1, title: 'Digital Marketing for Dummies', author: 'Ryan Deiss', year: 2020, type: 'Учебник' },
      { id: 2, title: 'Основы SEO',                 author: 'Иван Иванов', year: 2019, type: 'Статья' },
      { id: 3, title: 'Контент-маркетинг',          author: 'Пётр Петров', year: 2021, type: 'Монография' }
    ],
    officeHours: [
      { id: 1, day: 'Понедельник', time: '14:00–16:00' },
      { id: 2, day: 'Среда',       time: '10:00–12:00' },
      { id: 3, day: 'Четверг',     time: '16:00–18:00' }
    ],
    weeks: [
      {
        number: 1,
        topic: 'Введение в Digital Marketing',
        questions: ['Что такое digital marketing?','Какие каналы входят в digital?'],
        seminar: 'Построить карту каналов коммуникации',
        materials: 'Статья «Что такое Digital Marketing?» на HubSpot',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 2,
        topic: 'Брендинг и позиционирование',
        questions: ['Как выстроить УТП?','Примеры успешных брендов в сети'],
        seminar: 'Разработать УТП для вымышленного продукта',
        materials: 'Главы 3–4 из «Digital Marketing for Dummies»',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 3,
        topic: 'Основы SEO',
        questions: ['Что такое ключевые слова?','Как устроен поисковый алгоритм?'],
        seminar: 'Подобрать 10 ключевых фраз для сайта',
        materials: 'Записи блога Moz по SEO',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 4,
        topic: 'Контекстная реклама (SEM)',
        questions: ['Что такое CTR и CPC?','Как составить объявление?'],
        seminar: 'Создать текст объявления для Google Ads',
        materials: 'Документация Google Ads',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 5,
        topic: 'Социальные сети (SMM)',
        questions: ['Как выбрать платформу?','Как измерять вовлечённость?'],
        seminar: 'Спланировать контент-план на неделю',
        materials: 'Блог Facebook Business',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 6,
        topic: 'Email-маркетинг',
        questions: ['Что такое рассылка?','Какие метрики важны?'],
        seminar: 'Настроить шаблон письма в Mailchimp',
        materials: 'Руководство Mailchimp',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 7,
        topic: 'Контент-маркетинг',
        questions: ['Какие форматы контента?','Как повысить трафик?'],
        seminar: 'Написать SEO-статью на 500 слов',
        materials: 'Главы из «Контент-маркетинг» Петрова',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 8,
        topic: 'Веб-аналитика и Google Analytics',
        questions: ['Какие показатели отслеживать?','Как поставить цели?'],
        seminar: 'Настроить цель конверсии в GA4',
        materials: 'Документация Google Analytics 4',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 9,
        topic: 'Мобильный маркетинг',
        questions: ['Что такое мобайл-CPA?','Как оптимизировать под мобильные?'],
        seminar: 'Проанализировать мобильный трафик сайта',
        materials: 'Исследование App Annie',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 10,
        topic: 'Affiliate Marketing',
        questions: ['Как работают партнёрки?','Примеры сетей?'],
        seminar: 'Составить схему партнёрской программы',
        materials: 'Статьи CJ и Admitad',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 11,
        topic: 'CRM и автоматизация',
        questions: ['Зачем нужна CRM?','Какие задачи автоматизировать?'],
        seminar: 'Настроить простой воронку в Bitrix24',
        materials: 'Документация Bitrix24',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 12,
        topic: 'UX и CRO',
        questions: ['Что такое A/B-тестирование?','Как улучшить конверсию?'],
        seminar: 'Запустить A/B-тест на лендинге',
        materials: 'Ресурсы Optimizely',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 13,
        topic: 'Маркетинговая стратегия',
        questions: ['Что входит в стратегию?','Пример стратегической матрицы?'],
        seminar: 'Разработать стратегию для кейса',
        materials: 'Главы из «Digital Marketing for Dummies»',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 14,
        topic: 'Бюджетирование и планирование',
        questions: ['Как распределить бюджет?','Какие KPI ставить?'],
        seminar: 'Составить бюджет рекламной кампании',
        materials: 'Шаблоны из Google Sheets',
        lectureHours: '2',
        seminarHours: '1'
      },
      {
        number: 15,
        topic: 'Итоговый проект и презентация',
        questions: ['Как защитить проект?','Что включить в презентацию?'],
        seminar: 'Презентовать финальный кейс',
        materials: 'Пример презентации в PowerPoint',
        lectureHours: '2',
        seminarHours: '1'
      }
    ]
  }
}
export default createStore({
  state: {
    disciplineForm: {
      level: 'Бакалавриат',
      code: 'AG 1101',
      nameKz: 'Алгебра және геометрия',
      descriptionKz: '«Алгебра және геометрия» пәнін оқу процесінде ...',
      nameRu: 'Алгебра и геометрия',
      descriptionRu: 'В процессе изучения дисциплины «Алгебра и геометрия» ...',
      nameEn: 'Algebra and Geometry',
      descriptionEn: 'In the process of studying the discipline "Algebra and Geometry" ...',
      examForm: 'Экзамен',
      prerequisite: 'Математика 1',
      languageDiscipline: 'Нет',
      physicalTraining: 'Нет',
      multilingualDiscipline: 'Нет',
      knowledgeKz: '',
      knowledgeRu: '',
      knowledgeEn: '',
      skillsKz: '',
      skillsRu: '',
      skillsEn: '',
      abilitiesKz: '',
      abilitiesRu: '',
      abilitiesEn: ''
    },
    analysisResult: {},
    loading: false,
    error: null,
    modules: [],
    availableDisciplines: [],
    syllabus: initSyllabusData()
  },
  mutations: {
    updateForm(state, { field, value }) {
      state.disciplineForm[field] = value
    },
    setAnalysisResult(state, result) {
      state.analysisResult = result
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    setError(state, error) {
      state.error = error
    },
    setModules(state, modules) {
      state.modules = modules
    },
    addModule(state, module) {
      state.modules.push(module)
    },
    removeModule(state, idx) {
      state.modules.splice(idx, 1)
    },
    addDiscipline(state, { moduleIndex, discipline }) {
      state.modules[moduleIndex].disciplines.push(discipline)
    },
    removeDiscipline(state, { moduleIndex, disciplineIndex }) {
      state.modules[moduleIndex].disciplines.splice(disciplineIndex, 1)
    },
    setAvailableDisciplines(state, list) {
      state.availableDisciplines = list
    },

    // ——— мутации для силлабуса ———
    addSyllabusTask(state, task)        { state.syllabus.tasks.push(task) },
    setSyllabusTasks(state, tasks)      { state.syllabus.tasks = tasks },
    addSyllabusLiterature(state, item)  { state.syllabus.literature.push(item) },
    setSyllabusLiterature(state, list)  { state.syllabus.literature = list },
    addSyllabusOfficeHour(state, oh)    { state.syllabus.officeHours.push(oh) },
    setSyllabusOfficeHours(state, list) { state.syllabus.officeHours = list },
    setSyllabusWeeks(state, weeks)      { state.syllabus.weeks = weeks }
  },
  actions: {
    async analyzeDiscipline({ commit, state }) {
      commit('setLoading', true)
      commit('setError', null)
      try {
        const result = await analyzeDiscipline(state.disciplineForm)
        commit('setAnalysisResult', result)
        Object.entries(result).forEach(([key, val]) => {
          if (key !== 'explanations') {
            commit('updateForm', { field: key, value: val })
          }
        })
        return result
      } catch (e) {
        commit('setError', e.message || 'Ошибка при анализе дисциплины')
        throw e
      } finally {
        commit('setLoading', false)
      }
    },
    async loadInitialData({ commit }) {
      commit('setModules', initModules())
      try {
        const response = await fetch('https://rospro-6f315-default-rtdb.firebaseio.com/disciplines.json')
        if (!response.ok) throw new Error('Не удалось загрузить дисциплины')
        const data = await response.json()
        const list = Object.keys(data || {}).map(key => ({ id: key, ...data[key] }))
        commit('setAvailableDisciplines', list)
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
      }
    },
    addModule({ commit, state }) {
      const newIndex = state.modules.length + 1
      commit('addModule', {
        title: `Модуль ${newIndex}: Новый модуль`,
        disciplines: []
      })
    },
    removeModule({ commit }, idx) {
      commit('removeModule', idx)
    },
    addDiscipline({ commit, state }, moduleIndex) {
      const defaultCode = state.availableDisciplines[0]?.code || ''
      commit('addDiscipline', {
        moduleIndex,
        discipline: {
          type: 'ООД',
          component: 'ОК (Обязательный компонент)',
          semester: 1,
          course: defaultCode,
          credits: 3
        }
      })
    },
    removeDiscipline({ commit }, payload) {
      commit('removeDiscipline', payload)
    }
  },
  getters: {
    disciplineForm: state => state.disciplineForm,
    analysisResult: state => state.analysisResult,
    isLoading: state => state.loading,
    error: state => state.error,
    modules: state => state.modules,
    availableDisciplines: state => state.availableDisciplines,

    // геттеры силлабуса
    syllabusTasks:       state => state.syllabus.tasks,
    syllabusLiterature:  state => state.syllabus.literature,
    syllabusOfficeHours: state => state.syllabus.officeHours,
    syllabusWeeks:       state => state.syllabus.weeks
  }
})
