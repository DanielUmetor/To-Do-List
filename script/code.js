let todoArray = [];

function addItem() {
    let input = document.getElementById('todoInput');
    let taskName = input.value.trim();

    if (taskName === "" || taskName.length <= 3 || taskName[0] !== taskName[0].toUpperCase()) {
        alert("Task must not be empty, must start with an uppercase letter, and must be more than three characters.");
        return;
    }

    let task = {
        id: Date.now(),
        name: taskName,
        createdDate: new Date(),
        completed: false
    };

    todoArray.push(task);
    input.value = '';
    renderList();
}

function renderList() {
    let todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todoArray.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = task.completed ? 'completed' : '';
        listItem.innerHTML = `
            <input type="checkbox" onclick="toggleComplete(${task.id})" ${task.completed ? 'checked' : ''}>
            ${task.name}
            <button class="close" onclick="removeItem(${task.id})">&times;</button>
        `;
        todoList.appendChild(listItem);
    });
}

function toggleComplete(id) {
    todoArray = todoArray.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderList();
}

function removeItem(id) {
    todoArray = todoArray.filter(task => task.id !== id);
    renderList();
}

function sortItems() {
    todoArray.sort((a, b) => a.name.localeCompare(b.name));
    renderList();
}
