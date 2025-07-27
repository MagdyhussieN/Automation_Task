const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');
const TODOS_FILE = path.join(__dirname, '../data/todos.json');

const defaultUsers = [
    {
        "id": 1,
        "email": "user@example.com",
        "password": "Mm12345!",
        "name": "Demo User"
    }
];

const defaultTodos = [
    {
        "id": 1,
        "title": "Learn React",
        "description": "Study React fundamentals and hooks",
        "completed": false,
        "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
        "id": 2,
        "title": "Build Todo App",
        "description": "Create a full-stack todo application",
        "completed": false,
        "createdAt": "2024-01-01T00:00:00.000Z"
    }
];

async function ensureDirectoryExists(dirPath) {
    try {
        await fs.access(dirPath);
    } catch (error) {
        await fs.mkdir(dirPath, { recursive: true });
    }
}

async function initializeData() {
    try {
        console.log('🚀 Initializing data files...');

        // Ensure data directory exists
        const dataDir = path.dirname(USERS_FILE);
        await ensureDirectoryExists(dataDir);

        // Initialize users file
        try {
            await fs.access(USERS_FILE);
            console.log('✅ Users file already exists');
        } catch (error) {
            await fs.writeFile(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
            console.log('✅ Created users.json with default data');
        }

        // Initialize todos file
        try {
            await fs.access(TODOS_FILE);
            console.log('✅ Todos file already exists');
        } catch (error) {
            await fs.writeFile(TODOS_FILE, JSON.stringify(defaultTodos, null, 2));
            console.log('✅ Created todos.json with default data');
        }

        console.log('🎉 Data initialization complete!');
    } catch (error) {
        console.error('❌ Error initializing data:', error);
        process.exit(1);
    }
}

// Run if this script is executed directly
if (require.main === module) {
    initializeData();
}

module.exports = { initializeData }; 