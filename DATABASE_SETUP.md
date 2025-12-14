# Database Setup Guide

## 📋 Prerequisites

1. MongoDB installed locally OR
2. MongoDB Atlas account (free tier available)

## 🔧 Setup Instructions

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier M0)
4. Create a database user (username and password)
5. Whitelist your IP address (or use `0.0.0.0/0` for development)
6. Click "Connect" → "Connect your application"
7. Copy the connection string

### Option 2: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/next-js-app`

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority

# Or for local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/next-js-app

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Node Environment
NODE_ENV=development
```

## 🔐 Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## ✅ Verify Database Connection

1. Start your development server: `npm run dev`
2. Check the console for: `✅ MongoDB connected successfully`
3. Try registering a new user
4. Check your MongoDB database - you should see the user document

## 📊 Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  email: String (unique, lowercase, required),
  password: String (hashed with bcrypt, required),
  role: String (enum: ["USER", "ADMIN"], default: "USER"),
  resetToken: String (optional),
  resetTokenExpiry: Date (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🔍 Viewing Data

### Using MongoDB Compass (GUI)
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. Browse your database and collections

### Using MongoDB Shell
```bash
mongosh "your-connection-string"
use your-database-name
db.users.find()
```

## 🛠️ Troubleshooting

### Connection Error
- Check if MONGODB_URI is set correctly
- Verify MongoDB is running (if local)
- Check network/firewall settings (if Atlas)
- Ensure IP is whitelisted (if Atlas)

### User Already Exists Error
- This is expected if email is already registered
- Try logging in instead of registering

### Password Not Stored
- Passwords are hashed with bcrypt (never stored in plain text)
- This is a security feature, not a bug

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

