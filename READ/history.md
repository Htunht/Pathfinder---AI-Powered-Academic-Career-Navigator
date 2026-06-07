Role: Expert React & Full-Stack Developer.

Task: Implement a "Test History" feature in the app.

Logic Requirements:

1. Every time a user gets a result from the backend, automatically save that result object (with scores and aiInsight) to the browser's `localStorage` under a key named "pathfinder_history".
2. Ensure the history stores an array of results (max 5 records). Always prepend the new result to the top.
3. Add a "History" tab or a side-drawer in the UI where the user can view these past attempts.
4. When a user clicks on a previous attempt from the list, the UI should instantly update to show those old results (use state management to toggle between 'current' and 'historical' view).

UI Rules:

- Add a "History" button in the Top Navbar.
- The history list should show cards with "Date" and "Score".
- Maintain the consistent "Gamified/Green & White" design system (Thick borders, Solid shadows, Rounded corners).

Code Guidelines:

- Use `useEffect` to save to localStorage whenever `results` state updates.
- Keep the UI clean and simple.
