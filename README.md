# Massachusetts Mini Golf Directory

A full-stack web application showcasing mini golf courses across Massachusetts with an admin panel for content management.

## Features

- 🏠 **Home Page**: Introduction and featured courses
- ⛳ **Golf Courses**: Complete list of all mini golf courses
- 📋 **Course Details**: Detailed view with photos, links, and information
- 📖 **About Us**: Information about the directory
- 🔐 **Admin Panel**: Secure login to manage courses (admin:admin)

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- CSS3 with modern styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Session-based authentication
- CORS enabled

## Project Structure

```
massachusetts-minigolf/
├── backend/
│   ├── models/
│   │   └── GolfCourse.js
│   ├── .env
│   ├── package.json
│   ├── seedDatabase.js
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── CourseForm.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Courses.js
    │   │   ├── CourseDetail.js
    │   │   ├── About.js
    │   │   └── Admin.js
    │   ├── App.js
    │   ├── api.js
    │   ├── index.css
    │   └── index.js
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn

### Step 1: Install MongoDB
Make sure MongoDB is installed and running on your local machine:
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (if not running)
mongod
```

### Step 2: Install Backend Dependencies
```powershell
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```powershell
cd ../frontend
npm install
```

### Step 4: Seed the Database
Populate the database with initial mini golf course data:
```powershell
cd ../backend
npm run seed
```

You should see output confirming that 10 golf courses were added to the database.

### Step 5: Start the Backend Server
```powershell
# In the backend directory
npm start
```

The backend server will start on http://localhost:5000

### Step 6: Start the Frontend Development Server
Open a new terminal window:
```powershell
cd frontend
npm start
```

The React app will open automatically at http://localhost:3000

## Usage

### Public Pages
- **Home**: View introduction and featured courses
- **Golf Courses**: Browse all available courses
- **Course Details**: Click on any course to view detailed information
- **About Us**: Learn about the directory

### Admin Access
1. Navigate to http://localhost:3000/admin
2. Login with credentials:
   - Username: `admin`
   - Password: `admin`
3. Once logged in, you can:
   - Add new golf courses
   - Edit existing courses
   - Delete courses

### API Endpoints

#### Public Endpoints
- `GET /api/courses` - Get all golf courses
- `GET /api/courses/:id` - Get a single golf course

#### Admin Endpoints (Authentication Required)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/status` - Check admin authentication status
- `POST /api/admin/courses` - Create a new course
- `PUT /api/admin/courses/:id` - Update a course
- `DELETE /api/admin/courses/:id` - Delete a course

## Database Schema

```javascript
{
  name: String (required),
  description: String,
  website: String,
  menuLink: String,
  googleMapsLink: String,
  address: String,
  city: String,
  phone: String,
  photos: [String],
  features: [String],
  createdAt: Date
}
```

## Initial Data

The application comes pre-loaded with 10 real mini golf courses from Massachusetts, including:
- Pirate's Cove Adventure Golf
- Castle Island Mini Golf
- Kimball Farm Mini Golf
- Skull Island Sports World
- Cape Cod Inflatable Park
- And more!

## Environment Variables

Backend `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/massachusetts_minigolf
SESSION_SECRET=your_secret_key_here_change_in_production
```

## Development

### Backend Development Mode (with auto-restart)
```powershell
cd backend
npm run dev
```

### Adding More Courses
You can add more courses through the admin panel or by modifying `seedDatabase.js` and running:
```powershell
npm run seed
```

## Security Note

⚠️ **Important**: The admin credentials (admin:admin) are for demonstration purposes only. In a production environment, you should:
- Use environment variables for credentials
- Implement proper password hashing
- Use JWT tokens or similar for authentication
- Add rate limiting
- Use HTTPS

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check that the connection string in `.env` is correct

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: React will prompt you to use a different port

### CORS Issues
- Ensure the frontend is running on http://localhost:3000
- Check the CORS configuration in `server.js`

## Future Enhancements

- Image upload functionality
- User reviews and ratings
- Search and filter capabilities
- Mobile app version
- Email notifications
- Social media integration

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for Massachusetts mini golf enthusiasts!
