#!/bin/bash

# This script is used to run the unit and integration tests for the Fitness Tracker MVP application.

# Install dependencies for testing
npm install

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Exit with appropriate code:
# 0 - Tests passed
# 1 - Tests failed
exit $?