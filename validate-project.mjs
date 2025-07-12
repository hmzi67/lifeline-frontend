#!/usr/bin/env node

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execAsync = promisify(exec);

async function validateProject() {
  console.log("🔍 Validating Lifeline Project Structure...\n");

  const checks = {
    projectStructure: false,
    dependencies: false,
    database: false,
    apiConfig: false,
    clientConfig: false,
    environmentFiles: false,
  };

  // Check project structure
  try {
    const requiredFiles = [
      "package.json",
      "api/package.json",
      "client/package.json",
      "api/src/app.ts",
      "api/src/server.ts",
      "api/prisma/schema.prisma",
      "api/.env",
      "client/.env",
      "README.md",
    ];

    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`Missing required file: ${file}`);
      }
    }
    checks.projectStructure = true;
    console.log("✅ Project structure is valid");
  } catch (error) {
    console.error("❌ Project structure check failed:", error.message);
  }

  // Check dependencies
  try {
    await execAsync("npm list --depth=0 > /dev/null 2>&1");
    checks.dependencies = true;
    console.log("✅ Root dependencies are installed");
  } catch (error) {
    console.error("❌ Root dependencies check failed");
  }

  // Check API dependencies
  try {
    await execAsync("cd api && npm list --depth=0 > /dev/null 2>&1");
    console.log("✅ API dependencies are installed");
  } catch (error) {
    console.error("❌ API dependencies check failed");
  }

  // Check client dependencies
  try {
    await execAsync("cd client && npm list --depth=0 > /dev/null 2>&1");
    console.log("✅ Client dependencies are installed");
  } catch (error) {
    console.error("❌ Client dependencies check failed");
  }

  // Check database
  try {
    if (fs.existsSync("api/prisma/dev.db")) {
      checks.database = true;
      console.log("✅ SQLite database exists");
    } else {
      console.log(
        "⚠️  Database file not found, but this is OK for fresh setup"
      );
    }
  } catch (error) {
    console.error("❌ Database check failed:", error.message);
  }

  // Check API configuration
  try {
    const apiEnv = fs.readFileSync("api/.env", "utf8");
    if (apiEnv.includes("PORT=3001") && apiEnv.includes("DATABASE_URL=")) {
      checks.apiConfig = true;
      console.log("✅ API configuration is valid");
    }
  } catch (error) {
    console.error("❌ API configuration check failed:", error.message);
  }

  // Check client configuration
  try {
    const clientEnv = fs.readFileSync("client/.env", "utf8");
    if (clientEnv.includes("VITE_API_URL=http://localhost:3001/api")) {
      checks.clientConfig = true;
      console.log("✅ Client configuration is valid");
    }
  } catch (error) {
    console.error("❌ Client configuration check failed:", error.message);
  }

  // Check environment files
  try {
    const envFiles = [
      "api/.env",
      "client/.env",
      "api/.env.example",
      "client/.env.example",
    ];
    let allExist = true;
    for (const file of envFiles) {
      if (!fs.existsSync(file)) {
        allExist = false;
        console.error(`❌ Missing environment file: ${file}`);
      }
    }
    if (allExist) {
      checks.environmentFiles = true;
      console.log("✅ Environment files are present");
    }
  } catch (error) {
    console.error("❌ Environment files check failed:", error.message);
  }

  // Summary
  console.log("\n📊 Validation Summary:");
  console.log("======================");
  const totalChecks = Object.keys(checks).length;
  const passedChecks = Object.values(checks).filter(Boolean).length;

  for (const [check, passed] of Object.entries(checks)) {
    console.log(
      `${passed ? "✅" : "❌"} ${check.replace(/([A-Z])/g, " $1").toLowerCase()}`
    );
  }

  console.log(`\n📈 Score: ${passedChecks}/${totalChecks} checks passed`);

  if (passedChecks === totalChecks) {
    console.log("\n🎉 Project validation completed successfully!");
    console.log("\n🚀 To start development:");
    console.log("   npm run dev");
    console.log("\n🌐 Development URLs:");
    console.log("   Frontend: http://localhost:5174");
    console.log("   Backend:  http://localhost:3001/api");
    console.log("   Health:   http://localhost:3001/api/health");
  } else {
    console.log("\n⚠️  Some checks failed. Please review the issues above.");
  }
}

// Run validation
validateProject().catch((error) => {
  console.error("❌ Validation script failed:", error.message);
  process.exit(1);
});
