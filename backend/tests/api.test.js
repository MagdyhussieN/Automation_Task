const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { setupTestData, cleanupTestData, TEST_USERS_FILE, TEST_TODOS_FILE } = require('./setup');

// Configure data service to use test files
const dataService = require('../services/dataService');

// Import the app after mocking
const app = require('../server.test');

describe('Todo Manager API', () => {
    let authToken;
    let testTodoId;

    beforeAll(async () => {
        await setupTestData();
        // Configure data service to use test files
        dataService.setFilePaths(TEST_USERS_FILE, TEST_TODOS_FILE);
    });

    afterAll(async () => {
        await cleanupTestData();
    });

    describe('Authentication', () => {
        describe('POST /login', () => {
            it('should login with valid credentials', async () => {
                const response = await request(app)
                    .post('/login')
                    .send({
                        email: 'test@example.com',
                        password: 'testpass123'
                    })
                    .expect(200);

                expect(response.body).toHaveProperty('token');
                expect(response.body).toHaveProperty('user');
                expect(response.body.user.email).toBe('test@example.com');
                expect(response.body.user.name).toBe('Test User');

                // Store token for other tests
                authToken = response.body.token;
            });

            it('should reject login with invalid email', async () => {
                const response = await request(app)
                    .post('/login')
                    .send({
                        email: 'wrong@example.com',
                        password: 'testpass123'
                    })
                    .expect(401);

                expect(response.body.message).toBe('Invalid credentials');
            });

            it('should reject login with invalid password', async () => {
                const response = await request(app)
                    .post('/login')
                    .send({
                        email: 'test@example.com',
                        password: 'wrongpassword'
                    })
                    .expect(401);

                expect(response.body.message).toBe('Invalid credentials');
            });

            it('should reject login with missing email', async () => {
                const response = await request(app)
                    .post('/login')
                    .send({
                        password: 'testpass123'
                    })
                    .expect(400);

                expect(response.body.message).toBe('Email and password are required');
            });

            it('should reject login with missing password', async () => {
                const response = await request(app)
                    .post('/login')
                    .send({
                        email: 'test@example.com'
                    })
                    .expect(400);

                expect(response.body.message).toBe('Email and password are required');
            });
        });
    });

    describe('Todo Management', () => {
        describe('GET /todos', () => {
            it('should get all todos with valid token', async () => {
                const response = await request(app)
                    .get('/todos')
                    .set('Authorization', `Bearer ${authToken}`)
                    .expect(200);

                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body.length).toBeGreaterThan(0);
                expect(response.body[0]).toHaveProperty('id');
                expect(response.body[0]).toHaveProperty('title');
                expect(response.body[0]).toHaveProperty('description');
                expect(response.body[0]).toHaveProperty('completed');
                expect(response.body[0]).toHaveProperty('createdAt');
            });

            it('should reject request without token', async () => {
                const response = await request(app)
                    .get('/todos')
                    .expect(401);

                expect(response.body.message).toBe('Access token required');
            });

            it('should reject request with invalid token', async () => {
                const response = await request(app)
                    .get('/todos')
                    .set('Authorization', 'Bearer invalid_token')
                    .expect(403);

                expect(response.body.message).toBe('Invalid token');
            });
        });

        describe('POST /todos', () => {
            it('should create new todo with valid data', async () => {
                const newTodo = {
                    title: 'Test Todo for API',
                    description: 'This is a test todo created via API'
                };

                const response = await request(app)
                    .post('/todos')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send(newTodo)
                    .expect(201);

                expect(response.body).toHaveProperty('id');
                expect(response.body.title).toBe(newTodo.title);
                expect(response.body.description).toBe(newTodo.description);
                expect(response.body.completed).toBe(false);
                expect(response.body).toHaveProperty('createdAt');

                // Store todo ID for update/delete tests
                testTodoId = response.body.id;
            });

            it('should create todo with only title', async () => {
                const newTodo = {
                    title: 'Todo with only title'
                };

                const response = await request(app)
                    .post('/todos')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send(newTodo)
                    .expect(201);

                expect(response.body.title).toBe(newTodo.title);
                expect(response.body.description).toBe('');
            });

            it('should reject todo creation without title', async () => {
                const newTodo = {
                    description: 'Todo without title'
                };

                const response = await request(app)
                    .post('/todos')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send(newTodo)
                    .expect(400);

                expect(response.body.message).toBe('Title is required');
            });

            it('should reject todo creation without authentication', async () => {
                const newTodo = {
                    title: 'Unauthorized todo'
                };

                const response = await request(app)
                    .post('/todos')
                    .send(newTodo)
                    .expect(401);

                expect(response.body.message).toBe('Access token required');
            });
        });

        describe('PUT /todos/:id', () => {
            it('should update existing todo', async () => {
                const updates = {
                    title: 'Updated Todo Title',
                    description: 'Updated description',
                    completed: true
                };

                const response = await request(app)
                    .put(`/todos/${testTodoId}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .send(updates)
                    .expect(200);

                expect(response.body.id).toBe(testTodoId);
                expect(response.body.title).toBe(updates.title);
                expect(response.body.description).toBe(updates.description);
                expect(response.body.completed).toBe(updates.completed);
            });

            it('should update todo partially', async () => {
                const updates = {
                    completed: false
                };

                const response = await request(app)
                    .put(`/todos/${testTodoId}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .send(updates)
                    .expect(200);

                expect(response.body.id).toBe(testTodoId);
                expect(response.body.completed).toBe(false);
                // Other fields should remain unchanged
                expect(response.body.title).toBe('Updated Todo Title');
            });

            it('should reject update of non-existent todo', async () => {
                const updates = {
                    title: 'Non-existent todo'
                };

                const response = await request(app)
                    .put('/todos/99999')
                    .set('Authorization', `Bearer ${authToken}`)
                    .send(updates)
                    .expect(404);

                expect(response.body.message).toBe('Todo not found');
            });

            it('should reject update without authentication', async () => {
                const updates = {
                    title: 'Unauthorized update'
                };

                const response = await request(app)
                    .put(`/todos/${testTodoId}`)
                    .send(updates)
                    .expect(401);

                expect(response.body.message).toBe('Access token required');
            });
        });

        describe('DELETE /todos/:id', () => {
            it('should delete existing todo', async () => {
                const response = await request(app)
                    .delete(`/todos/${testTodoId}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .expect(200);

                expect(response.body.message).toBe('Todo deleted successfully');
                expect(response.body.todo).toHaveProperty('id', testTodoId);
                expect(response.body.todo).toHaveProperty('title');
            });

            it('should reject deletion of non-existent todo', async () => {
                const response = await request(app)
                    .delete('/todos/99999')
                    .set('Authorization', `Bearer ${authToken}`)
                    .expect(404);

                expect(response.body.message).toBe('Todo not found');
            });

            it('should reject deletion without authentication', async () => {
                const response = await request(app)
                    .delete(`/todos/${testTodoId}`)
                    .expect(401);

                expect(response.body.message).toBe('Access token required');
            });
        });
    });

    describe('Health Check', () => {
        describe('GET /health', () => {
            it('should return health status', async () => {
                const response = await request(app)
                    .get('/health')
                    .expect(200);

                expect(response.body.status).toBe('OK');
                expect(response.body.message).toBe('Server is running');
            });
        });
    });
}); 