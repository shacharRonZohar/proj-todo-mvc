'use strict'

function onInit() {
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (!confirm('Are you sure you want to delete?')) return
    removeTodo(todoId)
    renderTodos()
}

function renderTodos() {
    var strHTML = ''
    const todos = getTodosForDisplay()
    if (!todos.length) strHTML = `No ${getDisplayTxt()} todos!`
    else {
        var strHTMLs = todos.map(todo =>
            `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
                ${todo.txt}
                <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
                <br> <span class="${getImportanceClass(todo.importance)}">Importance: ${todo.importance}</span>
                <br> <span class="created-at">Created at: ${formatTime(todo.createdAt,'he-il')}</span>
                </li>`)
        strHTML = strHTMLs.join('')
    }
    document.querySelector('.todo-list').innerHTML = strHTML
    document.querySelector('.todos-total-count').innerText = getTodosCount()
    document.querySelector('.todos-active-count').innerText = getActiveTodosCount()
}


function onToggleTodo(todoId) {
    console.log('Toggling', todoId);
    toggleTodo(todoId)

    renderTodos()
}

function onAddTodo() {
    const elTxt = document.querySelector('input[name=todoTxt]')
    const txt = elTxt.value.trim()
    if (!txt) return
    const elImport = document.querySelector('input[name=importance-num]')
    const importanceNum = elImport.value
    addTodo(txt, importanceNum)
    elImport.value = ''
    elTxt.value = ''
    renderTodos()
}

function onSetFilter(filterBy) {
    console.log('Filtering By:', filterBy);
    setFilter(filterBy)
    renderTodos()
}

function onSetSort(sortBy) {
    setSort(sortBy)
    renderTodos()
}