# How to Verify Data is Stored in Database

## 🔍 Quick Verification Steps

### 1. Check Server Console Logs

When you register a user, you should see these logs in your terminal:

```
✅ MongoDB connected successfully
📊 Database name: your-database-name
📝 Creating user in database: { email: 'user@example.com', role: 'USER', database: 'your-db' }
✅ User created successfully in database: { id: '...', email: 'user@example.com', ... }
```

### 2. Test Database Connection

Visit this URL in your browser:
```
http://localhost:3000/api/test-db
```

This will show you:
- Database name
- Collection names
- Number of users stored
- Sample user data

### 3. Check MongoDB Compass

1. **Open MongoDB Compass**
2. **Look for the database** specified in your `MONGODB_URI`
   - If your connection string is `mongodb://localhost:27017/test`, look in the **"test"** database
   - If your connection string is `mongodb://localhost:27017/myapp`, look in the **"myapp"** database
   - If no database name is specified, it defaults to **"test"**

3. **Find the "users" collection**
   - Mongoose automatically creates a collection named **"users"** (plural, lowercase)
   - Click on the **"users"** collection
   - You should see your registered users there

### 4. What Data is Stored?

Each user document looks like this:

```json
{
  "_id": ObjectId("..."),
  "email": "user@example.com",
  "password": "$2a$10$hashedpassword...",  // Hashed, never plain text
  "role": "USER",
  "createdAt": ISODate("2024-01-01T00:00:00.000Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00.000Z"),
  "__v": 0
}
```

## 🔧 Troubleshooting

### Data Not Appearing?

1. **Check your connection string** in `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   ```
   Make sure the database name matches what you're looking at in Compass.

2. **Check server console** for connection errors:
   - Should see: `✅ MongoDB connected successfully`
   - If you see errors, check your MongoDB is running

3. **Verify registration was successful**:
   - Check browser console for errors
   - Check Network tab - registration should return `201 Created`
   - Check server logs for success messages

4. **Refresh MongoDB Compass**:
   - Click the refresh button in Compass
   - The collection might not appear until first document is created

### Wrong Database?

If you're looking in the wrong database:

1. Check your `.env.local` file for `MONGODB_URI`
2. The database name is the part after the last `/` in the connection string
3. Example: `mongodb://localhost:27017/myapp` → database is **"myapp"**

### Collection Name

- Mongoose automatically pluralizes model names
- Model: `User` → Collection: **"users"**
- Always look for **"users"** (lowercase, plural) in MongoDB Compass

## 📝 Example Connection Strings

### Local MongoDB (default database: "test")
```env
MONGODB_URI=mongodb://localhost:27017/test
```

### Local MongoDB (custom database)
```env
MONGODB_URI=mongodb://localhost:27017/myapp
```

### MongoDB Atlas
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myapp
```

## ✅ Success Indicators

You'll know data is being stored when:

1. ✅ Server logs show: `✅ User created successfully`
2. ✅ Registration returns `201 Created` status
3. ✅ `/api/test-db` shows user count > 0
4. ✅ MongoDB Compass shows documents in "users" collection
5. ✅ You can see user email, role, and timestamps in Compass

## 🎯 Quick Test

1. Register a new user with a **valid email** (e.g., `test@example.com`)
2. Check server console for success logs
3. Visit `http://localhost:3000/api/test-db`
4. Open MongoDB Compass → Find your database → Open "users" collection
5. You should see your user data!

