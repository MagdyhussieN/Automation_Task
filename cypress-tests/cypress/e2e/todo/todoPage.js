// Todo Page Object Model
export class TodoPage {
    // Locators
    elements = {
        // Dashboard elements
        dashboardHeader: () => cy.get('[data-testid="dashboard-header"]'),
        logoutButton: () => cy.get('[data-testid="logout-button"]'),
        userWelcome: () => cy.get('[data-testid="user-welcome"]'),

        // Todo list elements
        todoList: () => cy.get('[data-testid="todo-list"]'),
        todoItems: () => cy.get('[data-testid="todo-item"]'),
        emptyTodoMessage: () => cy.get('[data-testid="empty-todo-message"]'),

        // Add todo elements
        addTodoButton: () => cy.get('[data-testid="add-todo-button"]'),
        todoForm: () => cy.get('[data-testid="todo-form"]'),
        todoTitleInput: () => cy.get('[data-testid="todo-title-input"]'),
        todoDescriptionInput: () => cy.get('[data-testid="todo-description-input"]'),
        addTodoSubmit: () => cy.get('[data-testid="add-todo-submit"]'),
        cancelTodoButton: () => cy.get('[data-testid="cancel-todo-button"]'),

        // Individual todo elements (dynamic)
        todoItem: (title) => cy.get('[data-testid="todo-list"]').contains(title).parent(),
        todoDescription: () => cy.get('[data-testid="todo-description"]'),
        deleteTodoButton: (title) => this.todoItem(title).find('[data-testid="delete-todo-button"]'),

        // Edit todo elements
        editTodoTitleInput: () => cy.get('[data-testid="edit-todo-title-input"]'),
        editTodoDescriptionInput: () => cy.get('[data-testid="edit-todo-description-input"]'),
        saveTodoButton: () => cy.get('[data-testid="save-todo-button"]'),
        cancelEditButton: () => cy.get('[data-testid="cancel-edit-button"]'),

        // Error messages
        errorMessage: () => cy.get('[data-testid="error-message"]'),
        successMessage: () => cy.get('[data-testid="success-message"]'),
    }

    // Actions
    visit() {
        cy.visit('/')
        return this
    }

    loginAndVisit() {
        cy.loginAndWaitForDashboard()
        return this
    }

    // Todo creation actions
    clickAddTodo() {
        this.elements.addTodoButton().click()
        cy.wait(2000)
        return this
    }

    typeTodoTitle(title) {
        this.elements.todoTitleInput().clear().type(title)
        return this
    }

    typeTodoDescription(description) {
        this.elements.todoDescriptionInput().clear().type(description)
    }

    submitTodo() {
        this.elements.addTodoSubmit().click()
        return this
    }

    cancelTodo() {
        this.elements.cancelTodoButton().click()
    }

    createTodo(title, description = '') {
        this.clickAddTodo()
        this.typeTodoTitle(title)
        if (description) {
            this.typeTodoDescription(description)
        }
        this.submitTodo()
        return this
    }

    // Todo editing actions
    clickEditTodo(title) {
        this.clickEditButtonByTitle(title)
        return this
    }

    editTodoTitle(newTitle) {
        this.elements.editTodoTitleInput().clear().type(newTitle)
        return this
    }

    editTodoDescription(newDescription) {
        this.elements.editTodoDescriptionInput().clear().type(newDescription)
        return this
    }

    saveTodo() {
        this.elements.saveTodoButton().click()
        return this
    }

    cancelEdit() {
        this.elements.cancelEditButton().click()
        return this
    }

    editTodo(oldTitle, newTitle, newDescription = '') {
        this.clickEditButtonByTitle(oldTitle)
        this.editTodoTitle(newTitle)
        if (newDescription !== undefined) {
            this.editTodoDescription(newDescription)
        }
        this.saveTodo()
        return this
    }

    clickEditButtonByTitle(title) {
        cy.contains('[data-testid="todo-title"]', title)
            .parents('div.flex.items-center.justify-between')
            .find('[data-testid="edit-todo-button"]')
            .click()
    }

    clickDeleteButtonByTitle(title) {
        cy.contains('[data-testid="todo-title"]', title)
          .parents('div.flex.items-center.justify-between')
          .find('[data-testid="delete-todo-button"]')
          .click()
    }

    deleteTodo(title) {
        this.clickDeleteButtonByTitle(title)
        return this
    }

    // Navigation actions
    logout() {
        this.elements.logoutButton().click()
        return this
    }

    // Validations
    shouldBeOnDashboard() {
        cy.url().should('include', '/')
        this.elements.dashboardHeader().should('be.visible')
        return this
    }

    shouldShowTodo(title) {
        this.elements.todoList().should('contain', title)
        return this
    }

    shouldNotShowTodo(title) {
        this.elements.todoList().should('not.contain', title)
        return this
    }

    shouldNotShowError() {
        this.elements.errorMessage().should('not.exist')
        return this
    }

    shouldShowTodoDescription(title, description) {
        try {
            this.elements.todoDescription().each(($el) => {
                if ($el.text().includes(description)) {
                    return true
                }
            })
            return false
        } catch (error) {
            return false
        }
    }

    shouldHaveDisabledSubmitButton() {
        this.elements.addTodoSubmit().should('be.disabled')
        return this
    }

    // API interception for testing
    interceptTodoRequests() {
        cy.intercept('GET', '**/todos').as('getTodos')
        cy.intercept('POST', '**/todos').as('createTodo')
        cy.intercept('PUT', '**/todos/*').as('updateTodo')
        cy.intercept('DELETE', '**/todos/*').as('deleteTodo')
        return this
    }

    waitForGetTodos() {
        cy.wait('@getTodos')
        return this
    }

    waitForCreateTodo() {
        cy.wait('@createTodo')
        return this
    }

    waitForUpdateTodo() {
        cy.wait('@updateTodo')
        return this
    }

    waitForDeleteTodo() {
        cy.wait('@deleteTodo')
        return this
    }
} 