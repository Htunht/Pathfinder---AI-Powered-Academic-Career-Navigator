Role: Act as an Expert UI/UX Designer and Senior React Frontend Developer.

Task: Refactor the current React components (using Tailwind CSS) to shift the visual aesthetic from a "soft/generic" look to a "sharp, high-contrast, and modern engineering" aesthetic. The target audience is high school students applying for technical universities, so the UI must feel precise, authoritative, and data-driven.

Design Guidelines to Apply:

Remove Softness: Strip out all soft drop shadows (e.g., remove shadow-md, shadow-lg, shadow-xl) and overly rounded corners (e.g., remove rounded-xl, rounded-2xl, rounded-[20px]).

Embrace Sharpness & Contrast: Use sharp corners (rounded-sm or rounded-none). Implement flat designs with crisp, high-contrast 1px borders (e.g., border border-gray-200 for light mode, border border-gray-800 for dark mode).

Color Palette: Stick to a monochromatic base (black, white, grays) with high-contrast accent colors for primary buttons or specific major categories. Avoid muted pastel colors.

Typography: Ensure headings are bold and tightly tracked (e.g., tracking-tight). Use monospaced fonts for numbers, scores, and salaries to emphasize the "data/engineering" feel.

Component Specifics: > - Cards: Make them flat with distinct borders. If hover effects are needed, use a slight translation (hover:-translate-y-1) or a hard solid shadow (shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]) instead of blurry shadows.

Buttons: Sharp edges, solid background colors, and clear hover states.

Action: Please review the provided code snippet and refactor the Tailwind classes according to these guidelines.
