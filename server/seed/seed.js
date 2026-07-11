const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const mongoose = require("mongoose");
const User = require("../models/User");
const Application = require("../models/Application");
const Interview = require("../models/Interview");

const usersData = require("./data/users.json");
const applicationsData = require("./data/applications.json");
const interviewsData = require("./data/interviews.json");

const SEED_EMAILS = usersData.map((u) => u.email);

async function connect() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set. Copy server/.env.example to server/.env first.");
  }
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  console.log(`Connected: ${mongoose.connection.host}`);
}

async function wipeExistingSeedData() {
  const existingUsers = await User.find({ email: { $in: SEED_EMAILS } }).select("_id");
  const userIds = existingUsers.map((u) => u._id);
  if (userIds.length === 0) return;

  await Interview.deleteMany({ user: { $in: userIds } });
  await Application.deleteMany({ user: { $in: userIds } });
  await User.deleteMany({ _id: { $in: userIds } });
  console.log(`Cleared previous seed data for ${userIds.length} test user(s).`);
}

async function seedUsers() {
  const emailToUser = {};
  for (const userData of usersData) {
    const user = await User.create(userData); // one at a time so the pre-save hash hook runs
    emailToUser[user.email] = user;
  }
  console.log(`Seeded ${Object.keys(emailToUser).length} users.`);
  return emailToUser;
}

async function seedApplications(emailToUser) {
  const refToApplication = {};
  for (const appData of applicationsData) {
    const { ref, userEmail, ...fields } = appData;
    const user = emailToUser[userEmail];
    if (!user) { console.warn(`Skipping application "${ref}" — unknown userEmail ${userEmail}`); continue; }
    refToApplication[ref] = await Application.create({ ...fields, user: user._id });
  }
  console.log(`Seeded ${Object.keys(refToApplication).length} applications.`);
  return refToApplication;
}

async function seedInterviews(emailToUser, refToApplication) {
  let count = 0;
  for (const interviewData of interviewsData) {
    const { userEmail, applicationRef, ...fields } = interviewData;
    const user = emailToUser[userEmail];
    const application = refToApplication[applicationRef];
    if (!user || !application) { console.warn(`Skipping interview for "${applicationRef}"`); continue; }
    await Interview.create({ ...fields, user: user._id, application: application._id });
    count += 1;
  }
  console.log(`Seeded ${count} interviews.`);
}

async function verifyCrossUserIsolation(emailToUser) {
  const [userA, userB] = Object.values(emailToUser);
  if (!userA || !userB) return;

  const userAApps = await Application.find({ user: userA._id });
  const leaked = userAApps.filter((app) => String(app.user) !== String(userA._id));
  const crossCount = await Application.countDocuments({
    user: userB._id,
    _id: { $in: userAApps.map((a) => a._id) },
  });

  if (leaked.length > 0 || crossCount > 0) {
    throw new Error("Cross-user data isolation check FAILED.");
  }
  console.log(`Cross-user isolation verified: ${userA.email} has ${userAApps.length} application(s), none visible under ${userB.email}.`);
}

async function run() {
  try {
    await connect();
    await wipeExistingSeedData();
    const emailToUser = await seedUsers();
    const refToApplication = await seedApplications(emailToUser);
    await seedInterviews(emailToUser, refToApplication);
    await verifyCrossUserIsolation(emailToUser);

    console.log("\nSeed complete. Test credentials:");
    usersData.forEach((u) => console.log(`  ${u.email} / ${u.password}`));
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();