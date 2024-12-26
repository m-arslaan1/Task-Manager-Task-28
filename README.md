# Integrated To-Do List App

This project is a full-stack To-Do List application with a React frontend and an Express backend. The frontend is built using Vite, and the backend uses MongoDB for data storage.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Setup

### Backend

1. Navigate to the `backend` directory:
   ```sh
   cd backend
    ```
2. Install the dependencies:
   ```sh
   npm install
    ```
3. Create a .env file in the backend directory with the following content:
   ```sh
   PORT=4500
   DB_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
    ```sh
    npm start
    ```
    This will start the Express server on port 4500.

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a .env file in the frontend directory with the following content:

    ```sh
    VITE_API_URL=https://task-manager-task-28.onrender.com/api/tasks
    ```

4. Start the frontend development server:

    ```sh
    npm run dev
    ```

### Running the Application
1. Ensure that both the backend and frontend servers are running.
2. Open your browser and navigate to https://task-manager-0001.netlify.app to view the application.
3. You can interact with the application by adding, editing, and deleting tasks.

### Challenges and Solutions
Challenge 1: CORS Issues

Problem: The frontend and backend servers are running on different ports, which can lead to CORS (Cross-Origin Resource Sharing) issues.

Solution: I configured CORS in the backend server to allow requests from the frontend server. This was done using the cors middleware in Express:
```sh
app.use(cors({
  origin: 'https://task-manager-0001.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Challenge 2: Environment Variables

Problem: Managing environment variables for both the frontend and backend.

Solution: We created separate .env files for the frontend and backend to store environment-specific configurations. The backend uses dotenv to load environment variables, and the frontend uses Vite's built-in support for environment variables.

Challenge 3: State Management in React

Problem: Managing the state of tasks in the React frontend, especially when dealing with CRUD operations.

Solution: We used React's useState and useEffect hooks to manage the state of tasks. We also created helper functions in Axios.js to handle API requests for creating, reading, updating, and deleting tasks.

Conclusion
This project demonstrates a simple yet effective way to build a full-stack application using modern web development tools and practices. By addressing common challenges such as CORS issues and state management, we were able to create a seamless and integrated To-Do List application.
