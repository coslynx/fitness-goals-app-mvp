<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
  fitness-goals-app-mvp
</h1>
<h4 align="center">A web application to set, track, and celebrate your fitness goals</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework: Next.js" />
  <img src="https://img.shields.io/badge/Frontend-TypeScript,_React,_HTML,_CSS-red" alt="Frontend: TypeScript, React, HTML, CSS" />
  <img src="https://img.shields.io/badge/Backend-Node.js,_Express.js-blue" alt="Backend: Node.js, Express.js" />
  <img src="https://img.shields.io/badge/Database-MongoDB-black" alt="Database: MongoDB" />
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-goals-app-mvp?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-goals-app-mvp?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-goals-app-mvp?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository houses the code for a web application MVP named "Track Your Fitness Goals Easily Now". This application provides a user-friendly platform to set, track, and celebrate personal fitness goals. It leverages Next.js for its robust front-end functionality, Node.js for a performant backend, and MongoDB for scalable data storage. The application is designed to be both intuitive for users and extensible for future development.

## 📦 Features

|    | Feature                       | Description                                                                                                        |
|----|-----------------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔑 | **Secure User Authentication** | Provides a reliable and secure system for users to register and log in, protecting their data and personalizing their experience. |
| 🎯 | **Goal Setting**              | Enables users to define their specific fitness goals with clear targets and timeframes, allowing them to focus their efforts and track progress. |
| 📈 | **Progress Tracking**         | Facilitates the logging of workouts and activities to monitor progress against set goals. Users can record exercise type, duration, intensity, and calories burned.  |
| 📊 | **Visual Dashboards**        | Presents users with interactive and informative dashboards that visually represent their progress, highlighting trends and insights to motivate them. |
| 🤝 | **Social Sharing**            | Enables users to share their achievements, progress, and challenges with friends and communities within the app, fostering a sense of motivation and support. |
| ⚙️ | **Architecture**            | The codebase follows a modular architectural pattern with separate directories for different functionalities, ensuring easier maintenance and scalability.             |
| 📄 | **Documentation**          | The repository includes a README file that provides a detailed overview of the MVP, its dependencies, and usage instructions.|
| 🔗 | **Dependencies**            | The codebase relies on various external libraries and packages such as React, uuid, esbuild, and eslint, which are essential for building and styling the UI components, and handling external services.|
| 🧩 | **Modularity**              | The modular structure allows for easier maintenance and reusability of the code, with separate directories and files for different functionalities such as background, components, and content.|
| 🧪 | **Testing**                 | Implement unit tests using frameworks like Jest or React Testing Library to ensure the reliability and robustness of the codebase.       |
| ⚡️  | **Performance**              | The performance of the system can be optimized based on factors such as the browser and hardware being used. Consider implementing performance optimizations for better efficiency.|
| 🔐 | **Security**                | Enhance security by implementing measures such as input validation, data encryption, and secure communication protocols.|
| 🔀 | **Version Control**          | Utilizes Git for version control with GitHub Actions workflow files for automated build and release processes.|
| 🔌 | **Integrations**             | Interacts with browser APIs, external services through HTTP requests, and includes integrations with speech recognition and synthesis APIs.|
| 📶 | **Scalability**              | Design the system to handle increased user load and data volume, utilizing caching strategies and cloud-based solutions for better scalability.           |

## 📂 Structure

```text
packages/
  fitness-tracker/
    src/
      domain/
        goals/
          entities/
            Goal.ts 
          usecases/
            CreateGoal.ts
            UpdateGoal.ts
            DeleteGoal.ts
          repositories/
            GoalRepository.ts
        workouts/
          entities/
            Workout.ts
          usecases/
            CreateWorkout.ts
            UpdateWorkout.ts
            DeleteWorkout.ts
          repositories/
            WorkoutRepository.ts
        users/
          entities/
            User.ts
          usecases/
            CreateUser.ts
            UpdateUser.ts
            DeleteUser.ts
          repositories/
            UserRepository.ts
      infrastructure/
        database/
          prisma/
            schema.prisma
            migrations/
              [migrations]
          seed/
            seed.ts
        api/
          controllers/
            GoalController.ts
            WorkoutController.ts
            UserController.ts
          routes/
            goals.ts
            workouts.ts
            users.ts
          middleware/
            auth.ts
            errorHandler.ts
          services/
            GoalService.ts
            WorkoutService.ts
            UserService.ts
        authentication/
          strategies/
            Google.ts
            Facebook.ts
          services/
            AuthService.ts
      presentation/
        pages/
          api/
            auth/
              [...nextauth].ts
            goals/
              [id].ts
              route.ts
            workouts/
              [id].ts
              route.ts
            users/
              [id].ts
              route.ts
          (auth)/
            login/
              page.tsx
            register/
              page.tsx
          dashboard/
            page.tsx
          profile/
            page.tsx
          settings/
            page.tsx
        components/
          atoms/
            Button.tsx
            Input.tsx
            Typography.tsx
          molecules/
            FormField.tsx
            NavItem.tsx
          organisms/
            Header.tsx
            Footer.tsx
            Sidebar.tsx
          templates/
            DashboardLayout.tsx
            AuthLayout.tsx
        hooks/
          useAuth.ts
          useForm.ts
        services/
          api.ts
          auth.ts
        styles/
          globals.css
          theme.ts
        types/
          user.ts
          goal.ts
          workout.ts
          api.ts
        utils/
          formatters.ts
          validators.ts
      tests/
        unit/
          domain/
            goals/
              entities/
                Goal.test.ts
              usecases/
                CreateGoal.test.ts
                UpdateGoal.test.ts
                DeleteGoal.test.ts
              repositories/
                GoalRepository.test.ts
            workouts/
              entities/
                Workout.test.ts
              usecases/
                CreateWorkout.test.ts
                UpdateWorkout.test.ts
                DeleteWorkout.test.ts
              repositories/
                WorkoutRepository.test.ts
            users/
              entities/
                User.test.ts
              usecases/
                CreateUser.test.ts
                UpdateUser.test.ts
                DeleteUser.test.ts
              repositories/
                UserRepository.test.ts
          infrastructure/
            database/
              prisma/
                schema.prisma.test.ts
            api/
              controllers/
                GoalController.test.ts
                WorkoutController.test.ts
                UserController.test.ts
              services/
                GoalService.test.ts
                WorkoutService.test.ts
                UserService.test.ts
            authentication/
              strategies/
                Google.test.ts
                Facebook.test.ts
              services/
                AuthService.test.ts
          presentation/
            components/
              atoms/
                Button.test.tsx
              molecules/
                FormField.test.tsx
                NavItem.test.tsx
              organisms/
                Header.test.tsx
                Footer.test.tsx
                Sidebar.test.tsx
              templates/
                DashboardLayout.test.tsx
                AuthLayout.test.tsx
            hooks/
              useAuth.test.ts
              useForm.test.ts
            services/
              api.test.ts
              auth.test.ts
        integration/
          api/
            goals.test.ts
            workouts.test.ts
            users.test.ts
          authentication/
            google.test.ts
            facebook.test.ts
    scripts/
      build.sh
      start.sh
      test.sh
    .eslintrc.js
    .prettierrc
    tsconfig.json
    next.config.js
    .env.example
    package.json
    docs/
      architecture.md
      API.md
      developer-guide.md
      testing-guide.md
    .github/
      workflows/
        ci.yml
        deploy.yml 
```

## 💻 Installation

### 🔧 Prerequisites
- Node.js v18+
- npm 8+
- MongoDB Atlas account (free tier available)

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/fitness-goals-app-mvp.git
   cd fitness-goals-app-mvp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your database:
   - Create a new MongoDB Atlas cluster.
   - Create a new database within the cluster.
   - Create a new user with appropriate permissions for the database.
   - Obtain the connection string for the database.
   - Update `.env.example` to `.env` and fill in the `DATABASE_URL` environment variable with the connection string. 
4. Set up environment variables:
   - You'll also need to set up environment variables for Google and Facebook authentication if you plan to use those features.
   - Replace placeholders in `.env.example` with your actual Google and Facebook API keys.
   - Rename `.env.example` to `.env`.

## 🏗️ Usage

### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application:
   - Web interface: [http://localhost:3000](http://localhost:3000)
   - API endpoint: [http://localhost:3000/api](http://localhost:3000/api)

### ⚙️ Configuration
- The primary configuration file is `next.config.js`. This file includes settings for environment variables (development, testing, production), asset optimization, and routing configurations.
- You can customize the application's appearance in the `src/presentation/styles/theme.ts` file, which defines the color palette and typography.

### 📚 Examples
```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "securepass123"}'

# Response
{
  "id": "user123",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Create a new goal
curl -X POST http://localhost:3000/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"title": "Lose 10 Pounds", "target": 10, "deadline": "2024-12-31"}'

# Response
{
  "id": "goal123",
  "title": "Lose 10 Pounds",
  "target": 10,
  "deadline": "2024-12-31",
  "progress": 0
}
```

## 🌐 Hosting
### 🚀 Deployment Instructions
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy to Vercel:
   - You can deploy the app directly to Vercel by importing the project: [https://vercel.com/import/git](https://vercel.com/import/git).
   - Ensure that your environment variables are correctly configured in Vercel's settings.
3. Set up the database:
   - Create a new MongoDB Atlas cluster and configure the database connection settings in your Vercel environment variables.
   - Configure the Prisma client to connect to the Atlas cluster by specifying the database URL in your Vercel environment variables.

### 🔑 Environment Variables
- `DATABASE_URL`: Connection string for the MongoDB Atlas cluster.
- `NEXTAUTH_SECRET`:  Secret key used by NextAuth.js for session management.
- `NEXTAUTH_URL`:  The URL of your application. This is used for authentication callbacks.
- `NEXTAUTH_PROVIDER_GOOGLE_CLIENT_ID`:  Client ID for Google authentication.
- `NEXTAUTH_PROVIDER_GOOGLE_CLIENT_SECRET`:  Client secret for Google authentication.
- `NEXTAUTH_PROVIDER_FACEBOOK_APP_ID`:  App ID for Facebook authentication.
- `NEXTAUTH_PROVIDER_FACEBOOK_APP_SECRET`:  App secret for Facebook authentication.
- `SENTRY_DSN`:  The DSN for your Sentry project.

## 📜 API Documentation

### 🔍 Endpoints
- **POST /api/auth/register**
    - Description: Register a new user.
    - Body: `{ "email": string, "password": string }`
    - Response: `{ "id": string, "email": string, "token": string }`

- **POST /api/auth/login**
    - Description: Log in an existing user.
    - Body: `{ "email": string, "password": string }`
    - Response: `{ "id": string, "email": string, "token": string }`

- **POST /api/goals**
    - Description: Create a new fitness goal.
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "title": string, "target": number, "deadline": date }`
    - Response: `{ "id": string, "title": string, "target": number, "deadline": date, "progress": number }`

- **GET /api/goals**
    - Description: Get all goals for the current user.
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `[{ "id": string, "title": string, "target": number, "deadline": date, "progress": number }]`

- **GET /api/goals/:id**
    - Description: Get a specific goal by its ID.
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `{ "id": string, "title": string, "target": number, "deadline": date, "progress": number }`

- **PUT /api/goals/:id**
    - Description: Update a specific goal by its ID.
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "title": string, "target": number, "deadline": date }`
    - Response: `{ "id": string, "title": string, "target": number, "deadline": date, "progress": number }`

- **DELETE /api/goals/:id**
    - Description: Delete a specific goal by its ID.
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `{}`

- **POST /api/workouts**
    - Description: Log a new workout.
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "type": string, "duration": number, "intensity": string, "caloriesBurned": number, "date": date }`
    - Response: `{ "id": string, "type": string, "duration": number, "intensity": string, "caloriesBurned": number, "date": date }`

- **GET /api/workouts**
    - Description: Get all workouts for the current user.
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `[{ "id": string, "type": string, "duration": number, "intensity": string, "caloriesBurned": number, "date": date }]`

- **GET /api/workouts/:id**
    - Description: Get a specific workout by its ID.
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `{ "id": string, "type": string, "duration": number, "intensity": string, "caloriesBurned": number, "date": date }`

- **PUT /api/workouts/:id**
    - Description: Update a specific workout by its ID.
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "type": string, "duration": number, "intensity": string, "caloriesBurned": number, "date": date }`
    - Response: `{ "id": string, "type": string, "duration": number, "intensity": string, "caloriesBurned": number, "date": date }`

- **DELETE /api/workouts/:id**
    - Description: Delete a specific workout by its ID.
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `{}`

### 🔒 Authentication
1. Register a new user or log in using the `/api/auth/register` or `/api/auth/login` endpoints.
2. Upon successful registration or login, you will receive a JSON Web Token (JWT).
3. Include the JWT in the `Authorization` header of all subsequent API requests in the following format:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

### 📝 Examples
```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "securepass123"}'

# Response
{
  "id": "user123",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

# Create a new goal
curl -X POST http://localhost:3000/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"title": "Lose 10 Pounds", "target": 10, "deadline": "2024-12-31"}'

# Response
{
  "id": "goal123",
  "title": "Lose 10 Pounds",
  "target": 10,
  "deadline": "2024-12-31",
  "progress": 0
}

# Log a new workout
curl -X POST http://localhost:3000/api/workouts \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"type": "Running", "duration": 30, "intensity": "Moderate", "caloriesBurned": 300, "date": "2023-12-20"}'

# Response
{
  "id": "workout123",
  "type": "Running",
  "duration": 30,
  "intensity": "Moderate",
  "caloriesBurned": 300,
  "date": "2023-12-20"
}
```

## 📜 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: fitness-goals-app-mvp

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>