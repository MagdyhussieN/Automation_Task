const dataService = require('../services/dataService');
const fs = require('fs').promises;
const path = require('path');

// Mock the file paths to use test files
jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn(),
        writeFile: jest.fn(),
        access: jest.fn()
    }
}));

describe('DataService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getUsers', () => {
        it('should return users from file', async () => {
            const mockUsers = [
                { id: 1, email: 'test@example.com', password: 'testpass', name: 'Test User' }
            ];

            fs.readFile.mockResolvedValue(JSON.stringify(mockUsers));

            const result = await dataService.getUsers();

            expect(result).toEqual(mockUsers);
            expect(fs.readFile).toHaveBeenCalled();
        });

        it('should return empty array when file read fails', async () => {
            fs.readFile.mockRejectedValue(new Error('File not found'));

            const result = await dataService.getUsers();

            expect(result).toEqual([]);
        });
    });

    describe('findUserByEmail', () => {
        it('should find user by email', async () => {
            const mockUsers = [
                { id: 1, email: 'test@example.com', password: 'testpass', name: 'Test User' },
                { id: 2, email: 'other@example.com', password: 'otherpass', name: 'Other User' }
            ];

            fs.readFile.mockResolvedValue(JSON.stringify(mockUsers));

            const result = await dataService.findUserByEmail('test@example.com');

            expect(result).toEqual(mockUsers[0]);
        });

        it('should return undefined when user not found', async () => {
            const mockUsers = [
                { id: 1, email: 'test@example.com', password: 'testpass', name: 'Test User' }
            ];

            fs.readFile.mockResolvedValue(JSON.stringify(mockUsers));

            const result = await dataService.findUserByEmail('nonexistent@example.com');

            expect(result).toBeUndefined();
        });
    });

    describe('getTodos', () => {
        it('should return todos from file', async () => {
            const mockTodos = [
                { id: 1, title: 'Test Todo', description: 'Test description', completed: false }
            ];

            fs.readFile.mockResolvedValue(JSON.stringify(mockTodos));

            const result = await dataService.getTodos();

            expect(result).toEqual(mockTodos);
            expect(fs.readFile).toHaveBeenCalled();
        });

        it('should return empty array when file read fails', async () => {
            fs.readFile.mockRejectedValue(new Error('File not found'));

            const result = await dataService.getTodos();

            expect(result).toEqual([]);
        });
    });

    describe('addTodo', () => {
        it('should add new todo with auto-generated id', async () => {
            const existingTodos = [
                { id: 1, title: 'Existing Todo', description: 'Existing', completed: false }
            ];

            const newTodo = {
                title: 'New Todo',
                description: 'New description',
                completed: false
            };

            fs.readFile.mockResolvedValue(JSON.stringify(existingTodos));
            fs.writeFile.mockResolvedValue();

            const result = await dataService.addTodo(newTodo);

            expect(result.id).toBe(2); // Auto-generated ID
            expect(result.title).toBe('New Todo');
            expect(result.description).toBe('New description');
            expect(result.completed).toBe(false);
            expect(result.createdAt).toBeDefined();
            expect(fs.writeFile).toHaveBeenCalled();
        });

        it('should handle empty todos array', async () => {
            fs.readFile.mockResolvedValue(JSON.stringify([]));
            fs.writeFile.mockResolvedValue();

            const newTodo = {
                title: 'First Todo',
                description: 'First description',
                completed: false
            };

            const result = await dataService.addTodo(newTodo);

            expect(result.id).toBe(1);
        });
    });

    describe('updateTodo', () => {
        it('should update existing todo', async () => {
            const existingTodos = [
                { id: 1, title: 'Original Title', description: 'Original', completed: false }
            ];

            fs.readFile.mockResolvedValue(JSON.stringify(existingTodos));
            fs.writeFile.mockResolvedValue();

            const updates = {
                title: 'Updated Title',
                completed: true
            };

            const result = await dataService.updateTodo(1, updates);

            expect(result.title).toBe('Updated Title');
            expect(result.completed).toBe(true);
            expect(result.description).toBe('Original'); // Should remain unchanged
            expect(fs.writeFile).toHaveBeenCalled();
        });

        it('should throw error when todo not found', async () => {
            const existingTodos = [
                { id: 1, title: 'Existing Todo', description: 'Existing', completed: false }
            ];

            fs.readFile.mockResolvedValue(JSON.stringify(existingTodos));

            await expect(dataService.updateTodo(999, { title: 'Updated' }))
                .rejects.toThrow('Todo not found');
        });
    });

    describe('deleteTodo', () => {
        it('should delete existing todo', async () => {
            const existingTodos = [
                { id: 1, title: 'Todo to Delete', description: 'Will be deleted', completed: false },
                { id: 2, title: 'Keep This', description: 'Will remain', completed: false }
            ];

            fs.readFile.mockResolvedValue(JSON.stringify(existingTodos));
            fs.writeFile.mockResolvedValue();

            const result = await dataService.deleteTodo(1);

            expect(result.title).toBe('Todo to Delete');
            expect(fs.writeFile).toHaveBeenCalledWith(
                expect.any(String),
                JSON.stringify([existingTodos[1]], null, 2)
            );
        });

        it('should throw error when todo not found', async () => {
            const existingTodos = [
                { id: 1, title: 'Existing Todo', description: 'Existing', completed: false }
            ];

            fs.readFile.mockResolvedValue(JSON.stringify(existingTodos));

            await expect(dataService.deleteTodo(999))
                .rejects.toThrow('Todo not found');
        });
    });

    describe('findTodoById', () => {
        it('should find todo by id', async () => {
            const mockTodos = [
                { id: 1, title: 'First Todo', description: 'First', completed: false },
                { id: 2, title: 'Second Todo', description: 'Second', completed: true }
            ];

            fs.readFile.mockResolvedValue(JSON.stringify(mockTodos));

            const result = await dataService.findTodoById(2);

            expect(result).toEqual(mockTodos[1]);
        });

        it('should return undefined when todo not found', async () => {
            const mockTodos = [
                { id: 1, title: 'Existing Todo', description: 'Existing', completed: false }
            ];

            fs.readFile.mockResolvedValue(JSON.stringify(mockTodos));

            const result = await dataService.findTodoById(999);

            expect(result).toBeUndefined();
        });
    });
}); 