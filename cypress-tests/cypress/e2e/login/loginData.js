// Test data for login functionality
export const loginData = {
    // Valid credentials
    validUser: {
        email: 'user@example.com',
        password: 'Mm12345!',
        name: 'Demo User'
    },

    // Invalid credentials
    invalidCredentials: [
        {
            email: 'wrong@example.com',
            password: 'Mm12345!',
            description: 'Invalid email'
        }
    ],

    // Empty fields
    emptyFields: [
        {
            email: '',
            password: 'Mm12345!',
            description: 'Empty email'
        },
        {
            email: 'user@example.com',
            password: '',
            description: 'Empty password'
        },
        {
            email: '',
            password: '',
            description: 'Both fields empty'
        }
    ],

} 