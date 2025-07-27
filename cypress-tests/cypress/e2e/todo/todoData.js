// Test data for todo functionality
export const todoData = {

    // Todo creation test data
    newTodos: [
        {
            title: 'Test Magdy Hussien',
            description: 'Magdy Hussien is a QA engineer',
        },
        {
            title: 'Test Todo 2',
            description: ''
        },
        {
            title: 'Very Long Todo Title That Exceeds Normal Length',
            description: 'A very long description that might test the UI layout and see how it handles overflow text in the todo items'
        },
        {
            title: 'Special Characters: !@#$%^&*()',
            description: 'Testing with special characters and symbols'
        }
    ],

    // Todo update scenarios
    updateScenarios: [
        {
            original: {
                title: 'Original Todo',
                description: 'Original description'
            },
            updated: {
                title: 'Updated Todo',
                description: 'Updated description'
            }
        },
        {
            original: {
                title: 'Todo to Update',
                description: 'Original description'
            },
            updated: {
                title: 'Todo to Update',
                description: 'Only description updated'
            }
        }
    ],
} 