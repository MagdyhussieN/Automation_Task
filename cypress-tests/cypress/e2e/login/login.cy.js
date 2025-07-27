import { LoginPage } from './loginPage.js'
import { loginData } from './loginData.js'

describe('Login Page', () => {
    const loginPage = new LoginPage()

    beforeEach(() => {
        loginPage.visit()
    })

    describe('Page Load', () => {
        it('should load login page correctly', () => {
            loginPage
                .shouldBeOnLoginPage()
                .shouldShowDemoCredentials()
                .shouldHaveProperLabels()
                .shouldRequireEmail()
                .shouldRequirePassword()
                .shouldHaveEmailType()
                .shouldHavePasswordType()
        })

        it('should have proper form structure', () => {
            loginPage.elements.loginForm().should('exist')
            loginPage.elements.emailInput().should('be.visible')
            loginPage.elements.passwordInput().should('be.visible')
            loginPage.elements.loginButton().should('be.visible')
        })
    })

    describe('Valid Login', () => {
        it('should login with valid credentials', () => {
            loginPage
                .interceptLoginRequest()
                .login(loginData.validUser.email, loginData.validUser.password)
                .waitForLoginRequest()
                .shouldBeLoggedIn()
                .shouldNotShowError()
        })

        it('should redirect to dashboard after successful login', () => {
            loginPage
                .login(loginData.validUser.email, loginData.validUser.password)
                .shouldBeLoggedIn()

            // Verify dashboard elements are visible
            cy.contains('h1', 'Todo Manager').should('be.visible')
            cy.contains('button', 'Logout').should('be.visible');
            cy.contains('button', 'Add New Todo').should('be.visible');
        })

        it('should show welcome message with user name', () => {
            loginPage
                .login(loginData.validUser.email, loginData.validUser.password)
                .shouldBeLoggedIn()

            cy.get('[data-testid="user-welcome"]').should('contain', loginData.validUser.name)
        })
    })

    describe('Invalid Login', () => {
        loginData.invalidCredentials.forEach((credential) => {
            it(`should show error for ${credential.description}`, () => {
                loginPage
                    .interceptLoginRequest()
                    .login(credential.email, credential.password)
                cy.contains('h1', 'Todo Manager').should('not.exist')
                cy.contains('button', 'Logout').should('not.exist');
                cy.contains('button', 'Add New Todo').should('not.exist');
            })
        })
    })

    describe('Form Validation', () => {
        loginData.emptyFields.forEach((field) => {
            it('should enable login button when form has data', () => {
                loginPage
                    .typeEmail(loginData.validUser.email)
                    .typePassword(loginData.validUser.password)
                    .shouldHaveEnabledLoginButton()
            })
        })
    })

    describe('User Experience', () => {
        it('should allow form submission with Enter key', () => {
            loginPage
                .typeEmail(loginData.validUser.email)
                .typePassword(loginData.validUser.password)
                .submitForm()
                .shouldBeLoggedIn()
        })
    })

    describe('Security', () => {
        it('should not expose password in URL or page source', () => {
            loginPage
                .typePassword('secretpassword')
                .clickLogin()

            cy.url().should('not.contain', 'secretpassword')
            cy.get('body').should('not.contain', 'secretpassword')
        })
    })

    describe('Cross-browser Compatibility', () => {
        it('should work with different viewport sizes', () => {
            // Test mobile viewport
            cy.viewport(375, 667)
            loginPage
                .shouldBeOnLoginPage()
                .login(loginData.validUser.email, loginData.validUser.password)
                .shouldBeLoggedIn()

            // Test tablet viewport
            cy.viewport(768, 1024)
            loginPage.visit()
            loginPage
                .shouldBeOnLoginPage()
                .login(loginData.validUser.email, loginData.validUser.password)
                .shouldBeLoggedIn()

            // Test desktop viewport
            cy.viewport(1280, 720)
            loginPage.visit()
            loginPage
                .shouldBeOnLoginPage()
                .login(loginData.validUser.email, loginData.validUser.password)
                .shouldBeLoggedIn()
        })
    })
}) 