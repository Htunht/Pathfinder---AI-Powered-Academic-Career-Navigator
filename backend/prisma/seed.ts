import prisma from "../src/lib/prisma";

const majorsData = [
  { "majorCode": "CE", "name": "Civil Engineering", "myanmarName": "မြို့ပြအင်ဂျင်နီယာ", "cutoffMark": 279, "category": "Infrastructure" },
  { "majorCode": "ARCHI", "name": "Architecture", "myanmarName": "ဗိသုကာ", "cutoffMark": 275, "category": "Architecture" },
  { "majorCode": "IT", "name": "Computer Engineering & IT", "myanmarName": "ကွန်ပျူတာအင်ဂျင်နီယာနှင့် သတင်းအချက်အလက်နည်းပညာ", "cutoffMark": 269, "category": "Tech & Electronics" },
  { "majorCode": "EC", "name": "Electronic Engineering", "myanmarName": "အီလက်ထရောနစ်အင်ဂျင်နီယာ", "cutoffMark": 256, "category": "Tech & Electronics" },
  { "majorCode": "EP", "name": "Electrical Power Engineering", "myanmarName": "လျှပ်စစ်စွမ်းအားအင်ဂျင်နီယာ", "cutoffMark": 254, "category": "Process & Energy" },
  { "majorCode": "ME", "name": "Mechanical Engineering", "myanmarName": "စက်မှုအင်ဂျင်နီယာ", "cutoffMark": 246, "category": "Infrastructure" },
  { "majorCode": "MECHATRONIC", "name": "Mechatronic Engineering", "myanmarName": "မက္ကာထရိုနစ်အင်ဂျင်နီယာ", "cutoffMark": 240, "category": "Tech & Electronics" },
  { "majorCode": "PE", "name": "Petroleum Engineering", "myanmarName": "ရေနံအင်ဂျင်နီယာ", "cutoffMark": 260, "category": "Process & Energy" },
  { "majorCode": "COM", "name": "Communication Engineering", "myanmarName": "ဆက်သွယ်ရေးအင်ဂျင်နီယာ", "cutoffMark": 245, "category": "Tech & Electronics" },
  { "majorCode": "MIN", "name": "Mining Engineering", "myanmarName": "သတ္တုတွင်းအင်ဂျင်နီယာ", "cutoffMark": 230, "category": "Infrastructure" }
];

async function main() {
  console.log("Start seeding majors...");

  // 1. Clear existing major records to prevent duplicate key issues
  await prisma.major.deleteMany();
  console.log("Cleared existing majors table.");

  // 2. Bulk insert data
  await prisma.major.createMany({
    data: majorsData,
  });

  console.log("Successfully seeded 13 academic majors.");
}

main()
  .catch((e) => {
    console.error("Error during database seed execution:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
