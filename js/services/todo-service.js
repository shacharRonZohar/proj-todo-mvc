'use strict'

const STORAGE_KEY = 'todosDB'

// Play with this V
var gTodos
var gFilterBy = 'ALL'
var gSortBy = 'createdAt'

_createTodos()

function getTodosForDisplay() {
    sortBy(gTodos)
    return filterBy()
}

function sortBy(todos) {
    return todos.sort(_getSortFunc()[gSortBy])

    // Obsolete
    // if (gSortBy === 'CREATED') sortFunc = (a, b) => a.createdAt - b.createdAt
    // else if (gSortBy === 'TEXT') sortFunc = (a, b) => a.txt.localeCompare(b.txt)
    // else if (gSortBy === 'IMPORTANCE') sortFunc = (a, b) => b.importance - a.importance
    // gTodos.sort(sortFunc)
}

function filterBy() {
    if (gFilterBy === 'ALL') return gTodos
    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'DONE' ||
        !todo.isDone && gFilterBy === 'ACTIVE'
    )
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    var todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function addTodo(txt, importanceNum) {
    const todo = _createTodo(txt, importanceNum)
    gTodos.unshift(todo)
    _saveTodosToStorage()
}

function getTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy
    console.log('gSortBy', gSortBy)

}

function getDisplayTxt() {
    switch (gFilterBy) {
        case 'ALL':
            return ''
        case 'ACTIVE':
            return 'Active'
        case 'DONE':
            return 'Done'
    }
}

// function _createDemoTodos() {
//     gTodos = [
//         _createTodo('Learn HTML'),
//         _createTodo('Study CSS'),
//         _createTodo('Master Javascript'),
//     ]
//     _saveTodosToStorage()
//     return gTodos
// }

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master Javascript'),
        ]
        _saveTodosToStorage()
    }
}

function _createTodo(txt, importance = 0) {
    if (!importance) importance = 0
    const todo = {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance
    }
    return todo
}

function _getSortFunc() {
    return {
        createdAt: (a, b) => a.createdAt - b.createdAt,
        txt: (a, b) => a.txt.localeCompare(b.txt),
        importance: (a, b) => b.importance - a.importance
    }
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}