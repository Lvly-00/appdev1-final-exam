import axios from 'axios'

// Use environment variable (required in exam)
const API_BASE =
    import.meta.env.VITE_APP_API_URL || 'https://jsonplaceholder.typicode.com'

// Axios instance
const instance = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
})


// GET /todos (limit to 20 to match template behavior)
export const getTodosAPI = async() => {
    const res = await instance.get('/todos')
    return res.data.slice(0, 20)
}

// POST /todos
export const addTodoAPI = async({ title, userId = 1 }) => {
    const payload = { title, completed: false, userId }
    const res = await instance.post('/todos', payload)
    return res.data
}

// PUT /todos/:id
export const updateTodoAPI = async(todo) => {
    const res = await instance.put(`/todos/${todo.id}`, todo)
    return res.data
}

// DELETE /todos/:id
export const deleteTodoAPI = async(id) => {
    await instance.delete(`/todos/${id}`)
    return id // match old behavior (resolve with id)
}



export const getUsersAPI = async(limit = 3) => {
    const res = await instance.get('/users')
    return res.data.slice(0, limit)
}

export default {
    getTodosAPI,
    addTodoAPI,
    updateTodoAPI,
    deleteTodoAPI,
    getUsersAPI,
}