# 🧭 Pathfinder (Major Test) - System Architecture

This document outlines the high-level system architecture and data workflow for the **Pathfinder (Major Test)** project. The system uses a modern web stack to collect user responses, process them securely via AI, and return personalized university major recommendations.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL (Neon Serverless), Prisma ORM
- **Authentication:** Better-Auth
- **AI Integration:** Google Gemini API / OpenAI API

---

## 🏛️ System Components

### 1. Client Application (Frontend)

The user-facing application where the test is taken.

- **Role:** Manages the quiz state, collects user answers step-by-step, and handles the loading UI during AI processing.
- **Data Handling:** Compiles the 5 answers into a structured JSON array to send to the backend.

### 2. Backend Server (API Gateway)

The middleman that handles business logic and security.

- **Role:** Receives data from the frontend, validates it, and constructs a strict System Prompt for the AI.
- **Security:** Hides AI API keys and sanitizes user input to prevent prompt injection.

### 3. Database (PostgreSQL + Prisma)

The persistent storage layer.

- **Role:** Stores user account information and saves the AI-generated recommendation results so users can access their history later.

### 4. External AI Service (Gemini/OpenAI)

The decision engine.

- **Role:** Analyzes the prompt and user answers, then returns personalized major recommendations formatted strictly as a JSON object.

---

## 🔄 Data Workflow (The 5-Step Process)

1. **User Input (Client $\rightarrow$ Server):** When the user submits the 5th question, the Frontend sends a `POST` request to the Backend containing a JSON array of the user's selected answers.
2. **Validation & Prompting (Server):** The Backend receives the array, validates the payload, and wraps the answers inside a pre-defined "System Prompt". This prompt instructs the AI to act as a career counselor and demands the output to be in a specific JSON format.

3. **AI Processing (Server $\rightarrow$ AI $\rightarrow$ Server):** The Backend sends the constructed prompt to the AI API. The AI analyzes the data and responds with the recommended majors in the requested JSON structure.

4. **Database Storage (Server $\rightarrow$ Database):** The Backend parses the AI's JSON response and uses Prisma ORM to save the result in the PostgreSQL database, linking it to the specific User ID.

5. **Client Response (Server $\rightarrow$ Client):** The Backend sends the final parsed JSON data back to the Frontend. The Frontend then clears the loading state and dynamically renders the results into styled UI cards for the user to view.
