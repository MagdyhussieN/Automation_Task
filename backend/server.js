const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dataService = require('./services/dataService');
const { initializeData } = require('./scripts/initData');

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize data files on startup
initializeData().then(() => {
    console.log('✅ Data files initialized');
}).catch(error => {
    console.error('❌ Error initializing data files:', error);
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Routes

// POST /login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await dataService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /todos - Get all todos
app.get('/todos', authenticateToken, async (req, res) => {
    try {
        const todos = await dataService.getTodos();
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /todos - Create a new todo
app.post('/todos', authenticateToken, async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        // Check for existing todo with same title
        const todos = await dataService.getTodos();
        const existingTodo = todos.find(todo => todo.title.toLowerCase() === title.toLowerCase());

        if (existingTodo) {
            return res.status(400).json({ message: 'A todo with this title already exists' });
        }

        const newTodo = await dataService.addTodo({
            title,
            description: description || '',
            completed: false
        });
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT /todos/:id - Update a todo
app.put('/todos/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Check if title is provided when trying to update it
    if (title !== undefined && !title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        // Check for duplicate title if title is being updated
        if (title) {
            const todos = await dataService.getTodos();
            const existingTodo = todos.find(todo =>
                todo.id !== parseInt(id) && // Exclude current todo
                todo.title.toLowerCase() === title.toLowerCase()
            );

            if (existingTodo) {
                return res.status(400).json({ message: 'A todo with this title already exists' });
            }
        }

        const updatedTodo = await dataService.updateTodo(id, {
            title: title !== undefined ? title : undefined,
            description: description !== undefined ? description : undefined,
            completed: completed !== undefined ? completed : undefined
        });
        res.json(updatedTodo);
    } catch (error) {
        if (error.message === 'Todo not found') {
            return res.status(404).json({ message: 'Todo not found' });
        }
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await dataService.deleteTodo(id);
        res.json({ message: 'Todo deleted successfully', todo: deletedTodo });
    } catch (error) {
        if (error.message === 'Todo not found') {
            return res.status(404).json({ message: 'Todo not found' });
        }
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
}); 