// import {createComparison, defaultRules} from "../lib/compare.js";

// // @todo: #4.3 — настроить компаратор
// const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                        const option = document.createElement('option');
                        option.value = name;
                        option.textContent = name;
                        return option;                                // @todo: создать и вернуть тег опции
                      })
        )
     })
    }

    const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку пол
    
        if (action && action.name === 'clear') {
            const field = action.parentElement;
            const input = field.querySelector('input, select');
            const fieldName = action.dataset.field;
            input.value = '';
            state[fieldName] = '';
        }
        

        
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })
        

            return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }
    
}