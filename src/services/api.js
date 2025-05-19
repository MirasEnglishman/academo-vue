const API_URL = 'http://127.0.0.1:8000/api';

/**
 * Отправляет данные о дисциплине на анализ
 * @param {Object} disciplineData - данные о дисциплине
 * @returns {Promise<Object>} результат анализа (объект)
 */
export async function analyzeDiscipline(disciplineData) {
  try {
    const response = await fetch(`${API_URL}/discipline/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(disciplineData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка сервера: ${response.status} ${errorText}`);
    }

    const json = await response.json();

    // если вернулся массив из одного элемента — распаковываем в объект
    if (Array.isArray(json) && json.length === 1) {
      return json[0];
    }

    return json;
  } catch (error) {
    console.error('Ошибка при отправке данных analyseDiscipline:', error);
    throw error;
  }
}


/**
 * Отправляет массив дисциплин на анализ учебного плана
 * @param {Array<Object>} disciplines - список дисциплин
 * @returns {Promise<Object>} результат анализа (объект)
 */
export async function analyzeCurriculum(disciplines) {
  try {
    const response = await fetch(`${API_URL}/curriculum/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ disciplines }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка сервера: ${response.status} ${errorText}`);
    }

    const json = await response.json();

    // тоже распаковываем единичный массив
    if (Array.isArray(json) && json.length === 1) {
      return json[0];
    }

    return json;
  } catch (error) {
    console.error('Ошибка при отправке данных analyseCurriculum:', error);
    throw error;
  }
}


export async function analyzeSyllabus(syllabusData) {
  try {
    const response = await fetch(`${API_URL}/syllabus/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(syllabusData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка сервера: ${response.status} ${errorText}`);
    }

    const json = await response.json();

    if (Array.isArray(json) && json.length === 1) {
      return json[0];
    }

    return json;
  } catch (error) {
    console.error('Ошибка при отправке данных syllabusData:', error);
    throw error;
  }
}
