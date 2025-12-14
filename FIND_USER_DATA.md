# 🔍 How to Find Your User Data in MongoDB Compass

## ⚠️ Important: You're Looking in the Wrong Collection!

You're currently viewing the **"todos"** collection, but user data is stored in the **"users"** collection!

## 📍 Steps to Find Your User Data:

### 1. In MongoDB Compass:

1. **Look at the left sidebar** - you should see your database (likely "test")
2. **Expand the database** (click on it)
3. **Look for "users" collection** (NOT "todos")
4. **Click on "users"** collection
5. You should see your registered users there!

### 2. Check Your Server Console:

When you register a user, you should see logs like:
```
✅ MongoDB connected successfully
📊 Database name: test
📝 Creating user in database: { email: 'durga@gmail.com', ... }
✅ User created successfully in database: { id: '...', email: 'durga@gmail.com', collection: 'users' }
```

### 3. Use the Test Endpoint:

Visit this URL in your browser:
```
http://localhost:3000/api/test-db
```

This will show you:
- Which database you're connected to
- All collections in that database
- How many users are stored
- Sample user data

### 4. Check Database Name:

The database name depends on your connection string:
- If `MONGODB_URI=mongodb://localhost:27017/test` → Database is **"test"**
- If `MONGODB_URI=mongodb://localhost:27017/myapp` → Database is **"myapp"**
- If no database name is specified, it defaults to **"test"**

## 🎯 Quick Checklist:

- [ ] Open MongoDB Compass
- [ ] Connect to `localhost:27017`
- [ ] Find your database (likely "test")
- [ ] Look for **"users"** collection (NOT "todos")
- [ ] Click on "users" collection
- [ ] You should see your registered users!

## 📊 What You Should See:

In the "users" collection, each document looks like:
```json
{
  "_id": ObjectId("..."),
  "email": "durga@gmail.com",
  "password": "$2a$10$...",  // Hashed password
  "role": "USER",
  "createdAt": ISODate("2024-..."),
  "updatedAt": ISODate("2024-...")
}
```

