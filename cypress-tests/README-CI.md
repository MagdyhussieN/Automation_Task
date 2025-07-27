# CI/CD Pipeline Documentation

## Overview

This project includes a comprehensive CI/CD pipeline that runs both Cypress UI tests and Postman API tests using GitHub Actions.

## 🏗️ Pipeline Structure

```
.github/
└── workflows/
    └── test-ci.yml          # Main CI workflow
cypress-tests/
├── postman/
│   ├── qa-collection.json   # Postman API test collection
│   └── qa-environment.json  # Postman environment variables
├── newman-config.json       # Newman configuration
├── run-ci-local.sh          # Local CI testing script
└── README-CI.md            # This file
```

## 🚀 GitHub Actions Workflow

### Triggers
- **Push** to `main` or `develop` branches
- **Pull Request** to `main` or `develop` branches

### Matrix Strategy
- Runs on **Node.js 18.x** and **20.x**
- Ensures compatibility across Node versions

### Steps
1. **Setup**: Checkout code and setup Node.js
2. **Install**: Install dependencies for all projects
3. **Setup Newman**: Install Postman Newman CLI
4. **Create Test Files**: Generate Postman collection and environment
5. **Start Servers**: Start backend and frontend concurrently
6. **Wait for Ready**: Ensure servers are accessible
7. **Run Tests**: Execute Cypress and Newman tests
8. **Upload Artifacts**: Save screenshots, videos, and test results
9. **Cleanup**: Stop servers and cleanup processes

## 🧪 Test Coverage

### Cypress UI Tests
- **Login Module**: Authentication, validation, error handling
- **Todo Management**: CRUD operations, bulk actions, edge cases
- **Cross-browser**: Chrome, Firefox, Edge compatibility
- **Accessibility**: Keyboard navigation, ARIA labels
- **Performance**: Large dataset handling

### Postman API Tests
- **Health Check**: Server availability
- **Authentication**: Valid/invalid login scenarios
- **Todo CRUD**: Create, Read, Update, Delete operations
- **Error Handling**: Invalid requests, missing data
- **Authorization**: Token validation, protected routes

## 📊 Test Reports

### Artifacts Generated
- **Cypress Screenshots**: On test failures
- **Cypress Videos**: All test executions
- **API Test Results**: JUnit XML format
- **HTML Reports**: Newman HTML reports

### Retention
- **Screenshots**: 30 days (on failure only)
- **Videos**: 30 days (always)
- **API Results**: 30 days (always)

## 🛠️ Local Testing

### Prerequisites
```bash
# Install Newman globally
npm install -g newman

# Ensure all dependencies are installed
cd cypress-tests && npm install
cd ../frontend && npm install
cd ../backend && npm install
```

### Run Local CI
```bash
# Make script executable
chmod +x cypress-tests/run-ci-local.sh

# Run local CI pipeline
./cypress-tests/run-ci-local.sh
```

### Manual Testing
```bash
# Start servers manually
cd backend && npm run dev &
cd frontend && npm run dev &

# Run Cypress tests
cd cypress-tests
npm run cypress:open    # GUI mode
npm run cypress:run     # Headless mode

# Run API tests
newman run postman/qa-collection.json -e postman/qa-environment.json
```

## 📁 File Structure

### Postman Collection (`qa-collection.json`)
```json
{
  "info": { "name": "Todo Manager API Tests" },
  "item": [
    {
      "name": "Authentication",
      "item": [
        "Login - Valid Credentials",
        "Login - Invalid Email",
        "Login - Invalid Password",
        "Login - Missing Fields"
      ]
    },
    {
      "name": "Todo Management",
      "item": [
        "Get Todos - Unauthorized",
        "Get Todos - Authorized",
        "Create Todo - Valid Data",
        "Update Todo - Valid Data",
        "Delete Todo - Valid ID"
      ]
    }
  ]
}
```

### Environment Variables (`qa-environment.json`)
```json
{
  "values": [
    { "key": "baseUrl", "value": "http://localhost:5001" },
    { "key": "authToken", "value": "" },
    { "key": "todoId", "value": "" }
  ]
}
```

## 🔧 Configuration

### Newman Configuration (`newman-config.json`)
```json
{
  "reporters": ["cli", "junit", "html"],
  "bail": { "enabled": true, "threshold": 1 },
  "timeout": { "request": 10000, "response": 10000 }
}
```

### Cypress Configuration
- **Base URL**: `http://localhost:3000`
- **Backend URL**: `http://localhost:5001`
- **Browser**: Chrome (headless)
- **Video Recording**: Enabled
- **Screenshots**: On failure

## 🚨 Troubleshooting

### Common Issues

#### Port Conflicts
```bash
# Check if ports are in use
lsof -i :3000
lsof -i :5001

# Kill processes if needed
pkill -f "node.*server.js"
pkill -f "vite"
```

#### Newman Installation
```bash
# Install Newman globally
npm install -g newman

# Verify installation
newman --version
```

#### Test Failures
```bash
# Check server logs
tail -f backend/logs/app.log

# Run tests with debug
DEBUG=cypress:* npm run cypress:run
```

### Debug Commands
```bash
# Test backend health
curl http://localhost:5001/health

# Test frontend
curl http://localhost:3000

# Run specific test suites
npm run test:login
npm run test:todo
```

## 📈 Performance

### Optimization Tips
1. **Parallel Execution**: Tests run in parallel where possible
2. **Caching**: npm dependencies are cached
3. **Artifact Management**: Only upload necessary files
4. **Timeout Management**: Proper timeouts for network requests

### Monitoring
- **Test Duration**: Track execution times
- **Success Rate**: Monitor pass/fail ratios
- **Resource Usage**: CPU and memory consumption
- **Network Latency**: API response times

## 🔒 Security

### Best Practices
- **Secrets Management**: Use GitHub Secrets for sensitive data
- **Token Handling**: Secure token storage and rotation
- **Input Validation**: Test malicious input scenarios
- **Access Control**: Verify authorization requirements

### Security Tests
- **XSS Prevention**: Test script injection attempts
- **SQL Injection**: Test malicious database queries
- **Authentication**: Verify token validation
- **Authorization**: Test protected route access

## 📝 Best Practices

### Code Quality
- **Consistent Naming**: Use descriptive test names
- **Modular Structure**: Separate concerns by functionality
- **Error Handling**: Comprehensive error scenarios
- **Documentation**: Clear test descriptions

### Maintenance
- **Regular Updates**: Keep dependencies current
- **Test Reviews**: Regular test code reviews
- **Performance Monitoring**: Track execution metrics
- **Bug Tracking**: Link tests to issues

## 🤝 Contributing

### Adding New Tests
1. **Cypress Tests**: Add to appropriate module in `cypress/e2e/`
2. **API Tests**: Add to Postman collection
3. **Update Documentation**: Modify this README
4. **Test Locally**: Run local CI before pushing

### Guidelines
- Follow existing naming conventions
- Include both positive and negative scenarios
- Add proper error handling
- Document complex test scenarios
- Ensure tests are deterministic

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review test documentation
3. Check GitHub Actions logs
4. Create an issue with detailed information 