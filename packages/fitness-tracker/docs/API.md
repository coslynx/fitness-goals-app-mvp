## API Documentation for "Track Your Fitness Goals Easily Now" MVP

This document outlines the API endpoints and functionality for "Track Your Fitness Goals Easily Now," a web application designed to help users set, track, and achieve their fitness goals. The API is built with Express.js, leveraging TypeScript for type safety and ensuring a robust and scalable backend.

### Authentication Endpoints

#### 1. Register a New User

**Endpoint:** `/api/auth/register`

**Method:** POST

**Request Body:**

```json
{
  "email": "user@example.com", 
  "password": "securepass123" 
}
```

**Response Body:**

```json
{
  "id": "user123",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT Token
}
```

**Description:** Creates a new user account with the provided email and password. The response includes the user's ID and a JWT token for authentication.

#### 2. Log In an Existing User

**Endpoint:** `/api/auth/login`

**Method:** POST

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepass123" 
}
```

**Response Body:**

```json
{
  "id": "user123",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // JWT Token
}
```

**Description:** Authenticates an existing user with the provided email and password. The response includes the user's ID and a JWT token for authentication.

### Goal Management Endpoints

**Authentication:** All Goal Management Endpoints require authentication via a JWT token in the `Authorization` header. 
**Format:** `Authorization: Bearer YOUR_JWT_TOKEN`

#### 1. Create a New Fitness Goal

**Endpoint:** `/api/goals`

**Method:** POST

**Request Body:**

```json
{
  "title": "Lose 10 Pounds", 
  "target": 10, 
  "deadline": "2024-12-31" 
}
```

**Response Body:**

```json
{
  "id": "goal123",
  "title": "Lose 10 Pounds",
  "target": 10,
  "deadline": "2024-12-31",
  "progress": 0 
}
```

**Description:** Creates a new fitness goal for the authenticated user. The response includes the goal's ID and progress, which is initially 0.

#### 2. Get All Goals for the Current User

**Endpoint:** `/api/goals`

**Method:** GET

**Response Body:**

```json
[
  {
    "id": "goal123",
    "title": "Lose 10 Pounds",
    "target": 10,
    "deadline": "2024-12-31",
    "progress": 2 // Example progress value
  },
  // ... other goals
]
```

**Description:** Retrieves all goals for the authenticated user.

#### 3. Get a Specific Goal by its ID

**Endpoint:** `/api/goals/:id`

**Method:** GET

**Response Body:**

```json
{
  "id": "goal123",
  "title": "Lose 10 Pounds",
  "target": 10,
  "deadline": "2024-12-31",
  "progress": 5 // Example progress value
}
```

**Description:** Retrieves a specific goal based on its ID.

#### 4. Update a Specific Goal

**Endpoint:** `/api/goals/:id`

**Method:** PUT

**Request Body:**

```json
{
  "title": "Lose 15 Pounds", 
  "target": 15, 
  "deadline": "2025-01-15" 
}
```

**Response Body:**

```json
{
  "id": "goal123",
  "title": "Lose 15 Pounds",
  "target": 15,
  "deadline": "2025-01-15",
  "progress": 0 // Progress resets as the deadline changes
}
```

**Description:** Updates a specific goal with the provided data.

#### 5. Delete a Specific Goal

**Endpoint:** `/api/goals/:id`

**Method:** DELETE

**Response Body:** (Empty)

**Description:** Deletes a specific goal based on its ID.

### Workout Logging Endpoints

**Authentication:** All Workout Logging Endpoints require authentication via a JWT token in the `Authorization` header. 
**Format:** `Authorization: Bearer YOUR_JWT_TOKEN`

#### 1. Log a New Workout

**Endpoint:** `/api/workouts`

**Method:** POST

**Request Body:**

```json
{
  "type": "Running", 
  "duration": 30, 
  "intensity": "Moderate", 
  "caloriesBurned": 300, 
  "date": "2023-12-20" 
}
```

**Response Body:**

```json
{
  "id": "workout123",
  "type": "Running",
  "duration": 30,
  "intensity": "Moderate",
  "caloriesBurned": 300,
  "date": "2023-12-20"
}
```

**Description:** Logs a new workout for the authenticated user. The response includes the workout's ID and details.

#### 2. Get All Workouts for the Current User

**Endpoint:** `/api/workouts`

**Method:** GET

**Response Body:**

```json
[
  {
    "id": "workout123",
    "type": "Running",
    "duration": 30,
    "intensity": "Moderate",
    "caloriesBurned": 300,
    "date": "2023-12-20"
  },
  // ... other workouts
]
```

**Description:** Retrieves all workouts for the authenticated user.

#### 3. Get a Specific Workout by its ID

**Endpoint:** `/api/workouts/:id`

**Method:** GET

**Response Body:**

```json
{
  "id": "workout123",
  "type": "Running",
  "duration": 30,
  "intensity": "Moderate",
  "caloriesBurned": 300,
  "date": "2023-12-20"
}
```

**Description:** Retrieves a specific workout based on its ID.

#### 4. Update a Specific Workout

**Endpoint:** `/api/workouts/:id`

**Method:** PUT

**Request Body:**

```json
{
  "type": "Weightlifting", 
  "duration": 45, 
  "intensity": "High", 
  "caloriesBurned": 400, 
  "date": "2023-12-21" 
}
```

**Response Body:**

```json
{
  "id": "workout123",
  "type": "Weightlifting",
  "duration": 45,
  "intensity": "High",
  "caloriesBurned": 400,
  "date": "2023-12-21"
}
```

**Description:** Updates a specific workout with the provided data.

#### 5. Delete a Specific Workout

**Endpoint:** `/api/workouts/:id`

**Method:** DELETE

**Response Body:** (Empty)

**Description:** Deletes a specific workout based on its ID.

### Error Handling

- **400 Bad Request:** Invalid or missing data in the request body.
- **401 Unauthorized:** Missing or invalid JWT token.
- **403 Forbidden:** Insufficient permissions to access the resource.
- **404 Not Found:** The requested resource (user, goal, workout) was not found.
- **500 Internal Server Error:**  An unexpected error occurred on the server.

### Documentation

- The API is documented using Swagger. You can access the API documentation through the `/api/docs` endpoint.

### Example API Requests (using `curl`)

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{\"email\": \"user@example.com\", \"password\": \"securepass123\"}'

# Log in an existing user
curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{\"email\": \"user@example.com\", \"password\": \"securepass123\"}'

# Create a new goal (using JWT token from login)
curl -X POST http://localhost:3000/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{\"title\": \"Lose 10 Pounds\", \"target\": 10, \"deadline\": \"2024-12-31\"}' 

# Log a new workout (using JWT token from login)
curl -X POST http://localhost:3000/api/workouts \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{\"type\": \"Running\", \"duration\": 30, \"intensity\": \"Moderate\", \"caloriesBurned\": 300, \"date\": \"2023-12-20\"}'
```

---
## Technical Details

### 🛠️ Programming Language: TypeScript

**Justification:**

- **Type Safety:** TypeScript provides compile-time type checking, preventing errors and improving code quality.
- **Code Maintainability:** Types help improve code readability and make it easier to understand and maintain.
- **Scalability:** Types make it easier to scale the application as the codebase grows in complexity.

### 🧱 Framework: Express.js

**Justification:**

- **Simplicity:** Express.js is a lightweight and easy-to-use framework for building RESTful APIs.
- **Flexibility:** Express.js allows for easy customization of routes and middleware.
- **Performance:** Express.js is known for its performance and scalability.

### 🗄️ Database: MongoDB Atlas

**Justification:**

- **Scalability:** MongoDB Atlas provides a scalable and reliable cloud-based database service.
- **Document-Oriented Structure:**  MongoDB's document-oriented structure is flexible for storing diverse data, such as user profiles, goals, and workouts.

### 🔧 ORM: Prisma

**Justification:**

- **Type Safety:** Prisma Client generates a type-safe database access layer, reducing errors and improving development speed.
- **Simplicity:** Prisma simplifies database interactions, making it easier to work with the database.

### 🌐 API Documentation: Swagger

**Justification:**

- **Automated Documentation:** Swagger generates interactive API documentation automatically, making it easy to understand and test the API.

---
## Code Structure & Functionality

### 1. `packages/fitness-tracker/src/infrastructure/api/routes/goals.ts`

- **Purpose:** Defines API routes for managing fitness goals, acting as a bridge between API endpoints and the `GoalController`.
- **Implementation:**
    - Imports `Router` from `express`.
    - Imports `GoalController` from `../controllers/GoalController.ts`.
    - Imports `authMiddleware` from `../middleware/auth.ts`.
    - Creates an instance of `Router` for goal-related routes.
    - Creates an instance of `GoalController`.
    - Defines routes for each API operation (POST, GET, PUT, DELETE) related to goals, mapping them to the corresponding methods in `GoalController`.
    - Applies the `authMiddleware` for authorization before any goal-related actions.

### 2. `packages/fitness-tracker/src/infrastructure/api/routes/workouts.ts`

- **Purpose:** Defines API routes for managing workout logs, acting as a bridge between API endpoints and the `WorkoutController`.
- **Implementation:**
    - Imports `Router` from `express`.
    - Imports `WorkoutController` from `../controllers/WorkoutController.ts`.
    - Imports `authMiddleware` from `../middleware/auth.ts`.
    - Creates an instance of `Router` for workout-related routes.
    - Creates an instance of `WorkoutController`.
    - Defines routes for each API operation (POST, GET, PUT, DELETE) related to workouts, mapping them to the corresponding methods in `WorkoutController`.
    - Applies the `authMiddleware` for authorization before any workout-related actions.

### 3. `packages/fitness-tracker/src/infrastructure/api/routes/users.ts`

- **Purpose:** Defines API routes for managing user accounts, acting as a bridge between API endpoints and the `UserController`.
- **Implementation:**
    - Imports `Router` from `express`.
    - Imports `UserController` from `../controllers/UserController.ts`.
    - Imports `authMiddleware` from `../middleware/auth.ts`.
    - Creates an instance of `Router` for user-related routes.
    - Creates an instance of `UserController`.
    - Defines routes for each API operation (POST, GET, PUT, DELETE) related to users, mapping them to the corresponding methods in `UserController`.
    - Applies the `authMiddleware` for authorization before any user-related actions.

### 4. `packages/fitness-tracker/src/infrastructure/api/middleware/auth.ts`

- **Purpose:**  Handles authentication and authorization for API requests, ensuring that only authorized users can access protected resources.
- **Implementation:**
    - Imports `NextApiRequest` and `NextApiResponse` from `next`.
    - Imports `getSession` from `next-auth/react`.
    - Defines a middleware function (`authMiddleware`) that intercepts API requests.
    - Uses `getSession({ req })` to retrieve the user's session data using `next-auth/react`.
    - If the session is not found, returns a 401 Unauthorized response.
    - If the session is found, attaches the user's ID to the request object (`req.userId`) for downstream access.
    - Calls `next()` to proceed to the next middleware or controller.
    - Implements robust error handling to catch potential errors during session retrieval or authentication.

### 5. `packages/fitness-tracker/src/infrastructure/api/middleware/errorHandler.ts`

- **Purpose:**  Handles API errors and provides standardized responses, ensuring that all API errors are handled gracefully and consistently.
- **Implementation:**
    - Imports `Request`, `Response`, and `NextFunction` from `express`.
    - Imports `HttpException` from `../../../errors/HttpException.ts`.
    - Defines a middleware function (`errorHandler`) that intercepts uncaught errors from API controllers.
    - Checks if the error is an instance of `HttpException`.
    - If so, returns a JSON response with the error status code and message.
    - Otherwise, logs the error to the console and returns a 500 Internal Server Error response.

### 6. `packages/fitness-tracker/src/infrastructure/api/services/GoalService.ts`

- **Purpose:** Provides business logic for managing fitness goals, encapsulating the logic for interacting with goals from the API layer.
- **Implementation:**
    - Imports `Goal` from `../../../domain/goals/entities/Goal.ts`.
    - Imports `GoalRepository` from `../../../domain/goals/repositories/GoalRepository.ts`.
    - Imports `CreateGoal` from `../../../domain/goals/usecases/CreateGoal.ts`.
    - Imports `UpdateGoal` from `../../../domain/goals/usecases/UpdateGoal.ts`.
    - Imports `DeleteGoal` from `../../../domain/goals/usecases/DeleteGoal.ts`.
    - Defines a class (`GoalService`) that encapsulates goal-related business logic.
    - Implements methods for creating, reading, updating, and deleting goals.
    - Utilizes `CreateGoal`, `UpdateGoal`, and `DeleteGoal` use cases for executing goal-related operations.
    - Delegates database operations to `GoalRepository`.
    - Implements robust error handling to catch potential errors during database interactions or use case execution.

### 7. `packages/fitness-tracker/src/infrastructure/api/services/WorkoutService.ts`

- **Purpose:** Provides business logic for managing workout logs, encapsulating the logic for interacting with workouts from the API layer.
- **Implementation:**
    - Imports `Workout` from `../../../domain/workouts/entities/Workout.ts`.
    - Imports `WorkoutRepository` from `../../../domain/workouts/repositories/WorkoutRepository.ts`.
    - Imports `CreateWorkout` from `../../../domain/workouts/usecases/CreateWorkout.ts`.
    - Imports `UpdateWorkout` from `../../../domain/workouts/usecases/UpdateWorkout.ts`.
    - Imports `DeleteWorkout` from `../../../domain/workouts/usecases/DeleteWorkout.ts`.
    - Defines a class (`WorkoutService`) that encapsulates workout-related business logic.
    - Implements methods for creating, reading, updating, and deleting workouts.
    - Utilizes `CreateWorkout`, `UpdateWorkout`, and `DeleteWorkout` use cases for executing workout-related operations.
    - Delegates database operations to `WorkoutRepository`.
    - Implements robust error handling to catch potential errors during database interactions or use case execution.

### 8. `packages/fitness-tracker/src/infrastructure/api/services/UserService.ts`

- **Purpose:** Provides business logic for managing user accounts, encapsulating the logic for interacting with users from the API layer.
- **Implementation:**
    - Imports `User` from `../../../domain/users/entities/User.ts`.
    - Imports `UserRepository` from `../../../domain/users/repositories/UserRepository.ts`.
    - Imports `CreateUser` from `../../../domain/users/usecases/CreateUser.ts`.
    - Imports `UpdateUser` from `../../../domain/users/usecases/UpdateUser.ts`.
    - Imports `DeleteUser` from `../../../domain/users/usecases/DeleteUser.ts`.
    - Defines a class (`UserService`) that encapsulates user-related business logic.
    - Implements methods for creating, reading, updating, and deleting users.
    - Utilizes `CreateUser`, `UpdateUser`, and `DeleteUser` use cases for executing user-related operations.
    - Delegates database operations to `UserRepository`.
    - Implements robust error handling to catch potential errors during database interactions or use case execution.

### 9. `packages/fitness-tracker/src/infrastructure/authentication/strategies/Google.ts`

- **Purpose:** Implements the Google OAuth authentication strategy, allowing users to log in using their Google accounts.
- **Implementation:**
    - Imports `NextApiRequest`, `NextApiResponse` from `next`.
    - Imports `NextAuth` and `Session` from `next-auth`.
    - Imports `GoogleProvider` from `next-auth/providers/google`.
    - Defines the Google OAuth provider configuration with `clientId`, `clientSecret`, and other relevant options (e.g., scopes). 

### 10. `packages/fitness-tracker/src/infrastructure/authentication/strategies/Facebook.ts`

- **Purpose:** Implements the Facebook OAuth authentication strategy, allowing users to log in using their Facebook accounts.
- **Implementation:**
    - Imports `NextApiRequest`, `NextApiResponse` from `next`.
    - Imports `NextAuth` and `Session` from `next-auth`.
    - Imports `FacebookProvider` from `next-auth/providers/facebook`.
    - Defines the Facebook OAuth provider configuration with `clientId`, `clientSecret`, and other relevant options (e.g., scopes).

### 11. `packages/fitness-tracker/src/infrastructure/authentication/services/AuthService.ts`

- **Purpose:** Provides business logic for handling authentication and authorization, managing the authentication process and user session management.
- **Implementation:**
    - Imports `NextApiRequest`, `NextApiResponse` from `next`.
    - Imports `NextAuth`, `Session` from `next-auth`.
    - Imports `User` from `../../../domain/users/entities/User.ts`.
    - Imports `CreateUser` from `../../../domain/users/usecases/CreateUser.ts`.
    - Imports `UserRepository` from `../../../domain/users/repositories/UserRepository.ts`.
    - Imports `PrismaClient` from `@prisma/client`.
    - Imports `bcrypt` for password hashing.
    - Creates a new `PrismaClient` instance.
    - Defines a class (`AuthService`) to handle authentication logic.
    - Implements methods for user registration (`register`) and login (`login`).
    - Uses `bcrypt` to hash passwords during registration.
    - Leverages `NextAuth.jwt` to generate JWT tokens for authenticated users.
    - Implements robust error handling to catch potential errors during authentication, registration, or token generation. 

---
## Code Generation Instructions

- **File Path:** `packages/fitness-tracker/docs/API.md`
- **Content:**  Generate the Markdown content for this file, adhering to the detailed instructions above.
- **Language:**  Markdown
- **Style:**  Maintain consistency with existing Markdown files in the project.
- **Dependencies:**
    - `next-auth`: 4.24.8
    - `express`: 4.21.1
    - `swagger-jsdoc`: 6.2.8
    - `swagger-ui-express`: 5.0.1
- **Error Handling:** Implement robust error handling mechanisms for all potential failure scenarios.
- **Performance:** Optimize for performance and resource efficiency.
- **Security:** Adhere to security practices established in the MVP.
- **Integration:**  Ensure seamless integration with the MVP's existing codebase and structure.
- **Documentation:** Document code thoroughly using inline comments and JSDoc. 
- **Extensibility:**  Design the code for scalability and future feature additions. 
- **Testing:**  Write comprehensive unit tests for all functions and methods within this file.
- **Linting:** Ensure the code adheres to the established ESLint rules.
- **Formatting:**  Ensure the code is properly formatted according to Prettier's configurations. 

**Note:**  This prompt is designed to be extremely specific and detailed.  Constant reference should be made back to the instructions and the existing codebase for a high-quality, integrated, and maintainable implementation.