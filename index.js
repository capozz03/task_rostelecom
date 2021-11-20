const url = 'https://jsonplaceholder.typicode.com/todos'

// Запрос на сервер

const getTodos = async(url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.slice(0, 20)
};

let todosList = document.querySelector('.todo__items');

// Создание элемента списка

const createLiElement = (el) => {
    let liLast = document.createElement('li');
    liLast.className = 'todo__item';
    liLast.textContent = el;
    return todosList.append(liLast)
}

// Заполнение списка при первом рендеринге

getTodos(url).then(data => {
    data.map(el => {
        return createLiElement(el.title)
    })
})

const getAllTodos = (data) => {
    todosList.innerHTML = '';
    data.map(el => {
        return createLiElement(el.title)
    })
}

// Фильтрация по выполненным и невыполненным заданиям

const filterOption = (select) => {
    const option = select.querySelector(`option[value="${select.value}"]`)
    const optionClass = option.value;
    if (optionClass === 'active') {
        getTodos(url).then(data => {
            let arrActive = [];
            data.map(item => {
                if (item.completed) {
                    return arrActive.push(item)
                }
            })
            return getAllTodos(arrActive)
        })
    } else if (optionClass === 'completed') {
        getTodos(url).then(data => {
            let arrDeleted = [];
            data.map(item => {
                if (!item.completed) {
                    return arrDeleted.push(item)
                }
            })
            return getAllTodos(arrDeleted)
        })  
    } else {
        let allArr = []
        getTodos(url).then(data => {
            data.map(item => allArr.push(item))
            return getAllTodos(allArr)
        })
    }
}

// Добавить задание в лист

const button = document.querySelector('.todo__add');
const input  = document.querySelector('.todo__text');

const addTodo = () => {
    if (input.value === "") return;
    createLiElement(input.value)
    input.value = ""
}
  
button.addEventListener('click', addTodo);







