Role: Act as a Senior React Developer and UX/UI Designer.

Task: Create a highly interactive and engaging QuizAssessment functional component in React using Tailwind CSS. This component will handle a 15-question career aptitude test.

Core Functionality & State Management:

Use useState to track the currentQuestionIndex (starts at 0).

Use useState to track the scores object: { INFRASTRUCTURE: 0, TECH: 0, ENERGY: 0, MATERIALS: 0 }.

Create a handleAnswerClick(category) function that increments the score of the selected category and advances to the next question.

When the 15th question is answered, the component should not advance but instead call a prop onComplete(scores) to pass the final data back to the parent component.

Calculate and display a Progress Bar at the top: ((currentQuestionIndex + 1) / totalQuestions) \* 100.

Mock Data: Include a constant array of 3 mock questions (following the 4-category option structure) inside the file just so the component can be rendered and tested immediately. I will replace them with the full 15 questions later.

Aesthetic & UI Guidelines (High-Contrast Cinematic Style):

Theme: Dark mode by default. Use a deep, dark background (e.g., bg-[#0a0a0a] or bg-zinc-950).

Cards & Typography: Use crisp, high-contrast white text for the questions. Make the typography bold and cinematic.

Options/Buttons: The answer options should be large, full-width, clickable areas. Use sharp 1px borders (border-zinc-800). On hover or active state, apply a glowing high-contrast accent (e.g., a sharp white border hover:border-white or a subtle electric blue accent) rather than soft generic shadows.

Progress Bar: Make the progress bar sleek and minimalistic (e.g., a 2px tall bright white or neon line spanning across the top of the dark container).

Animations: Include smooth transitions for rendering the next question (e.g., a quick fade-in using generic Tailwind animate-fade-in or Framer Motion if you assume it's available, otherwise stick to Tailwind transitions).

Output: Provide the complete, clean code for QuizAssessment.jsx
