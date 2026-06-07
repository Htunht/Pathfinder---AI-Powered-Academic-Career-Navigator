Role: Act as an Expert Node.js and MongoDB Developer.

Task: I need a database seeding script to populate my MongoDB database with the academic majors available in Technological Universities.

Context: I am building a "Career Pathfinder" app. The entrance eligibility for these majors is calculated based on the total score of 4 matriculation subjects. I need a Mongoose model for the Major and a script to insert the baseline mock data.

Requirements:

Create a Mongoose Schema Major with the following fields:

majorCode (String, required, unique)

name (String, required)

myanmarName (String, required)

cutoffMark (Number, required) - represents the minimum required score out of 400.

category (String, required)

Write a Node.js seed script (seedMajors.js) that connects to MongoDB and uses Major.insertMany() to insert the following combined list of 13 majors. Make sure to clear the existing Major collection before inserting to prevent duplicates.

Data to Insert (JSON format):
[
{ "majorCode": "CE", "name": "Civil Engineering", "myanmarName": "မြို့ပြအင်ဂျင်နီယာ", "cutoffMark": 279, "category": "Infrastructure" },
{ "majorCode": "ARCHI", "name": "Architecture", "myanmarName": "ဗိသုကာ", "cutoffMark": 275, "category": "Architecture" },
{ "majorCode": "IT", "name": "Computer Engineering & IT", "myanmarName": "ကွန်ပျူတာအင်ဂျင်နီယာနှင့် သတင်းအချက်အလက်နည်းပညာ", "cutoffMark": 269, "category": "Tech & Electronics" },
{ "majorCode": "EC", "name": "Electronic Engineering", "myanmarName": "အီလက်ထရောနစ်အင်ဂျင်နီယာ", "cutoffMark": 256, "category": "Tech & Electronics" },
{ "majorCode": "EP", "name": "Electrical Power Engineering", "myanmarName": "လျှပ်စစ်စွမ်းအားအင်ဂျင်နီယာ", "cutoffMark": 254, "category": "Process & Energy" },
{ "majorCode": "ME", "name": "Mechanical Engineering", "myanmarName": "စက်မှုအင်ဂျင်နီယာ", "cutoffMark": 246, "category": "Infrastructure" },
{ "majorCode": "MECHATRONIC", "name": "Mechatronic Engineering", "myanmarName": "မက္ကာထရိုနစ်အင်ဂျင်နီယာ", "cutoffMark": 240, "category": "Tech & Electronics" },
{ "majorCode": "PE", "name": "Petroleum Engineering", "myanmarName": "ရေနံအင်ဂျင်နီယာ", "cutoffMark": 260, "category": "Process & Energy" },
{ "majorCode": "CHEM", "name": "Chemical Engineering", "myanmarName": "ဓာတုအင်ဂျင်နီယာ", "cutoffMark": 250, "category": "Materials & Science" },
{ "majorCode": "COM", "name": "Communication Engineering", "myanmarName": "ဆက်သွယ်ရေးအင်ဂျင်နီယာ", "cutoffMark": 245, "category": "Tech & Electronics" },
{ "majorCode": "MET", "name": "Metallurgical Engineering", "myanmarName": "သတ္တုဗေဒအင်ဂျင်နီယာ", "cutoffMark": 235, "category": "Materials & Science" },
{ "majorCode": "MIN", "name": "Mining Engineering", "myanmarName": "သတ္တုတွင်းအင်ဂျင်နီယာ", "cutoffMark": 230, "category": "Infrastructure" },
{ "majorCode": "TEX", "name": "Textile Engineering", "myanmarName": "အထည်အလိပ်အင်ဂျင်နီယာ", "cutoffMark": 225, "category": "Materials & Science" }
]
Output: Please output the complete Mongoose schema and the seedMajors.js script. Make the code clean, well-commented, and ready to execute.
