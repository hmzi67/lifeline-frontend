#!/bin/bash

# Authentication Test Script
# This script tests all the authentication endpoints

BASE_URL="http://localhost:3000/api/auth"
echo "🧪 Testing Lifeline Authentication API"
echo "======================================="

# Test data
TEST_EMAIL="john.doe@example.com"
TEST_PASSWORD="testPassword123"
TEST_NAME="John Doe"

echo ""
echo "📝 Test Data:"
echo "Name: $TEST_NAME"
echo "Email: $TEST_EMAIL"
echo "Password: $TEST_PASSWORD"
echo ""

# 1. Test Signup
echo "1️⃣ Testing Signup..."
SIGNUP_RESPONSE=$(curl -s -X POST "$BASE_URL/signup" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$TEST_NAME\",
    \"email\": \"$TEST_EMAIL\",
    \"password\": \"$TEST_PASSWORD\"
  }")

echo "Response: $SIGNUP_RESPONSE"

# Extract access token from signup response
ACCESS_TOKEN=$(echo $SIGNUP_RESPONSE | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

if [ ! -z "$ACCESS_TOKEN" ]; then
    echo "✅ Signup successful! Access token received."
    echo "Token: ${ACCESS_TOKEN:0:20}..."
else
    echo "❌ Signup failed or user already exists. Trying login..."
fi

echo ""

# 2. Test Login
echo "2️⃣ Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEST_EMAIL\",
    \"password\": \"$TEST_PASSWORD\"
  }")

echo "Response: $LOGIN_RESPONSE"

# Extract access token from login response if signup failed
if [ -z "$ACCESS_TOKEN" ]; then
    ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)
fi

if [ ! -z "$ACCESS_TOKEN" ]; then
    echo "✅ Login successful! Access token received."
    echo "Token: ${ACCESS_TOKEN:0:20}..."
else
    echo "❌ Login failed!"
    exit 1
fi

echo ""

# 3. Test Get Current User
echo "3️⃣ Testing Get Current User..."
USER_RESPONSE=$(curl -s -X GET "$BASE_URL/me" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "Response: $USER_RESPONSE"

if [[ $USER_RESPONSE == *"\"success\":true"* ]]; then
    echo "✅ Get current user successful!"
else
    echo "❌ Get current user failed!"
fi

echo ""

# 4. Test Invalid Login
echo "4️⃣ Testing Invalid Login..."
INVALID_LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEST_EMAIL\",
    \"password\": \"wrongpassword\"
  }")

echo "Response: $INVALID_LOGIN_RESPONSE"

if [[ $INVALID_LOGIN_RESPONSE == *"\"success\":false"* ]]; then
    echo "✅ Invalid login correctly rejected!"
else
    echo "❌ Invalid login test failed!"
fi

echo ""

# 5. Test Logout
echo "5️⃣ Testing Logout..."
LOGOUT_RESPONSE=$(curl -s -X POST "$BASE_URL/logout" \
  -H "Content-Type: application/json")

echo "Response: $LOGOUT_RESPONSE"

if [[ $LOGOUT_RESPONSE == *"\"success\":true"* ]]; then
    echo "✅ Logout successful!"
else
    echo "❌ Logout failed!"
fi

echo ""
echo "🎉 Authentication tests completed!"
echo "======================================="
