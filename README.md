# Todo Manager - Full Stack Application with Comprehensive Automation Testing

A complete full-stack Todo Manager application with extensive end-to-end automation testing using Cypress, featuring **GitHub Actions CI/CD pipeline** as a bonus implementation.

## 🎯 Project Overview

This project demonstrates a modern full-stack application with comprehensive automation testing coverage, including:
- **React Frontend** with modern UI/UX
- **Node.js Backend** with RESTful API
- **Cypress E2E Testing** with 100% test coverage
- **GitHub Actions CI/CD** pipeline with automated testing
- **Postman API Testing** integration
- **Cross-browser compatibility** testing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### One-Command Setup
```bash
# Clone and setup everything
git clone <repository-url>
cd todo-manager
npm run install-all
npm run dev
```

### Manual Setup

1. **Install all dependencies:**
```bash
npm run install-all
```

2. **Start the complete application:**
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5001`
- Frontend application on `http://localhost:3000`

## 🧪 Automation Testing (Primary Focus)

### Test Coverage Overview

| Module | Test Scenarios | Coverage |
|--------|---------------|----------|
| **Login** | 7 scenarios | 100% |
| **Todo Management** | 8 scenarios | 100% |
| **API Integration** | 4 scenarios | 100% |

### Running Tests

#### Cypress E2E Tests
```bash
# Open Cypress Test Runner (GUI)
npm run cypress:open

# Run all tests in headless mode
npm run cypress:run

# Run specific test modules
npm run test:login
npm run test:todo
npm run test:all

# Cross-browser testing
npm run test:chrome
npm run test:firefox
npm run test:headed
```

#### API Testing with Postman
```bash
# Run API tests
cd cypress-tests
newman run postman/qa-collection.json
```

### Test Structure

```
cypress-tests/
├── cypress/
│   ├── e2e/
│   │   ├── login/
│   │   │   ├── login.cy.js           # Login test scenarios
│   │   │   ├── loginPage.js          # Page Object Model
│   │   │   └── loginData.js          # Test data
│   │   └── todo/
│   │       ├── Todo.cy.js            # Todo test scenarios
│   │       ├── todoPage.js           # Page Object Model
│   │       └── todoData.js           # Test data
│   ├── support/
│   │   ├── commands.js               # Custom Cypress commands
│   │   └── e2e.js                    # Global configuration
├── postman/
│   └── qa-collection.json            # API test collection
└── cypress.config.js                 # Cypress configuration
```

### Test Scenarios

#### Login Module
- ✅ Valid credentials (success flow)
- ✅ Invalid credentials (error handling)
- ✅ Form validation (required fields)
- ✅ User experience (loading states)
- ✅ Security testing (password exposure)
- ✅ Accessibility testing (ARIA labels)
- ✅ Cross-browser compatibility

#### Todo Management Module
- ✅ Create new todo (title + description)
- ✅ Edit existing todo
- ✅ Delete todo

### Custom Cypress Commands

```javascript
// Authentication
cy.login(email, password)                    // Login with credentials
cy.loginAndWaitForDashboard()                // Login and wait for dashboard
cy.logout()                                  // Logout user

// Todo Operations
cy.createTodo(title, description)            // Create a new todo
cy.editTodo(oldTitle, newTitle, description) // Edit existing todo
cy.deleteTodo(title)                         // Delete todo by title
cy.deleteAllTodos()                          // Delete all todos

// API Testing
cy.waitForApiResponse(method, url, alias)    // Wait for API response
```

## 🔄 GitHub Actions CI/CD Pipeline (Bonus Feature)

### Automated Testing Pipeline

The project includes a comprehensive GitHub Actions workflow that runs on every push and pull request:

#### Pipeline Features:
- **Multi-environment testing** (Ubuntu latest)
- **Node.js version matrix** (18.x)
- **Dependency caching** for faster builds
- **Parallel service startup** (Backend + Frontend)
- **Health check verification** before testing
- **Cypress E2E testing** in headless mode
- **Postman API testing** integration
- **Artifact uploads** (screenshots, videos, reports)
- **Automatic cleanup** and process management

#### Workflow Triggers:
```yaml
on:
  push:
    branches: [ master, develop ]
  pull_request:
    branches: [ master, develop ]
```

#### Pipeline Steps:
1. **Code Checkout** with full history
2. **Node.js Setup** with dependency caching
3. **Dependency Installation** for all modules
4. **Service Startup** (Backend + Frontend)
5. **Health Checks** with timeout handling
6. **API Testing** with Postman/Newman
7. **E2E Testing** with Cypress
8. **Artifact Collection** (screenshots, videos, reports)
9. **Cleanup** and process termination

#### Artifacts Generated:
- **Cypress Screenshots** (on failure)
- **Cypress Videos** (always)
- **Test Reports** (HTML format)
- **API Test Results** (JSON format)

### CI/CD Benefits:
- **Automated Quality Gates** - No code merges without passing tests
- **Early Bug Detection** - Issues caught before production
- **Consistent Testing Environment** - Same conditions every time
- **Detailed Reporting** - Visual evidence of test execution
- **Cross-browser Validation** - Multiple browser testing
- **Performance Monitoring** - Test execution time tracking

## 🏗️ Full-Stack Application Architecture

### Tech Stack

#### Backend
- **Node.js** with Express.js
- **JWT Authentication** for secure access
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests
- **JSON file storage** (easily replaceable with MongoDB)

#### Frontend
- **React 18** with modern hooks
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API communication
- **Tailwind CSS** for styling
- **Context API** for state management

### Project Structure

```
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── contexts/         # React contexts
│   │   ├── services/         # API services
│   │   └── main.jsx          # Application entry
│   └── package.json
├── backend/                  # Node.js API
│   ├── data/                 # JSON data files
│   ├── services/             # Data services
│   ├── scripts/              # Utility scripts
│   └── server.js             # Express server
├── cypress-tests/            # Automation testing
│   ├── cypress/              # Cypress test files
│   ├── postman/              # API test collections
│   └── package.json
├── .github/workflows/        # CI/CD pipeline
│   └── main.yml              # GitHub Actions workflow
└── package.json              # Root package.json
```

## 📊 Test Reports and Artifacts

### Cypress Reports
- **Video Recordings**: Stored in `cypress/videos/`
- **Screenshots**: Captured on failures in `cypress/screenshots/`
- **Console Output**: Detailed logs for debugging
- **Performance Metrics**: Test execution time tracking

### GitHub Actions Artifacts
- **Test Videos**: Available for download from Actions tab
- **Failure Screenshots**: Visual evidence of test failures
- **API Test Results**: Newman/Postman test outputs
- **HTML Reports**: Formatted test execution reports

## 🎨 Page Object Model

The automation framework uses the Page Object Model pattern:

### Benefits:
- **Reusability**: Common actions centralized
- **Maintainability**: UI changes only require page object updates
- **Readability**: Tests are descriptive and self-documenting
- **Modularity**: Each page has specific methods and locators

### Example Structure:
```javascript
class LoginPage {
  elements = {
    emailInput: '[data-testid="email-input"]',
    passwordInput: '[data-testid="password-input"]',
    loginButton: '[data-testid="login-button"]'
  }
  
  login(email, password) {
    cy.get(this.elements.emailInput).type(email)
    cy.get(this.elements.passwordInput).type(password)
    cy.get(this.elements.loginButton).click()
  }
}
```

## 🔧 Configuration

### Cypress Configuration
- **Base URL**: `http://localhost:3000`
- **Viewport**: 1280x720 (responsive testing)
- **Video Recording**: Enabled for all tests
- **Screenshots**: Captured on failures
- **Timeouts**: 10 seconds for operations
- **Environment Variables**: Backend URL configuration

### Test Environment
- **Frontend**: React application on port 3000
- **Backend**: Node.js API on port 5001
- **Database**: JSON file storage with persistence

## 🚨 Error Handling and Debugging

### Comprehensive Error Testing
- **Server Errors**: 500 status codes
- **Network Errors**: Connection failures
- **Validation Errors**: Form validation
- **Authentication Errors**: Invalid tokens

### Debug Features
- **Video Recordings**: Visual test execution
- **Screenshots**: Failure state capture
- **Console Logs**: Detailed debugging information
- **Custom Commands**: Reusable debugging helpers

## 📱 Cross-Browser Testing

### Supported Browsers
- **Chrome**: Primary testing browser
- **Firefox**: Secondary testing browser
- **Edge**: Windows compatibility

### Viewport Testing
- **Mobile**: 375x667 (iPhone)
- **Tablet**: 768x1024 (iPad)
- **Desktop**: 1280x720 (Standard)

## 🚀 Performance Testing

### Performance Metrics
- **Page Load Time**: Dashboard loading performance
- **API Response Time**: Backend performance
- **UI Responsiveness**: User interaction performance
- **Memory Usage**: Long-running test performance

## 📝 Best Practices Implemented

### Test Organization
- **Modular Structure**: Separate concerns by functionality
- **Descriptive Names**: Clear test and method names
- **Data-Driven**: External test data management
- **Page Objects**: Encapsulated UI interactions

### Code Quality
- **ES6+ Syntax**: Modern JavaScript features
- **Async/Await**: Proper async handling
- **Error Handling**: Comprehensive error scenarios
- **Documentation**: Clear code comments

### CI/CD Best Practices
- **Automated Testing**: No manual intervention required
- **Artifact Management**: Proper storage and retention
- **Process Cleanup**: Automatic resource management
- **Health Checks**: Service readiness verification

## 🐛 Troubleshooting

### Common Issues

#### Application Not Running
```bash
# Check if ports are in use
lsof -i :3000
lsof -i :5001

# Start services manually
npm run backend
npm run frontend
```

#### Test Failures
```bash
# Run with debug information
DEBUG=cypress:* npm run cypress:run

# Check video recordings
open cypress-tests/cypress/videos/
```

#### CI/CD Issues
```bash
# Check GitHub Actions logs
# Verify service health endpoints
curl http://localhost:5001/health
curl http://localhost:3000
```

## 🤝 Contributing

### Adding New Tests
1. Create test file in appropriate module
2. Add page object methods if needed
3. Update test data files
4. Add custom commands if required
5. Update documentation

### Test Guidelines
- Follow existing naming conventions
- Use page object model
- Include both positive and negative scenarios
- Add proper error handling
- Document complex test scenarios

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review test documentation
3. Check application logs
4. Create an issue with detailed information

---

**🎉 Bonus Feature**: This project includes a complete GitHub Actions CI/CD pipeline that automatically runs comprehensive tests on every code change, ensuring code quality and preventing regressions in production. 