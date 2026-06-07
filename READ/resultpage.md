Role: Expert React & Tailwind CSS Developer.

Task: Integrate the "AI Career Mentor" section into the `ResultsPage.jsx` component.

Instructions:

1. Locate the top of the results section (before the Major cards list).
2. Create a conditional rendering block: `{results.aiInsight && ( ... )}`.
3. Design the AI Mentor Box with the following "Gamified / Duolingo-style" rules:
   - Background: Solid white (`bg-white`).
   - Border: Thick green border (`border-2 border-green-500`).
   - Shadow: Solid hard-edged 3D shadow (`shadow-[0_6px_0_#22c55e]`).
   - Corners: Highly rounded (`rounded-[2rem]`).
   - Layout: Use relative positioning with an overflow-hidden container. Add a subtle green decorative circle (`bg-green-50`) in the bottom-right corner as a background element.
4. Content inside the box:
   - Header: A small badge or icon with a 🧭 emoji, and the title "AI Career Mentor" in bold slate text.
   - Body: Display the `{results.aiInsight}` text using a slate-600 color, with a semi-bold weight (`font-semibold`) and professional leading (`leading-relaxed`).
5. Ensure the component is responsive and has proper padding (`p-6` to `p-10`).

Goal: Make the AI Insight look like the most important and welcoming part of the results page.
