// auth.test.js

import request from 'supertest';
import app from '../server'; // Adjust the path to your server file
import mongoose from 'mongoose';
import User from '../models/user.model'; // Adjust the path to your User model

// Clear the database before each test
beforeEach(async () => {
  await User.deleteMany({});
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Authentication Endpoints', () => {
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          password: 'testpassword',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully.');

      const user = await User.findOne({ username: 'testuser' });
      expect(user).toBeTruthy();
    });

    it('should not register a user with an existing username', async () => {
      await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          password: 'testpassword',
        });

      const response = await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          password: 'newpassword',
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Username already exists.');
    });
  });

  describe('POST /login', () => {
    it('should login an existing user', async () => {
      await request(app)
        .post('/register')
        .send({
          username: 'testuser',
          password: 'testpassword',
        });

      const response = await request(app)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'testpassword',
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful.');
    });

    it('should not login with invalid credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'nonexistentuser',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid username or password.');
    });
  });
});
