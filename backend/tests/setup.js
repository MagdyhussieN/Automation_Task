const fs = require('fs').promises;
const path = require('path');

const TEST_USERS_FILE = path.join(__dirname, '../data/test-users.json');
const TEST_TODOS_FILE = path.join(__dirname, '../data/test-todos.json');

const testUsers = [
    {
        "id": 1,
        "email": "test@example.com",
        "password": "testpass123",
        "name": "Test User"
    }
];

const testTodos = [
    {
        "id": 1,
        "title": "Test Todo 1",
        "description": "First test todo",
        "completed": false,
        "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
        "id": 2,
        "title": "Test Todo 2",
        "description": "Second test todo",
        "completed": true,
        "createdAt": "2024-01-01T00:00:00.000Z"
    }
];

async function setupTestData() {
    try {
        // Ensure test data directory exists
        const dataDir = path.dirname(TEST_USERS_FILE);
        await fs.mkdir(dataDir, { recursive: true });

        // Write test users
        await fs.writeFile(TEST_USERS_FILE, JSON.stringify(testUsers, null, 2));

        // Write test todos
        await fs.writeFile(TEST_TODOS_FILE, JSON.stringify(testTodos, null, 2));

        console.log('✅ Test data initialized');
    } catch (error) {
        console.error('❌ Error setting up test data:', error);
        throw error;
    }
}

async function cleanupTestData() {
    try {
        // Remove test files
        await fs.unlink(TEST_USERS_FILE).catch(() => { });
        await fs.unlink(TEST_TODOS_FILE).catch(() => { });

        console.log('✅ Test data cleaned up');
    } catch (error) {
        console.error('❌ Error cleaning up test data:', error);
    }
}

module.exports = {
    setupTestData,
    cleanupTestData,
    TEST_USERS_FILE,
    TEST_TODOS_FILE,
    testUsers,
    testTodos
}; 