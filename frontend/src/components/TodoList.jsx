import { useState } from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ todos, onUpdate, onDelete }) => {
    const [editingId, setEditingId] = useState(null)

    const handleEdit = (id) => {
        setEditingId(id)
    }

    const handleCancelEdit = () => {
        setEditingId(null)
    }

    const handleSaveEdit = async (id, todoData) => {
        await onUpdate(id, todoData)
        setEditingId(null)
    }

    if (todos.length === 0) {
        return (
            <div className="text-center py-12" data-testid="empty-todo-message">
                <div className="text-gray-500 text-lg">No todos yet. Create your first todo!</div>
            </div>
        )
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md" data-testid="todo-list">
            <ul className="divide-y divide-gray-200">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        isEditing={editingId === todo.id}
                        onEdit={() => handleEdit(todo.id)}
                        onCancelEdit={handleCancelEdit}
                        onSaveEdit={(todoData) => handleSaveEdit(todo.id, todoData)}
                        onDelete={() => onDelete(todo.id)}
                    />
                ))}
            </ul>
        </div>
    )
}

export default TodoList 