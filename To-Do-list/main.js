// list.js
document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const itemForm = document.getElementById('itemForm');
    const itemInput = document.getElementById('itemInput');
    const itemList = document.querySelector('.item-list');
    const clearBtn = document.getElementById('clear-list');
    const feedback = document.querySelector('.feedback');

    // Массив для хранения задач
    let items = JSON.parse(localStorage.getItem('items')) || [];

    // Инициализация при загрузке
    if (items.length > 0) {
        items.forEach(item => {
            createItem(item);
        });
    }

    // Добавление новой задачи
    itemForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = itemInput.value.trim();
        
        if (text === '') {
            showFeedback('Пожалуйста, дайте задаче название', 'red');
            return;
        }

        const item = {
            id: Date.now(),
            text: text,
            completed: false
        };

        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        createItem(item);
        itemInput.value = '';
        showFeedback('Задача добавлена', 'green');
    });

    // Очистка списка
    clearBtn.addEventListener('click', function() {
        items = [];
        localStorage.removeItem('items');
        itemList.innerHTML = '';
        showFeedback('Лист задач очищен', 'green');
    });

    // Функция создания элемента
    function createItem(item) {
        const div = document.createElement('div');
        div.classList.add('item', 'my-3', 'd-flex', 'justify-content-between', 'align-items-center', 'border-bottom', 'border-success-subtle');
        div.setAttribute('data-id', item.id);

					div.innerHTML = `
							<div class="d-flex gap-2 align-items-center" style="min-height: 40px;">
									<h6 class="item-index border border-success-subtle rounded d-flex align-items-center justify-content-center ${item.completed ? 'completed' : ''}" 
											style="width: 25px; height: 25px; margin: 0; font-size: 14px;">
											${items.indexOf(item) + 1}
									</h6>
									<p class="item-name text-capitalize mb-0 ${item.completed ? 'completed' : ''}">${item.text}</p>
							</div>
							<div class="item-icons d-flex align-items-center">
									<i class="far fa-check-circle complete-item mx-2 item-icon ${item.completed ? 'text-muted' : 'text-success'}"></i>
									<i class="far fa-edit edit-item mx-2 item-icon text-secondary"></i>
									<i class="far fa-times-circle delete-item item-icon text-danger"></i>
							</div>
					`;

        // Добавление обработчиков для иконок
        const completeIcon = div.querySelector('.complete-item');
        const editIcon = div.querySelector('.edit-item');
        const deleteIcon = div.querySelector('.delete-item');

        completeIcon.addEventListener('click', function() {
            toggleComplete(item.id);
        });

        editIcon.addEventListener('click', function() {
            editItem(item.id);
        });

        deleteIcon.addEventListener('click', function() {
            deleteItem(item.id);
        });

        itemList.appendChild(div);
    }

    // Переключение статуса выполнения
function toggleComplete(id) {
    items = items.map(item => {
        if (item.id === id) {
            item.completed = !item.completed;
            
            const itemElement = document.querySelector(`[data-id="${id}"]`);
            if (itemElement) {
                const textElement = itemElement.querySelector('.item-name');
                const indexElement = itemElement.querySelector('.item-index');
                const iconElement = itemElement.querySelector('.complete-item');
                
                // Переключаем класс completed для текста и индекса
                textElement.classList.toggle('completed', item.completed);
                indexElement.classList.toggle('completed', item.completed);
                
                // Меняем только цвет иконки, не меняя форму
                if (item.completed) {
                    iconElement.classList.remove('text-success');
                    iconElement.classList.add('text-muted');
                } else {
                    iconElement.classList.remove('text-muted');
                    iconElement.classList.add('text-success');
                }
            }
            
            showFeedback(item.completed ? 'Задача выполнена!' : 'Отмена', 'green');
        }
        return item;
    });
    localStorage.setItem('items', JSON.stringify(items));
}

    // Редактирование задачи
    function editItem(id) {
        const item = items.find(item => item.id === id);
        const newText = prompt('Новое наименование задачи:', item.text);
        
        if (newText && newText.trim() !== '') {
            items = items.map(item => {
                if (item.id === id) {
                    item.text = newText.trim();
                }
                return item;
            });
            localStorage.setItem('items', JSON.stringify(items));
            refreshList();
        }
    }

    // Удаление задачи
    function deleteItem(id) {
        items = items.filter(item => item.id !== id);
        localStorage.setItem('items', JSON.stringify(items));
				showFeedback('Задача удалена', 'green');
        refreshList();
    }
		// Обновление списка
    function refreshList() {
        itemList.innerHTML = '';
        items.forEach(item => {
            createItem(item);
        });
    }

    // Показать уведомление
    function showFeedback(text, color) {
        feedback.textContent = text;
        feedback.classList.add(color);
        
        setTimeout(() => {
            feedback.classList.remove(color);
        }, 3000);
    }
});