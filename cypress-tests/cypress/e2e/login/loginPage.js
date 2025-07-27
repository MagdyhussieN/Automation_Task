// Login Page Object Model
export class LoginPage {
    // Locators
    elements = {
        // Form elements
        emailInput: () => cy.get('#email'),
        passwordInput: () => cy.get('#password'),
        loginButton: () => cy.get('button[type="submit"]'),

        // Error messages
        errorMessage: () => cy.get('[data-testid="error-message"]'),

        // Page elements
        loginForm: () => cy.get('[data-testid="login-form"]'),
        pageTitle: () => cy.get('h2'),
        demoCredentials: () => cy.get('[data-testid="demo-credentials"]'),
    }

    // Actions
    visit() {
        cy.visit('/login')
        return this
    }

    typeEmail(email) {
        this.elements.emailInput().clear().type(email)
        return this
    }

    typePassword(password) {
        this.elements.passwordInput().clear().type(password)
        return this
    }

    clickLogin() {
        this.elements.loginButton().click()
        return this
    }

    login(email, password) {
        this.typeEmail(email)
        this.typePassword(password)
        this.clickLogin()
        return this
    }

    // Validations
    shouldBeOnLoginPage() {
        cy.url().should('include', '/login')
        this.elements.loginForm().should('be.visible')
        this.elements.pageTitle().should('contain', 'Sign in to your account')
        return this
    }


    shouldNotShowError() {
        this.elements.errorMessage().should('not.exist')
        return this
    }

    shouldBeLoggedIn() {
        cy.url().should('not.include', '/login')
        cy.url().should('include', '/')
        return this
    }

    shouldShowDemoCredentials() {
        this.elements.demoCredentials().should('be.visible')
        this.elements.demoCredentials().should('contain', 'user@example.com')
        this.elements.demoCredentials().should('contain', 'password')
        return this
    }

    // Form validation
    shouldRequireEmail() {
        this.elements.emailInput().should('have.attr', 'required')
        return this
    }

    shouldRequirePassword() {
        this.elements.passwordInput().should('have.attr', 'required')
        return this
    }

    shouldHaveEmailType() {
        this.elements.emailInput().should('have.attr', 'type', 'email')
        return this
    }

    shouldHavePasswordType() {
        this.elements.passwordInput().should('have.attr', 'type', 'password')
        return this
    }

    shouldHaveEnabledLoginButton() {
        this.elements.loginButton().should('not.be.disabled')
        return this
    }

    // Accessibility
    shouldHaveProperLabels() {
        this.elements.emailInput().should('have.attr', 'placeholder', 'Email address')
        this.elements.passwordInput().should('have.attr', 'placeholder', 'Password')
        return this
    }

    // Helper methods

    submitForm() {
        this.elements.loginForm().submit()
        return this
    }

    // API interception for testing
    interceptLoginRequest() {
        cy.intercept('POST', '**/login').as('loginRequest')
        return this
    }

    waitForLoginRequest() {
        cy.wait('@loginRequest')
        return this
    }
} 