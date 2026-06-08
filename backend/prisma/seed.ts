import prisma from "../src/lib/prisma";

const majorsData = [
  {
    "majorCode": "CE",
    "name": "Civil Engineering",
    "myanmarName": "မြို့ပြအင်ဂျင်နီယာ",
    "cutoffMark": 279,
    "category": "Infrastructure",
    "description": "မြို့ပြအင်ဂျင်နီယာဘာသာရပ်သည် လမ်းများ၊ တံတားများ၊ အဆောက်အအုံများနှင့် ဆည်မြောင်းများကဲ့သို့သော အခြေခံအဆောက်အအုံများကို ဒီဇိုင်းဆွဲခြင်း၊ တည်ဆောက်ခြင်းနှင့် ထိန်းသိမ်းခြင်းကို အဓိကသင်ကြားပေးသော ပညာရပ်ဖြစ်သည်။",
    "topSkills": ["Structural Analysis", "AutoCAD & Revit", "Project Management", "Geotechnical Engineering"],
    "seniorTips": "လက်တွေ့လုပ်ငန်းခွင်ဆင်းရတာ စိတ်ဝင်စားဖို့ကောင်းသလို၊ သီအိုရီပိုင်း တွက်ချက်မှုတွေကိုလည်း အခြေခံပိုင်ပိုင်နိုင်နိုင် လေ့လာထားဖို့ အကြံပြုချင်ပါတယ်။ Site visit တွေ သေချာလိုက်ခဲ့ပါ!",
    "activitiesPhotos": ["/images/civil_engineering_activity.png"],
    "careerRoadmap": ["Year 1: Foundation of Math & Mechanics", "Year 2: Surveying & Fluid Dynamics", "Year 3: Concrete & Structural Design", "Year 4: Geotechnical & Transport Engineering", "Year 5: Graduation Thesis & Internships"]
  },
  {
    "majorCode": "ARCHI",
    "name": "Architecture",
    "myanmarName": "ဗိသုကာ",
    "cutoffMark": 275,
    "category": "Architecture",
    "description": "ဗိသုကာပညာရပ်သည် အဆောက်အအုံများ၏ အလှအပဆိုင်ရာ ဒီဇိုင်းပုံစံများ ရေးဆွဲခြင်း၊ နေရာလွတ်စီမံခန့်ခွဲမှုနှင့် ရေရှည်တည်တံ့သော ဗိသုကာပညာရပ်များကို ပေါင်းစပ်သင်ယူရသည့် အနုပညာနှင့် သိပ္ပံပညာရပ် ဖြစ်သည်။",
    "topSkills": ["3D Modeling", "Spatial Design", "SketchUp & Lumion", "Architectural Drawing"],
    "seniorTips": "ဒီဇိုင်းဆွဲတဲ့အခါ တီထွင်ဖန်တီးနိုင်စွမ်းရှိဖို့ လိုသလို ကျောင်းက Studio တွေမှာ သူငယ်ချင်းတွေနဲ့ ညမအိပ်ဘဲ ပရောဂျက်လုပ်ရတဲ့အတွေ့အကြုံက ဘဝတစ်လျှောက်လုံးအတွက် အမှတ်တရဖြစ်စေမှာပါ။",
    "activitiesPhotos": ["/images/architecture_activity.png"],
    "careerRoadmap": ["Year 1: Architectural Sketching & Forms", "Year 2: History of Architecture & Space Planning", "Year 3: Structural Building Technology", "Year 4: Urban Planning & Landscape Design", "Year 5: Thesis Design Studio"]
  },
  {
    "majorCode": "CEIT",
    "name": "Computer Engineering & Information Technology (CEIT)",
    "myanmarName": "ကွန်ပျူတာအင်ဂျင်နီယာနှင့် သတင်းအချက်အလက်နည်းပညာ",
    "cutoffMark": 269,
    "category": "Tech & Electronics",
    "description": "ကွန်ပျူတာဟာ့ဒ်ဝဲလ်၊ ဆော့ဖ်ဝဲလ်စနစ်များနှင့် ကွန်ရက်နည်းပညာရပ်များကို ပေါင်းစပ်လေ့လာသည့် ဘာသာရပ်ဖြစ်သည်။ ကျောင်းသားများသည် ဆော့ဖ်ဝဲလ်တည်ဆောက်မှု၊ ဆိုက်ဘာလုံခြုံရေး၊ ဒေတာဘေ့စ်နှင့် ဝဘ်နည်းပညာများကို သင်ယူရသည်။",
    "topSkills": ["Web Development", "Data Structures & Algorithms", "Database Management", "Embedded Systems"],
    "seniorTips": "ပရိုဂရမ်းမင်းကို စာအုပ်ထဲကတင်မကဘဲ လက်တွေ့ project တွေ ကိုယ်တိုင်ရေးကြည့်ဖို့ တိုက်တွန်းချင်ပါတယ်။ Github သုံးတတ်အောင် စောစောလေ့လာထားပါ။",
    "activitiesPhotos": ["/images/tech_lab_activity.png"],
    "careerRoadmap": ["Year 1: Introduction to Programming (Python/C++)", "Year 2: Data Structures & OOP", "Year 3: Operating Systems & Computer Networks", "Year 4: Software Engineering & Cybersecurity", "Year 5: Final Year Capstone Project"]
  },
  {
    "majorCode": "EC",
    "name": "Electronics Engineering (EC)",
    "myanmarName": "အီလက်ထရောနစ်အင်ဂျင်နီယာ",
    "cutoffMark": 256,
    "category": "Tech & Electronics",
    "description": "အီလက်ထရောနစ်ပတ်လမ်းများ၊ ဆီမီးကွန်ဒက်တာကိရိယာများ၊ အချက်ပြလှိုင်းများခွဲခြမ်းစိတ်ဖြာမှုနှင့် မြှုပ်နှံစနစ်များ (Embedded Systems) ကို အဓိကထားလေ့လာသော နည်းပညာရပ်ဖြစ်သည်။",
    "topSkills": ["Circuit Design", "Embedded Systems", "PCB Design", "Microcontrollers"],
    "seniorTips": "Arduino သို့မဟုတ် Raspberry Pi နဲ့ ကိုယ်တိုင် အိမ်မှာ hardware ပရောဂျက်လေးတွေ လုပ်ကြည့်ပါ။ Circuit design ဆွဲတတ်ဖို့ အရမ်းအရေးကြီးပါတယ်။",
    "activitiesPhotos": ["/images/tech_lab_activity.png"],
    "careerRoadmap": ["Year 1: Basic Electrical Circuits", "Year 2: Analog & Digital Electronics", "Year 3: Microprocessor Systems", "Year 4: Signal Processing & VLSI Design", "Year 5: Embedded Systems Capstone Project"]
  },
  {
    "majorCode": "EP",
    "name": "Electrical Power Engineering (EP)",
    "myanmarName": "လျှပ်စစ်စွမ်းအားအင်ဂျင်နီယာ",
    "cutoffMark": 254,
    "category": "Process & Energy",
    "description": "လျှပ်စစ်စွမ်းအားထုတ်လုပ်ခြင်း၊ ပို့လွှတ်ခြင်း၊ ဖြန့်ဖြူးခြင်းနှင့် လျှပ်စစ်ဓာတ်အားစနစ်များ ဘေးကင်းလုံခြုံမှုရှိစေရန် ထိန်းချုပ်ခြင်းဆိုင်ရာ နည်းပညာရပ်များကို သင်ယူရသော ဘာသာရပ် ဖြစ်သည်။",
    "topSkills": ["Power Grid Analysis", "Electrical Safety", "Power Electronics", "Renewable Energy"],
    "seniorTips": "High voltage စနစ်တွေနဲ့ အလုပ်လုပ်ရမှာဖြစ်လို့ Safety protocol တွေကို စနစ်တကျ သင်ယူထားဖို့ လိုအပ်ပါတယ်။ လျှပ်စစ်ဓာတ်အားပေးစက်ရုံ လေ့လာရေးခရီးစဉ်တွေကို မလွတ်တမ်းလိုက်ပါ။",
    "activitiesPhotos": ["/images/tech_lab_activity.png"],
    "careerRoadmap": ["Year 1: Electrical Fundamentals", "Year 2: AC/DC Machines & Power Systems", "Year 3: High Voltage Engineering", "Year 4: Renewable Power Integration", "Year 5: Power Transmission Thesis"]
  },
  {
    "majorCode": "ME",
    "name": "Mechanical Engineering",
    "myanmarName": "စက်မှုအင်ဂျင်နီယာ",
    "cutoffMark": 246,
    "category": "Infrastructure",
    "description": "စက်ပစ္စည်းကိရိယာများနှင့် အပူစွမ်းအင်သုံးစနစ်များ၏ ဒီဇိုင်း၊ ထုတ်လုပ်မှုနှင့် ထိန်းသိမ်းမှုတို့ကို အဓိကထားသည့် အကျယ်ပြန့်ဆုံးသော နယ်ပယ်တစ်ခု ဖြစ်သည်။",
    "topSkills": ["SolidWorks & CAD", "Thermodynamics", "Fluid Mechanics", "Machine Design"],
    "seniorTips": "Physics နဲ့ Math အခြေခံ ကောင်းဖို့လိုပါတယ်။ လက်တွေ့ ကားအင်ဂျင်တွေ၊ စက်ရုံတွေမှာ စက်ပစ္စည်းတွေ ဘယ်လိုအလုပ်လုပ်လဲဆိုတာကို သေချာလေ့လာဆန်းစစ်ပါ။",
    "activitiesPhotos": ["/images/civil_engineering_activity.png"],
    "careerRoadmap": ["Year 1: Engineering Graphics & CAD", "Year 2: Mechanics of Materials & Fluid Dynamics", "Year 3: Machine Element Design", "Year 4: HVAC & Control Systems", "Year 5: Mechanical Design Thesis"]
  },
  {
    "majorCode": "MC",
    "name": "Mechatronics Engineering (MC)",
    "myanmarName": "မက္ကာထရိုနစ်အင်ဂျင်နီယာ",
    "cutoffMark": 240,
    "category": "Tech & Electronics",
    "description": "စက်မှုအင်ဂျင်နီယာပညာ၊ အီလက်ထရောနစ်နှင့် ကွန်ပျူတာထိန်းချုပ်မှုစနစ်များကို ပေါင်းစပ်ထားသော စက်ရုပ်နည်းပညာနှင့် အလိုအလျောက်ထိန်းချုပ်မှုစနစ်များဆိုင်ရာ နวัตกรรมဘာသာရပ် ဖြစ်သည်။",
    "topSkills": ["Robotics & Automation", "PLC Programming", "Control Systems", "Sensor Technology"],
    "seniorTips": "Hardware နဲ့ Software နှီးနွှယ်နေတဲ့ ဘာသာရပ်ဖြစ်လို့ နှစ်ခုစလုံးကို ဟန်ချက်ညီညီ လေ့လာပါ။ Robot တွေ ကိုယ်တိုင် တည်ဆောက်ပြီး စမ်းသပ်ကြည့်ပါ။",
    "activitiesPhotos": ["/images/tech_lab_activity.png"],
    "careerRoadmap": ["Year 1: Basic Electronics & Mechanical CAD", "Year 2: Digital Systems & Microcontrollers", "Year 3: Sensors and Actuators & Dynamics", "Year 4: Robotics & Automation (PLC)", "Year 5: Robotic Prototype Graduation Project"]
  }
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

  console.log("Successfully seeded 7 academic majors.");
}

main()
  .catch((e) => {
    console.error("Error during database seed execution:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
