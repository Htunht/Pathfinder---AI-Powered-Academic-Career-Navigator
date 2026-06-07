Role: Act as an Expert Node.js, Express, and Prisma Backend Developer.

Task: Scaffold a Layered Architecture (Routes, Controllers, Services, Repositories) for a "Matchmaking API" in an Express.js backend. The API will evaluate a Grade-12 student's total matriculation score and quiz results against university major cutoffs stored in the database.

Context & Tech Stack:

Node.js with Express.js

Database: MongoDB using Prisma ORM (prisma.major)

Base Directory: /src

Requirements:
Please generate the exact code for the following 4 files. Ensure the logic separates database queries, business rules, and HTTP request handling cleanly.

1. src/repositories/majorRepository.js

Create a function getAllMajors() that queries all majors using prisma.major.findMany().

2. src/services/matchService.js

Create a function calculateMatch(totalScore, quizScores).

Fetch majors from the repository.

Extract the topCategory from the quizScores object (e.g., { TECH: 8, INFRASTRUCTURE: 4, ENERGY: 2, MATERIALS: 1 } -> returns "TECH").

Map over the majors to append two boolean properties: isEligible (totalScore >= major.cutoffMark) and isRecommended (major.category === topCategory).

Return an object grouping the results into: topMatches (eligible & recommended), otherEligible (eligible but not top recommendation), and ineligible (score below cutoff).

3. src/controllers/matchController.js

Create a getRecommendations(req, res) function.

Extract totalScore and quizScores from req.body. Add basic validation (return 400 if missing).

Call matchService.calculateMatch and return the payload as a 200 JSON response ({ success: true, data: matchResults }). Catch errors and return a 500 status.

4. src/routes/matchRoute.js

Set up an Express router.

Define a POST /recommendations route connected to the controller.

Output: Provide the complete file paths and the functional code for each of the 4 files so I can directly apply them to my project workspace.
