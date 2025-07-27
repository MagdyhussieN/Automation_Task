import { useState } from 'react'

const TodoItem = ({ todo, isEditing, onEdit, onCancelEdit, onSaveEdit, onDelete }) => {
    const [title, setTitle] = useState(todo.title)
    const [description, setDescription] = useState(todo.description)

    const handleSave = () => {
        if (!title.trim()) return
        onSaveEdit({
            title: title.trim(),
            description: description.trim(),
            completed: todo.completed
        })
    }

    const handleToggleComplete = () => {
        onSaveEdit({
            title: todo.title,
            description: todo.description,
            completed: !todo.completed
        })
    }

    const handleCancel = () => {
        setTitle(todo.title)
        setDescription(todo.description)
        onCancelEdit()
    }

    if (isEditing) {
        return (
            <li className="px-6 py-4" data-testid="todo-item">
                <div className="space-y-3">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        data-testid="edit-todo-title-input"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Todo title"
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        data-testid="edit-todo-description-input"
                        rows="2"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Todo description"
                    />
                    <div className="flex space-x-2">
                        <button
                            onClick={handleSave}
                            disabled={!title.trim()}
                            data-testid="save-todo-button"
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium disabled:opacity-50"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            data-testid="cancel-edit-button"
                            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </li>
        )
    }

    return (
        <li className="px-6 py-4" data-testid="todo-item">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={handleToggleComplete}
                        data-testid="todo-checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-medium text-gray-900 ${todo.completed ? 'line-through text-gray-500' : ''}`} data-testid="todo-title">
                            {todo.title}
                        </h3>
                        {todo.description && (
                            <p className={`text-sm text-gray-500 mt-1 ${todo.completed ? 'line-through' : ''}`} data-testid="todo-description">
                                {todo.description}
                            </p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                            Created: {new Date(todo.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={onEdit}
                        data-testid="edit-todo-button"
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                        data-testid="delete-todo-button"
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </li>
    )
}

export default TodoItem 