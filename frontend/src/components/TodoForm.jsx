import { useState } from 'react'

const TodoForm = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim()) return

        onSubmit({
            title: title.trim(),
            description: description.trim()
        })

        // Reset form
        setTitle('')
        setDescription('')
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Todo</h3>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="todo-form">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title *
                    </label>
                    <input
                        type="text"
                        id="title"
                        data-testid="todo-title-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter todo title"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        data-testid="todo-description-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter todo description (optional)"
                    />
                </div>
                <div className="flex space-x-3">
                    <button
                        type="submit"
                        disabled={!title.trim()}
                        data-testid="add-todo-submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add Todo
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        data-testid="cancel-todo-button"
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm 