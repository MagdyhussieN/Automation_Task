// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to login with valid credentials
Cypress.Commands.add('login', (email = 'user@example.com', password = 'Mm12345!') => {
    cy.visit('/login')
    cy.get('[data-testid="email-input"]').type(email)
    cy.get('[data-testid="password-input"]').type(password)
    cy.get('[data-testid="login-button"]').click()

    // Wait for successful login and redirect
    cy.url().should('not.include', '/login')
    cy.url().should('include', '/')
})

// Custom command to login and wait for dashboard
Cypress.Commands.add('loginAndWaitForDashboard', (email = 'user@example.com', password = 'Mm12345!') => {
    cy.login(email, password)
    cy.get('[data-testid="dashboard-header"]').should('be.visible')
    cy.get('[data-testid="user-welcome"]').should('be.visible')
    cy.get('[data-testid="logout-button"]').should('be.visible')
    cy.get('[data-testid="add-todo-button"]').should('be.visible')
})

// Custom command to create a todo
Cypress.Commands.add('createTodo', (title, description = '') => {
    cy.get('[data-testid="add-todo-button"]').click()
    cy.get('[data-testid="todo-title-input"]').type(title)
    if (description) {
        cy.get('[data-testid="todo-description-input"]').type(description)
    }
    cy.get('[data-testid="add-todo-submit"]').click()

    // Wait for todo to be created
    cy.get('[data-testid="todo-list"]').should('contain', title)
})

// Custom command to delete a todo by title
Cypress.Commands.add('deleteTodo', (title) => {
    cy.get('[data-testid="todo-list"]')
        .contains(title)
        .parent()
        .find('[data-testid="delete-todo-button"]')
        .click()

    // Wait for todo to be removed
    cy.get('[data-testid="todo-list"]').should('not.contain', title)
})

// Custom command to edit a todo
Cypress.Commands.add('editTodo', (oldTitle, newTitle, newDescription = '') => {
    cy.get('[data-testid="todo-list"]')
        .contains(oldTitle)
        .parent()
        .find('[data-testid="edit-todo-button"]')
        .click()

    cy.get('[data-testid="edit-todo-title-input"]').clear().type(newTitle)
    if (newDescription !== undefined) {
        cy.get('[data-testid="edit-todo-description-input"]').clear().type(newDescription)
    }
    cy.get('[data-testid="save-todo-button"]').click()

    // Wait for todo to be updated
    cy.get('[data-testid="todo-list"]').should('contain', newTitle)
})

// Custom command to logout
Cypress.Commands.add('logout', () => {
    cy.get('[data-testid="logout-button"]').click()
    cy.url().should('include', '/login')
})

// Override visit command to handle authentication
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
    // If visiting a protected route, ensure we're logged in
    if (url === '/' || url.includes('/dashboard')) {
        cy.getCookie('token').then((cookie) => {
            if (!cookie) {
                cy.login()
            }
        })
    }

    return originalFn(url, options)
}) 