export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    payload: {
        text: todo.text,
        id: todo.id
    }
})
export const clearAll = () => ({
    type: 'CLEAR_ALL'
})
export const deleteTodo = (todo) => ({
    type: 'DELETE_TODO',
    payload: {
        id: todo.id
    }
})
export const editTodo = (todo, textEdit) => ({
    type: 'EDIT_TODO',
    payload: {
        todo: todo,
        text: textEdit,
    }
})