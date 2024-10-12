#!/bin/bash

# Build the frontend application using Next.js.
# This script uses the latest stable versions of the required packages.
# Ensure your environment variables are set correctly (e.g., in a .env file).

# Set the Next.js build directory.
BUILD_DIR="out"

# Install dependencies if not already installed.
npm install

# Run Next.js build.
next build

# Optionally, optimize build artifacts.
# For production builds, consider tools like esbuild for further optimization.
# You can also use Next.js's built-in optimization features (e.g., image optimization).

# Build the backend API.
# Assuming you're using Express.js, you can use the following command:
# npm run build:backend  # Replace this with your actual backend build script.

# Copy backend build artifacts to the appropriate directory.
# Ensure the backend build process outputs artifacts to a consistent location.
# cp -r backend/dist/  $BUILD_DIR/backend  # Replace with your actual backend build output path.

# Copy frontend build artifacts to the appropriate directory.
# Ensure the Next.js build process outputs artifacts to a consistent location.
cp -r $BUILD_DIR/public  $BUILD_DIR/

# Set up the database for production.
# For an MVP, you might use a simple solution like Firebase, a lightweight NoSQL database like MongoDB, or a cloud-based database service like AWS RDS.
# Ensure your database setup is aligned with your chosen database solution.
# This script assumes you're using MongoDB Atlas and have configured the connection string in your .env file.
# Configure Prisma to connect to your production database.
npx prisma generate
npx prisma db push

# Clean up the build directory.
# Removing unnecessary files can improve build size and performance.
rm -rf $BUILD_DIR/node_modules
rm -rf $BUILD_DIR/package-lock.json
rm -rf $BUILD_DIR/.next

# Optionally, generate a production-ready deployment artifact.
# Consider using a tool like Docker to package the application for deployment.
# docker build -t my-fitness-tracker .

# The script should exit with a code:
# 0 - Successful build
# 1 - Build failed
exit $?