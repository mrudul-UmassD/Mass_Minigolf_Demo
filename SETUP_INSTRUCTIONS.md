# Quick Setup Instructions

## MongoDB is not installed locally. You have two options:

### Option 1: Use MongoDB Atlas (Cloud - Recommended & Free)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a free cluster (M0 Sandbox - Free forever)
4. Click "Connect" -> "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
6. Update `backend/.env` file with your connection string:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/massachusetts_minigolf?retryWrites=true&w=majority
   ```

### Option 2: Install MongoDB Locally
1. Download from: https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. Start MongoDB service
4. Keep the default .env settings

## After Setting Up Database:

Run these commands:

```powershell
# Seed the database
cd backend
npm run seed

# Start backend (in one terminal)
npm start

# Start frontend (in another terminal)
cd ../frontend
npm install
npm start
```

The app will open at http://localhost:3000
Admin panel at http://localhost:3000/admin (admin:admin)
