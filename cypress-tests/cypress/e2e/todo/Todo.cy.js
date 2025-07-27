import { TodoPage } from './todoPage.js'
import { todoData } from './todoData.js'

describe('Todo Management', () => {
    const todoPage = new TodoPage()

    beforeEach(() => {
        todoPage.loginAndVisit()
    })

    describe('Dashboard Load', () => {
        it('should load dashboard correctly', () => {
            todoPage
                .shouldBeOnDashboard()
        })

        it('should show user welcome message', () => {
            todoPage.elements.userWelcome().should('contain', 'Demo User')
        })

        it('should have proper navigation elements', () => {
            todoPage.elements.addTodoButton().should('be.visible')
            todoPage.elements.logoutButton().should('be.visible')
        })
    })

    describe('Create Todo', () => {
        it('should create a new todo with title and description', () => {
            const todo = todoData.newTodos[0]

            todoPage
                .interceptTodoRequests()
                .createTodo(todo.title, todo.description)
                .waitForCreateTodo()
                .shouldShowTodo(todo.title)
                .shouldShowTodoDescription(todo.title, todo.description)
        })

        it('should create a todo with only title', () => {
            const todo = todoData.newTodos[1]

            todoPage
                .createTodo(todo.title)
                .shouldShowTodo(todo.title)
        })

        it('should cancel todo creation', () => {
            const todo = todoData.newTodos[1]
            todoPage
                .createTodo(todo.title, todo.description)
                .cancelTodo()
        })
    })

    describe('Edit Todo', () => {
        beforeEach(() => {
            todoPage.createTodo('Original Todo', 'Original description')
        })

        it('should edit todo title and description', () => {
            const scenario = todoData.updateScenarios[0]

            todoPage
                .interceptTodoRequests()
                .editTodo(scenario.original.title, scenario.updated.title, scenario.updated.description)
                .waitForUpdateTodo()
                .shouldShowTodo(scenario.updated.title)
                .shouldShowTodoDescription(scenario.updated.title, scenario.updated.description)
        })

        it('should cancel edit operation', () => {
            todoPage
                .clickEditTodo('Original Todo')
                .editTodoTitle('This should be cancelled')
                .editTodoDescription('This should also be cancelled')
                .cancelEdit()
                .shouldShowTodo('Original Todo')
                .shouldShowTodoDescription('Original Todo', 'Original description')
        })
    })

    describe('Delete Todo', () => {
        beforeEach(() => {
            todoPage.createTodo('Todo to Delete', 'This will be deleted')
        })

        it('should delete existing todo', () => {
            todoPage
                .interceptTodoRequests()
                .deleteTodo('Todo to Delete')
                .waitForDeleteTodo()
                .shouldNotShowTodo('Todo to Delete')
                .shouldNotShowError()
        })
    })

})