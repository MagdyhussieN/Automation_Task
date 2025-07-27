# Todo Manager - Cypress Automation Tests

Comprehensive end-to-end automation tests for the Todo Manager application using Cypress.

## 🎯 Test Coverage

### Login Module
- ✅ Valid credentials (success)
- ✅ Invalid credentials (failure, error message)
- ✅ Form validation
- ✅ User experience
- ✅ Security testing
- ✅ Accessibility testing
- ✅ Cross-browser compatibility

### Todo Management Module
- ✅ Create new todo (title + description)
- ✅ Edit existing todo
- ✅ Delete todo
- ✅ Toggle todo completion
- ✅ Bulk operations
- ✅ Error handling
- ✅ Performance testing
- ✅ Edge cases

## 📁 Project Structure

```
cypress-tests/
├── cypress/
│   ├── e2e/
│   │   ├── login/
│   │   │   ├── login.cy.js           # Login test cases
│   │   │   ├── loginPage.js          # Login page object
│   │   │   ├── loginData.js          # Login test data
│   │   ├── todo/
│   │   │   ├── Todo.cy.js            # Todo test cases
│   │   │   ├── todoPage.js           # Todo page object
│   │   │   ├── todoData.js           # Todo test data
│   ├── support/
│   │   ├── commands.js               # Custom Cypress commands
│   │   ├── e2e.js                    # Global configuration
├── cypress.config.js                 # Cypress configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Todo Manager application running on:
  - Frontend: `http://localhost:3000`
  - Backend: `http://localhost:5001`

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Open Cypress Test Runner:**
```bash
npm run cypress:open
```

3. **Run tests in headless mode:**
```bash
npm run cypress:run
```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run cypress:open` | Open Cypress Test Runner (GUI) |
| `npm run cypress:run` | Run all tests in headless mode |
| `npm run test:login` | Run only login tests |
| `npm run test:todo` | Run only todo tests |
| `npm run test:all` | Run all tests |
| `npm run test:headed` | Run tests with browser visible |
| `npm run test:chrome` | Run tests in Chrome browser |
| `npm run test:firefox` | Run tests in Firefox browser |

## 🧪 Test Modules

### Login Tests (`cypress/e2e/login/`)

#### Test Scenarios:
- **Valid Login**: Test successful login with correct credentials
- **Invalid Login**: Test login failures with wrong credentials
- **Form Validation**: Test required fields and validation
- **User Experience**: Test form behavior and feedback
- **Security**: Test password exposure and multiple attempts
- **Accessibility**: Test keyboard navigation and ARIA labels
- **Cross-browser**: Test different viewport sizes

#### Page Object: `loginPage.js`
- Locators for all login form elements
- Actions for typing, clicking, and form submission
- Validations for success/error states
- Helper methods for common operations

#### Test Data: `loginData.js`
- Valid user credentials
- Invalid credentials scenarios
- Error messages
- Success messages

### Todo Tests (`cypress/e2e/todo/`)

#### Test Scenarios:
- **Create Todo**: Test todo creation with various data
- **Edit Todo**: Test todo editing functionality
- **Delete Todo**: Test todo deletion
- **Toggle Completion**: Test completion status changes
- **Bulk Operations**: Test multiple todo operations
- **Error Handling**: Test server errors and edge cases
- **Performance**: Test with large datasets
- **User Experience**: Test UI behavior and feedback

#### Page Object: `todoPage.js`
- Locators for todo list and form elements
- Actions for CRUD operations
- Validations for todo states
- Bulk operation methods
- API interception helpers

#### Test Data: `todoData.js`
- Sample todos for testing
- Invalid todo data
- Update scenarios
- Edge cases
- Performance test data

## 🛠️ Custom Commands

The project includes custom Cypress commands for common operations:

### Authentication Commands
```javascript
cy.login(email, password)                    // Login with credentials
cy.loginAndWaitForDashboard()                // Login and wait for dashboard
cy.logout()                                  // Logout user
```

### Todo Commands
```javascript
cy.createTodo(title, description)            // Create a new todo
cy.editTodo(oldTitle, newTitle, description) // Edit existing todo
cy.deleteTodo(title)                         // Delete todo by title                        // Delete all todos
```

### API Commands
```javascript
// cy.waitForApiResponse(method, url, alias)    // Wait for API response
```

## 🔧 Configuration

### Cypress Configuration (`cypress.config.js`)
- **Base URL**: `http://localhost:3000`
- **Viewport**: 1280x720
- **Video Recording**: Enabled
- **Screenshots**: On failure
- **Timeouts**: 10 seconds
- **Environment Variables**: Backend URL

### Test Environment
- **Frontend**: React application on port 3000
- **Backend**: Node.js API on port 5001
- **Database**: JSON file storage

## 📊 Test Reports

### Video Recordings
- Automatically recorded for all test runs
- Stored in `cypress/videos/`
- Useful for debugging failed tests

### Screenshots
- Captured on test failures
- Stored in `cypress/screenshots/`
- Help identify UI issues

### Console Output
- Detailed logs for debugging
- API request/response logging
- Performance metrics

## 🎨 Page Object Model

The project uses the Page Object Model pattern for maintainable tests:

### Benefits:
- **Reusability**: Common actions are centralized
- **Maintainability**: Changes to UI only require updating page objects
- **Readability**: Tests are more descriptive and easier to understand
- **Modularity**: Each page has its own object with specific methods

### Structure:
```javascript
class LoginPage {
  elements = {
    // Locators
  }
  
  // Actions
  login(email, password) { }
  
  // Validations
  shouldBeLoggedIn() { }
}
```

## 🔍 Test Data Management

### Externalized Test Data
- Test data is separated from test logic
- Easy to modify test scenarios
- Supports data-driven testing
- Maintains test data consistency

### Data Categories:
- **Valid Data**: Successful test scenarios
- **Invalid Data**: Error test scenarios
- **Edge Cases**: Boundary conditions
- **Performance Data**: Large datasets

## 🚨 Error Handling

### Comprehensive Error Testing
- **Server Errors**: 500 status codes
- **Network Errors**: Connection failures
- **Validation Errors**: Form validation
- **Authentication Errors**: Invalid tokens

### Error Recovery
- Tests handle errors gracefully
- Proper cleanup after failures
- Meaningful error messages
- Debug information for failures

## 🔒 Security Testing

### Security Scenarios
- **Password Exposure**: Verify passwords aren't exposed in UI
- **Multiple Login Attempts**: Test rate limiting
- **XSS Prevention**: Test script injection attempts
- **SQL Injection**: Test malicious input handling

## ♿ Accessibility Testing

### Accessibility Features
- **Keyboard Navigation**: Tab order and Enter key support
- **ARIA Labels**: Proper accessibility attributes
- **Screen Reader Support**: Semantic HTML structure
- **Focus Management**: Proper focus indicators

## 📱 Cross-browser Testing

### Viewport Testing
- **Mobile**: 375x667 (iPhone)
- **Tablet**: 768x1024 (iPad)
- **Desktop**: 1280x720 (Standard)

### Browser Support
- **Chrome**: Primary testing browser
- **Firefox**: Secondary testing browser
- **Edge**: Windows compatibility

## 🚀 Performance Testing

### Performance Metrics
- **Page Load Time**: Dashboard loading performance
- **API Response Time**: Backend performance
- **UI Responsiveness**: User interaction performance
- **Memory Usage**: Long-running test performance

## 📝 Best Practices

### Test Organization
- **Modular Structure**: Separate concerns by functionality
- **Descriptive Names**: Clear test and method names
- **Data-Driven**: Use external test data
- **Page Objects**: Encapsulate UI interactions

### Code Quality
- **ES6+ Syntax**: Modern JavaScript features
- **Async/Await**: Proper async handling
- **Error Handling**: Comprehensive error scenarios
- **Documentation**: Clear code comments

### Maintenance
- **Regular Updates**: Keep dependencies current
- **Test Reviews**: Regular test code reviews
- **Performance Monitoring**: Track test execution time
- **Bug Tracking**: Link tests to bug reports

## 🐛 Troubleshooting

### Common Issues

#### Application Not Running
```bash
# Start the Todo Manager application first
cd ../frontend && npm run dev
cd ../backend && npm run dev
```

#### Port Conflicts
```bash
# Check if ports are in use
lsof -i :3000
lsof -i :5001
```

#### Test Failures
```bash
# Run with debug information
DEBUG=cypress:* npm run cypress:run

# Check video recordings
open cypress/videos/
```

#### Network Issues
```bash
# Verify backend is accessible
curl http://localhost:5001/health

# Check CORS configuration
```

### Debug Tips
- Use `cy.pause()` to pause test execution
- Check browser console for errors
- Review video recordings for visual issues
- Use `cy.log()` for custom debugging output

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