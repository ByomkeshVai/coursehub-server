# Course Hub - Express and Mongoose Project

- Live Link - https://coursehub-advance.vercel.app/

# Post Man API Dodcumentation

- Live Link - https://documenter.getpostman.com/view/21337869/2s9Ykt6env

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [Linting and Formatting](#linting-and-formatting)
- [Testing](#testing)

## Introduction

CourseHub is a project built with Express and Mongoose to manage car-related information.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (Make sure it's running)

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd CourseHub
npm install
```

## Configuration

- PORT=5000
- DATABASE_URL - "Your MongoDB database"
- NODE_ENV - "development" | "production"

## Running the Application

### Development Mode

```npm run start:dev
The server will be running at http://localhost:5000
```

### Production Mode

```npm run build
npm start:prod
```

## Linting and Formatting

```
Lint the code: npm run lint
```

```
fix litting issues: npm run lint:fix
```

## Format your code:

```
npm run prettier
```

## Testing

```
npm run test
```

## Default Login Access

### 1. User Login

```json
{
  "username": "user",
  "password": "User@12345"
}
```

### 1. Admin Login

```json
{
  "username": "admin",
  "password": "Admin@1234"
}
```

## EndPoints

### 1. User Registration

- **Route:** `/api/auth/register`
- **Method:** POST
- **Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user"
}
```

- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
      "_id": "54321abcde67890fghij",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2023-01-01T12:00:00.000Z",
      "updatedAt": "2023-01-01T12:00:00.000Z"
    }
  }
  ```

### 2. User Login

- **Route:** `/api/auth/login`
- **Method:** POST
- **Request Body:**

  ```json
  {
    "username": "john_doe",
    "password": "123456"
  }
  ```

- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User login successful",
    "data": {
      "user": {
        "_id": "54321abcde67890fghij",
        "username": "john_doe",
        "email": "john@example.com",
        "role": "user"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
  }
  ```

### 3. Change Password

- **Route:** `/api/auth/change-password`
- **Method:** POST
- **Request Headers:**

```markdown
Authorization: <JWT_TOKEN>
```

- ** `Password must be at least 8 characters long and include at least one uppercase letter and one special character.`**

- **`currentPassword`**: The user's current password for verification.
- **`newPassword`**: The new password the user wants to set.

```json
{
  "currentPassword": "123456",
  "newPassword": "new123456"
}
```

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Password changed successfully",
  "data": {
    "_id": "54321abcde67890fghij",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-02T12:30:00.000Z"
  }
}
```

### 4. For Create a Category

- **Endpoint:** **`/api/categories`**
- **Method:** **POST**
- **Request Headers:**

  ```markdown
  Authorization: <JWT*TOKEN> *(Only Admin can do this)\_
  ```

  - **Request Body:**

    ```json
    {
      "name": "Web Development"
    }
    ```

- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Category created successfully",
    "data": {
      "_id": "12345abcde67890fghij",
      "name": "Web Development",
      "createdBy": "adminUserId",
      "createdAt": "2023-01-15T12:00:00.000Z",
      "updatedAt": "2023-01-15T12:00:00.000Z"
    }
  }
  ```

### 5. For Get Category

- **Endpoint:** **`/api/categories`**
- **Method:** **GET**

  - **Response:**
    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Categories retrieved successfully",
      "data": {
        "categories": [
          {
            "_id": "12345abcde67890fghij",
            "name": "Web Development",
            "createdBy": {
              "_id": "adminUserId",
              "username": "adminUser",
              "email": "admin@example.com",
              "role": "admin"
            },
            "createdAt": "2023-01-15T12:00:00.000Z",
            "updatedAt": "2023-01-15T12:00:00.000Z"
          }
          // ... other categories
        ]
      }
    }
    ```

### 6. Create a Course

- **Endpoint:** `/api/courses`
- **Method:** **POST**
- **Request Headers:**

  ```markdown
  Authorization: <JWT*TOKEN> *(Only Admin can do this)\_
  ```

  - **Request Body:**

  ```json
  {
    "title": "Introduction to Web Development",
    "instructor": "John Smith",
    "categoryId": "12345abcde67890fghij",
    "price": 49.99,
    "tags": [
      { "name": "Programming", "isDeleted": false },
      { "name": "Web Development", "isDeleted": false }
    ],
    "startDate": "2023-02-01",
    "endDate": "2023-04-01",
    "language": "English",
    "provider": "Tech Academy",
    "durationInWeeks": 8,
    "details": {
      "level": "Beginner",
      "description": "A comprehensive introduction to web development."
    }
  }
  ```

- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Course created successfully",
    "data": {
      "_id": "67890fghij54321abcde",
      "title": "Introduction to Web Development",
      "instructor": "John Smith",
      "categoryId": "12345abcde67890fghij",
      "price": 49.99,
      "tags": [
        { "name": "Programming", "isDeleted": false },
        { "name": "Web Development", "isDeleted": false }
      ],
      "startDate": "2023-02-01",
      "endDate": "2023-04-01",
      "language": "English",
      "provider": "Tech Academy",
      "durationInWeeks": 8,
      "details": {
        "level": "Beginner",
        "description": "A comprehensive introduction to web development."
      },
      "createdBy": "adminUserId",
      "createdAt": "2023-01-15T12:00:00.000Z",
      "updatedAt": "2023-01-15T12:00:00.000Z"
    }
  }
  ```

### 7. GET All Course

- **Endpoint:** `/api/courses`
- **Method:** **GET**

```markdown
    You can use Queries Like - 'title, price, startDate, endDate, language, durationInWeeks'
```

- **Response:**
  - Make sure that the password field or any other security-related field is not included in the response data.
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Courses retrieved successfully",
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 50
    },
    "data": {
      "courses": [
        {
          "_id": "67890fghij54321abcde",
          "title": "Introduction to Web Development",
          "instructor": "John Smith",
          "categoryId": "12345abcde67890fghij",
          "price": 49.99,
          "tags": [
            { "name": "Programming", "isDeleted": false },
            { "name": "Web Development", "isDeleted": false }
          ],
          "startDate": "2023-02-01",
          "endDate": "2023-04-01",
          "language": "English",
          "provider": "Tech Academy",
          "durationInWeeks": 8,
          "details": {
            "level": "Beginner",
            "description": "A comprehensive introduction to web development."
          },
          "createdBy": {
            "_id": "adminUserId",
            "username": "adminUser",
            "email": "admin@example.com",
            "role": "admin"
          },
          "createdAt": "2023-01-15T12:00:00.000Z",
          "updatedAt": "2023-01-15T12:00:00.000Z"
        }
        // ... other courses
      ]
    }
  }
  ```

### 8. For Update a Course (Partial Update with Dynamic Update)

- **Endpoint:** `/api/courses/:courseId`
- **Method:** **PUT**
- **Request Headers:**

```markdown
Authorization: <JWT*TOKEN> *(Only Admin can do this)\_
```

- **Request Body:**

  ```json
  {
    "price": 59.99,
    "tags": [
      { "name": "Programming", "isDeleted": false },
      { "name": "Web Development", "isDeleted": false },
      { "name": "JavaScript", "isDeleted": false }
    ],
    "details": {
      "level": "Intermediate",
      "description": "A comprehensive course on web development with a focus on JavaScript."
    }
  }
  ```

- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Course updated successfully",
    "data": {
      "_id": "67890fghij54321abcde",
      "title": "Introduction to Web Development",
      "instructor": "John Smith",
      "categoryId": "12345abcde67890fghij",
      "price": 59.99,
      "tags": [
        { "name": "Programming", "isDeleted": false },
        { "name": "Web Development", "isDeleted": false },
        { "name": "JavaScript", "isDeleted": false }
      ],
      "startDate": "2023-02-01",
      "endDate": "2023-04-01",
      "language": "English",
      "provider": "Tech Academy",
      "durationInWeeks": 8,
      "details": {
        "level": "Intermediate",
        "description": "A comprehensive course on web development with a focus on JavaScript."
      },
      "createdBy": {
        "_id": "adminUserId",
        "username": "adminUser",
        "email": "admin@example.com",
        "role": "admin"
      },
      "createdAt": "2023-01-15T12:00:00.000Z",
      "updatedAt": "2023-01-16T12:30:00.000Z"
    }
  }
  ```

### 9. Get Course by ID with Reviews

- **Endpoint:** `/api/courses/:courseId/reviews`
- **Method:** **PUT**

  **Response:**

  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Course with reviews retrieved successfully",
    "data": {
      "course": {
        "_id": "67890fghij54321abcde",
        "title": "Introduction to Web Development",
        "instructor": "John Smith",
        "categoryId": "12345abcde67890fghij",
        "price": 59.99,
        "tags": [
          { "name": "Programming", "isDeleted": false },
          { "name": "Web Development", "isDeleted": false },
          { "name": "JavaScript", "isDeleted": false }
        ],
        "startDate": "2023-02-01",
        "endDate": "2023-04-01",
        "language": "English",
        "provider": "Tech Academy",
        "durationInWeeks": 8,
        "details": {
          "level": "Intermediate",
          "description": "A comprehensive course on web development with a focus on JavaScript."
        },
        "createdBy": {
          "_id": "adminUserId",
          "username": "adminUser",
          "email": "admin@example.com",
          "role": "admin"
        },
        "createdAt": "2023-01-15T12:00:00.000Z",
        "updatedAt": "2023-01-16T12:30:00.000Z"
      },
      "reviews": [
        {
          "_id": "98765fghij43210lkji",
          "courseId": "67890fghij54321abcde",
          "rating": 4,
          "review": "Great course, very informative and well-structured.",
          "createdBy": {
            "_id": "userid",
            "username": "username",
            "email": "user@example.com",
            "role": "user"
          },
          "createdAt": "2023-01-15T12:00:00.000Z",
          "updatedAt": "2023-01-15T12:00:00.000Z"
        }
        // ... other reviews
      ]
    }
  }
  ```

### 10. Get the Best Course Based on Average Review (Rating)

- **Endpoint:** `/api/courses/best`
- **Method:** **GET**
  - **Response:**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Best course retrieved successfully",
    "data": {
      "course": {
        "_id": "23245dsfd453242348rFcg",
        "title": "Best Book Title",
        "instructor": "New Instructor",
        "categoryId": "123456789012345678901234",
        "price": 59.99,
        "tags": [
          {
            "name": "Programming",
            "isDeleted": false
          },
          {
            "name": "Web Development",
            "isDeleted": false
          }
        ],
        "startDate": "2023-02-01",
        "endDate": "2023-03-14",
        "language": "Spanish",
        "provider": "Code Masters",
        "durationInWeeks": 6,
        "details": {
          "level": "Intermediate",
          "description": "Detailed description of the course"
        },
        "createdBy": {
          "_id": "userid",
          "username": "username",
          "email": "user@example.com",
          "role": "user"
        },
        "createdAt": "2023-01-15T12:00:00.000Z",
        "updatedAt": "2023-01-15T12:00:00.000Z"
      },
      "averageRating": 4.8,
      "reviewCount": 50
    }
  }
  ```

### 11. For Create a Review

- **Endpoint:** `/api/reviews`
- **Method:** **POST**
- **Request Headers:**

  ```markdown
  Authorization: <JWT*TOKEN> *(Only User can do this)\_
  ```

  - **Request Body:**

    ```json
    {
      "courseId": "67890fghij54321abcde",
      "rating": 4,
      "review": "Great course, very informative and well-structured."
    }
    ```
