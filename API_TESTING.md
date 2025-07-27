# API Testing Guide - Todo Manager

This guide provides cURL commands and Postman collection for testing all API endpoints in the Todo Manager application.

## Base URL
```
http://localhost:5001
```

## Authentication

### 1. Login
**Endpoint:** `POST /login`

**cURL:**
```bash
curl -X POST http://localhost:5001/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Mm12345!"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Demo User"
  }
}
```

**Postman:**
- Method: `POST`
- URL: `http://localhost:5001/login`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "email": "user@example.com",
  "password": "Mm12345!"
}
```

## Todo Management (Protected Routes)

**Note:** All todo endpoints require authentication. Add the JWT token to the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### 2. Get All Todos
**Endpoint:** `GET /todos`

**cURL:**
```bash
curl -X GET http://localhost:5001/todos \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Learn React",
    "description": "Study React fundamentals and hooks",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Build Todo App",
    "description": "Create a full-stack todo application",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Postman:**
- Method: `GET`
- URL: `http://localhost:5001/todos`
- Headers: 
  - `Authorization: Bearer YOUR_JWT_TOKEN_HERE`

### 3. Create New Todo
**Endpoint:** `POST /todos`

**cURL:**
```bash
curl -X POST http://localhost:5001/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "title": "Test Todo",
    "description": "This is a test todo item"
  }'
```

**Response:**
```json
{
  "id": 3,
  "title": "Test Todo",
  "description": "This is a test todo item",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Postman:**
- Method: `POST`
- URL: `http://localhost:5001/todos`
- Headers: 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_JWT_TOKEN_HERE`
- Body (raw JSON):
```json
{
  "title": "Test Todo",
  "description": "This is a test todo item"
}
```

### 4. Update Todo
**Endpoint:** `PUT /todos/:id`

**cURL:**
```bash
curl -X PUT http://localhost:5001/todos/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "title": "Updated Todo Title",
    "description": "Updated description",
    "completed": true
  }'
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated Todo Title",
  "description": "Updated description",
  "completed": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Postman:**
- Method: `PUT`
- URL: `http://localhost:5001/todos/1`
- Headers: 
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_JWT_TOKEN_HERE`
- Body (raw JSON):
```json
{
  "title": "Updated Todo Title",
  "description": "Updated description",
  "completed": true
}
```

### 5. Delete Todo
**Endpoint:** `DELETE /todos/:id`

**cURL:**
```bash
curl -X DELETE http://localhost:5001/todos/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Response:**
```json
{
  "message": "Todo deleted successfully",
  "todo": {
    "id": 1,
    "title": "Learn React",
    "description": "Study React fundamentals and hooks",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Postman:**
- Method: `DELETE`
- URL: `http://localhost:5001/todos/1`
- Headers: 
  - `Authorization: Bearer YOUR_JWT_TOKEN_HERE`

## Health Check

### 6. Health Check
**Endpoint:** `GET /health`

**cURL:**
```bash
curl -X GET http://localhost:5001/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

**Postman:**
- Method: `GET`
- URL: `http://localhost:5001/health`

## Error Testing

### 7. Invalid Login
**cURL:**
```bash
curl -X POST http://localhost:5001/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "wrong@email.com",
    "password": "wrongpassword"
  }'
```

**Expected Response:**
```json
{
  "message": "Invalid credentials"
}
```

### 8. Missing Authorization
**cURL:**
```bash
curl -X GET http://localhost:5001/todos
```

**Expected Response:**
```json
{
  "message": "Access token required"
}
```

### 9. Invalid Token
**cURL:**
```bash
curl -X GET http://localhost:5001/todos \
  -H "Authorization: Bearer invalid_token_here"
```

**Expected Response:**
```json
{
  "message": "Invalid token"
}
```

### 10. Todo Not Found
**cURL:**
```bash
curl -X GET http://localhost:5001/todos/999 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "message": "Todo not found"
}
```

## Complete Testing Script

Here's a complete bash script to test all endpoints:

```bash
#!/bin/bash

BASE_URL="http://localhost:5001"

echo "🧪 Testing Todo Manager API"
echo "=========================="

# 1. Health Check
echo "1. Testing Health Check..."
curl -s -X GET $BASE_URL/health | jq .

# 2. Login
echo -e "\n2. Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Mm12345!"
  }')

echo $LOGIN_RESPONSE | jq .

# Extract token
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

if [ "$TOKEN" = "null" ] || [ "$TOKEN" = "" ]; then
    echo "❌ Login failed"
    exit 1
fi

echo "✅ Login successful, token: ${TOKEN:0:20}..."

# 3. Get All Todos
echo -e "\n3. Testing Get All Todos..."
curl -s -X GET $BASE_URL/todos \
  -H "Authorization: Bearer $TOKEN" | jq .

# 4. Create Todo
echo -e "\n4. Testing Create Todo..."
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "API Test Todo",
    "description": "Created via API testing"
  }')

echo $CREATE_RESPONSE | jq .

# Extract todo ID
TODO_ID=$(echo $CREATE_RESPONSE | jq -r '.id')

# 5. Update Todo
echo -e "\n5. Testing Update Todo..."
curl -s -X PUT $BASE_URL/todos/$TODO_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Updated API Test Todo",
    "completed": true
  }' | jq .

# 6. Delete Todo
echo -e "\n6. Testing Delete Todo..."
curl -s -X DELETE $BASE_URL/todos/$TODO_ID \
  -H "Authorization: Bearer $TOKEN" | jq .

echo -e "\n✅ All tests completed!"
```

## Postman Collection

You can import this JSON into Postman:

```json
{
  "info": {
    "name": "Todo Manager API",
    "description": "Complete API collection for Todo Manager application",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5001"
    },
    {
      "key": "token",
      "value": ""
    }
  ],
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/health",
          "host": ["{{baseUrl}}"],
          "path": ["health"]
        }
      }
    },
    {
      "name": "Login",
      "event": [
        {
          "listen": "test",
          "script": {
            "exec": [
              "if (pm.response.code === 200) {",
              "    const response = pm.response.json();",
              "    pm.collectionVariables.set('token', response.token);",
              "}"
            ]
          }
        }
      ],
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"Mm12345!\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/login",
          "host": ["{{baseUrl}}"],
          "path": ["login"]
        }
      }
    },
    {
      "name": "Get All Todos",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/todos",
          "host": ["{{baseUrl}}"],
          "path": ["todos"]
        }
      }
    },
    {
      "name": "Create Todo",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"New Todo\",\n  \"description\": \"Todo description\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/todos",
          "host": ["{{baseUrl}}"],
          "path": ["todos"]
        }
      }
    },
    {
      "name": "Update Todo",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          },
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Updated Todo\",\n  \"completed\": true\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/todos/1",
          "host": ["{{baseUrl}}"],
          "path": ["todos", "1"]
        }
      }
    },
    {
      "name": "Delete Todo",
      "request": {
        "method": "DELETE",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/todos/1",
          "host": ["{{baseUrl}}"],
          "path": ["todos", "1"]
        }
      }
    }
  ]
}
```

## Testing Tips

1. **Start with Login**: Always test login first to get a valid token
2. **Use Token**: Copy the token from login response and use it in Authorization header
3. **Test Error Cases**: Try invalid credentials, missing fields, and unauthorized access
4. **Check Status Codes**: Verify you get the correct HTTP status codes
5. **Validate Responses**: Ensure the response format matches the expected structure

## Common Issues

- **Port 5001**: Make sure the backend is running on port 5001
- **CORS**: If testing from browser, ensure CORS is properly configured
- **Token Expiry**: JWT tokens expire after 24 hours, re-login if needed
- **File Permissions**: Ensure the data directory has proper write permissions 