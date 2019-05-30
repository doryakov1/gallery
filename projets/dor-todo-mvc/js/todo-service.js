var gTodos;
var gFilterBy = 'All';
var gSortrBy = 'Created';

function createTodos() {
    var todos = loadFromStorage('todos')
    if (!todos || !todos.length) {
        todos = [];
    }
    gTodos = todos;
    saveTodos();
}

function createTodo(txt) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        date: getCreatedAt()
    }
}

function getTodosForDisplay() {
    if (gFilterBy === 'All') return gTodos;
    return gTodos.filter(function(todo) {
        return (todo.isDone && gFilterBy === 'Done') ||
            (!todo.isDone && gFilterBy === 'Active')
    })
}


function addTodo(txt, importance) {
    var todo = createTodo(txt);
    todo.importance = importance;
    gTodos.unshift(todo);
    saveTodos();
}

function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function(todo) { return todo.id === todoId });
    if (confirm(`are you sure , to delete ` + gTodos[todoIdx].txt + ` ?`)) gTodos.splice(todoIdx, 1);
    saveTodos();
}


function toggleTodo(todoId) {
    var todo = gTodos.find(function(todo) { return todo.id === todoId });
    todo.isDone = !todo.isDone;
    saveTodos();
}

function setFilter(txt) {
    gFilterBy = txt;
}

function setSort(txt) {
    gSortrBy = txt;
}



function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    var activeTodos = gTodos.filter(function(todo) { return !todo.isDone })
    return activeTodos.length;
}

function saveTodos() {
    saveToStorage('todos', gTodos)
}


function getCreatedAt() {
    var d = new Date();
    var str = d.getFullYear() + '-' +
        (d.getMonth() + 1) + '-' +
        d.getDate() +
        ' At: ' + d.getHours() + ':' + d.getMinutes()

    return str;
}



function sortBy() {
    if (gSortrBy === 'Created') {
        gTodos.sort(function(todo1, todo2) {
            a = (todo1.date);
            b = (todo2.date);
            return a > b ? -1 : a < b ? 1 : 0;
        });
    } else if (gSortrBy === 'Text') {
        gTodos.sort(function(todo1, todo2) {
            a = (todo1.txt);
            b = (todo2.txt);
            return a < b ? -1 : a > b ? 1 : 0;
        });
    } else {
        gTodos.sort(function(todo1, todo2) {
            a = (todo1.importance);
            b = (todo2.importance);
            return a < b ? -1 : a > b ? 1 : 0;
        });
    }
}