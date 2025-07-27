import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
import api from '../services/api'

const Dashboard = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showForm, setShowForm] = useState(false)

    const { user, logout } = useAuth()

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try {
            setLoading(true)
            const response = await api.get('/todos')
            setTodos(response.data)
            setError('')
        } catch (error) {
            setError('Failed to fetch todos')
            console.error('Error fetching todos:', error)
        } finally {
            setLoading(false)
        }
    }

    const addTodo = async (todoData) => {
        try {
            const response = await api.post('/todos', todoData)
            setTodos([...todos, response.data])
            setShowForm(false)
            setError('')
        } catch (error) {
            setError('Failed to add todo')
            console.error('Error adding todo:', error)
        }
    }

    const updateTodo = async (id, todoData) => {
        try {
            const response = await api.put(`/todos/${id}`, todoData)
            setTodos(todos.map(todo => todo.id === id ? response.data : todo))
            setError('')
        } catch (error) {
            setError('Failed to update todo')
            console.error('Error updating todo:', error)
        }
    }

    const deleteTodo = async (id) => {
        try {
            await api.delete(`/todos/${id}`)
            setTodos(todos.filter(todo => todo.id !== id))
            setError('')
        } catch (error) {
            setError('Failed to delete todo')
            console.error('Error deleting todo:', error)
        }
    }

    const handleLogout = () => {
        logout()
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow" data-testid="dashboard-header">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Todo Manager</h1>
                            <p className="text-gray-600" data-testid="user-welcome">Welcome, {user?.name}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            data-testid="logout-button"
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 rounded-md bg-red-50 p-4" data-testid="error-message">
                            <div className="text-sm text-red-700">{error}</div>
                        </div>
                    )}

                    {/* Add Todo Button */}
                    <div className="mb-6">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            data-testid="add-todo-button"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                            {showForm ? 'Cancel' : 'Add New Todo'}
                        </button>
                    </div>

                    {/* Todo Form */}
                    {showForm && (
                        <div className="mb-6">
                            <TodoForm onSubmit={addTodo} onCancel={() => setShowForm(false)} />
                        </div>
                    )}

                    {/* Todo List */}
                    <TodoList
                        todos={todos}
                        onUpdate={updateTodo}
                        onDelete={deleteTodo}
                    />
                </div>
            </main>
        </div>
    )
}

export default Dashboard 