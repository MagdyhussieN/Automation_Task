const fs = require('fs').promises;
const path = require('path');

// Default file paths
const DEFAULT_USERS_FILE = path.join(__dirname, '../data/users.json');
const DEFAULT_TODOS_FILE = path.join(__dirname, '../data/todos.json');

// Allow custom file paths for testing
let USERS_FILE = DEFAULT_USERS_FILE;
let TODOS_FILE = DEFAULT_TODOS_FILE;

class DataService {
  // Method to set custom file paths (for testing)
  setFilePaths(usersFile, todosFile) {
    USERS_FILE = usersFile || DEFAULT_USERS_FILE;
    TODOS_FILE = todosFile || DEFAULT_TODOS_FILE;
  }

  // Users methods
  async getUsers() {
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users file:', error);
      return [];
    }
  }

  // async saveUsers(users) {
  //   try {
  //     await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  //   } catch (error) {
  //     console.error('Error writing users file:', error);
  //     throw error;
  //   }
  // }

  async findUserByEmail(email) {
    const users = await this.getUsers();
    return users.find(user => user.email === email);
  }

  // async addUser(user) {
  //   const users = await this.getUsers();
  //   const newUser = { ...user, id: Math.max(...users.map(u => u.id), 0) + 1 };
  //   users.push(newUser);
  //   await this.saveUsers(users);
  //   return newUser;
  // }

  // Todos methods
  async getTodos() {
    try {
      const data = await fs.readFile(TODOS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading todos file:', error);
      return [];
    }
  }

  async saveTodos(todos) {
    try {
      await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
    } catch (error) {
      console.error('Error writing todos file:', error);
      throw error;
    }
  }

  async addTodo(todo) {
    const todos = await this.getTodos();
    const newTodo = {
      ...todo,
      id: Math.max(...todos.map(t => t.id), 0) + 1,
      createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    await this.saveTodos(todos);
    return newTodo;
  }

  async updateTodo(id, updates) {
    const todos = await this.getTodos();
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    todos[todoIndex] = {
      ...todos[todoIndex],
      ...updates
    };

    await this.saveTodos(todos);
    return todos[todoIndex];
  }

  async deleteTodo(id) {
    const todos = await this.getTodos();
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];
    await this.saveTodos(todos);
    return deletedTodo;
  }

  async findTodoById(id) {
    const todos = await this.getTodos();
    return todos.find(todo => todo.id === parseInt(id));
  }
}

module.exports = new DataService(); 