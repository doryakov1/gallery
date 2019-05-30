function onInit() {
    createTodos();
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();
    sortBy();
    var strHtmls = todos.map(function(todo) {
            var className = (todo.isDone) ? 'done' : '';
            return `<li class="${className}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <span class="todo-time">${todo.date}</span>
            <button onclick="onDeleteTodo(event, '${todo.id}')">x</button>
        </li>`
        })
        //${todo.importance}
    document.querySelector('.todo-list').innerHTML = strHtmls.join('');

    renderStats();

    // console.table(gTodos)
}

function renderStats() {
    console.log(gTodos.length)

    if (!gTodos.length) {
        document.querySelector('.alert').style.display = "block";
        document.querySelector('.stats-containert').style.display = "none";
        return;
    }
    document.querySelector('.stats-containert').style.display = "block";
    document.querySelector('.alert').style.display = "none";

    document.querySelector('.total-count').innerText = getTotalCount();
    document.querySelector('.active-count').innerText = getActiveCount()

}

function onAddTodo() {
    var txt = prompt('What todo?');
    if (!txt || txt == ' ') {
        alert('Unvailed text');
        return;
    }
    var importance = prompt('It is importance? press 1-3  ');
    addTodo(txt, importance);
    renderTodos();
}

function onDeleteTodo(ev, todoId) {
    ev.stopPropagation();
    deleteTodo(todoId);
    renderTodos();
}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(txt) {
    console.log('Filtering by', txt);
    setFilter(txt);
    renderTodos();
}

function onSetSort(txt) {
    console.log('Sorting by', txt);
    setSort(txt);
    renderTodos();
}