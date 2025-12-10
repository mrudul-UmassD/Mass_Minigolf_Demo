# Local Development Setup Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL installed locally OR access to AWS Aurora RDS
- Git

## Quick Start (5 minutes)

### 1. Clone and Install

```bash
cd minigolf-massachusetts
npm install
```

### 2. Set Up Database

**Option A: Local PostgreSQL**

```bash
# Install PostgreSQL (if not installed)
# Windows: Download from https://www.postgresql.org/download/windows/
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
createdb minigolf

# Update .env with local connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/minigolf?schema=public"
```

**Option B: AWS Aurora RDS**

See [DEPLOYMENT.md](./DEPLOYMENT.md#database-setup) for detailed Aurora setup instructions.

### 3. Configure Environment Variables

Create `.env` file:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/minigolf?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-with-openssl"

# Optional: AWS S3 (for image uploads)
# AWS_ACCESS_KEY_ID="your-key"
# AWS_SECRET_ACCESS_KEY="your-secret"
# AWS_REGION="us-east-1"
# AWS_S3_BUCKET_NAME="minigolf-images"
```

Generate NEXTAUTH_SECRET:
```bash
# Windows PowerShell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Or online: https://generate-secret.vercel.app/32
```

### 4. Initialize Database

```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

This will create:
- Admin user (username: `admin`, password: `admin`)
- 3 sample golf courses
- Multiple tracks per course
- Sample sessions

### 5. Run Development Server

```bash
npm run dev
```

Visit:
- **Public site:** http://localhost:3000
- **Admin panel:** http://localhost:3000/admin (login: admin/admin)

---

## Project Structure

```
minigolf-massachusetts/
├── app/
│   ├── (public pages)
│   │   ├── page.tsx              # Homepage
│   │   ├── courses/
│   │   │   ├── page.tsx          # Courses listing
│   │   │   └── [slug]/page.tsx   # Course details
│   │   ├── bookings/page.tsx     # Booking wizard
│   │   └── contact/page.tsx      # Contact form
│   ├── admin/                    # Admin panel
│   │   ├── page.tsx              # Login page
│   │   ├── dashboard/page.tsx    # Dashboard
│   │   ├── bookings/page.tsx     # Bookings management
│   │   └── contact/page.tsx      # Contact submissions
│   └── api/                      # API routes
│       ├── auth/                 # NextAuth
│       ├── courses/              # Course APIs
│       ├── sessions/             # Session APIs
│       ├── bookings/             # Booking APIs
│       └── contact/              # Contact form API
├── components/
│   ├── Navigation.tsx            # Main navigation
│   └── Footer.tsx                # Site footer
├── lib/
│   ├── prisma.ts                 # Prisma client
│   └── utils.ts                  # Utility functions
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed script
└── public/                       # Static assets
```

---

## Common Development Tasks

### View Database

```bash
# Open Prisma Studio
npx prisma studio
```

Browser opens at http://localhost:5555 with GUI for database.

### Reset Database

```bash
# Warning: Deletes all data!
npx prisma migrate reset

# Then reseed
npm run db:seed
```

### Add New Database Model

1. Edit `prisma/schema.prisma`
2. Run migrations:
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```
3. Restart dev server

### Check for Errors

```bash
# TypeScript type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Build for Production

```bash
npm run build
npm start
```

---

## Database Schema Overview

### Main Models

1. **GolfCourse** - Golf course locations
   - name, address, description, contact info
   - Relations: images, tracks, sessions

2. **Track** - Individual courses within a location
   - name, holes, difficulty, duration
   - Belongs to: GolfCourse

3. **Session** - Available time slots for booking
   - date, startTime, endTime, pricing
   - Belongs to: Track

4. **Booking** - Customer reservations
   - customer details, numberOfPeople, totalPrice
   - Belongs to: Session

5. **Admin** - Admin users
   - username, password (hashed)

6. **ContactSubmission** - Contact form submissions
   - name, email, subject, message, status

7. **WebsiteContent** - Dynamic homepage content
   - section, title, content (JSON)

8. **CourseImage** - Course photos
   - url, caption, order
   - Belongs to: GolfCourse

---

## API Endpoints

### Public APIs

```bash
GET  /api/courses              # List all active courses
GET  /api/courses/[id]/tracks  # Get tracks for a course
GET  /api/sessions?trackId=... # Get available sessions
POST /api/bookings             # Create a booking
POST /api/contact              # Submit contact form
```

### Admin APIs (require auth)

```bash
GET  /api/bookings             # List all bookings
GET  /api/contact              # List contact submissions
```

### Testing APIs

```bash
# Get all courses
curl http://localhost:3000/api/courses

# Get sessions for a track
curl http://localhost:3000/api/sessions?trackId=TRACK_ID

# Create booking (POST)
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "SESSION_ID",
    "numberOfPeople": 2,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "555-1234"
  }'
```

---

## Admin Panel Features

### Login
- URL: `/admin`
- Default credentials: `admin` / `admin`
- Protected with NextAuth.js

### Dashboard (`/admin/dashboard`)
- Total courses, bookings, revenue
- Upcoming sessions count
- Recent bookings table

### Bookings (`/admin/bookings`)
- View all bookings
- Filter by status (Confirmed, Pending, Cancelled, Completed)
- Search by customer name, email, course
- Booking summaries

### Contact Submissions (`/admin/contact`)
- View all contact form submissions
- Filter by status (New, Read, Responded, Resolved)
- Direct email reply links

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Database Connection Error

```bash
# Check PostgreSQL is running
# Windows: Services → postgresql
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Test connection manually
psql -U postgres -d minigolf

# Verify .env DATABASE_URL is correct
```

### Prisma Client Not Generated

```bash
npx prisma generate
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### TypeScript Errors in IDE

```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

---

## Development Tips

### Hot Reload Issues

If changes aren't reflecting:
1. Save file (Ctrl+S)
2. Check terminal for compilation errors
3. Hard refresh browser (Ctrl+Shift+R)
4. Restart dev server if needed

### VS Code Extensions (Recommended)

- **Prisma** - Syntax highlighting for schema
- **Tailwind CSS IntelliSense** - Autocomplete for classes
- **ES7+ React/Redux/React-Native snippets**
- **Error Lens** - Inline error display

### Environment Variables in VS Code

Create `.vscode/settings.json`:
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## Testing Workflow

### Manual Testing Checklist

**Public Site:**
- [ ] Homepage loads with featured courses
- [ ] Courses page displays all courses
- [ ] Course detail page shows tracks and sessions
- [ ] Booking wizard completes 4-step flow
- [ ] Contact form submits successfully

**Admin Panel:**
- [ ] Login with admin/admin works
- [ ] Dashboard shows correct statistics
- [ ] Bookings page displays all reservations
- [ ] Contact page shows form submissions
- [ ] Logout redirects to login

**Database:**
- [ ] Seed script creates sample data
- [ ] Bookings properly decrement available slots
- [ ] All relationships work correctly

---

## Next Steps

1. **Customize Sample Data**
   - Edit `prisma/seed.ts`
   - Update with real Massachusetts courses
   - Run `npm run db:seed` to update

2. **Add Real Images**
   - Replace placeholder image URLs in seed data
   - Or implement S3 upload functionality

3. **Customize Styling**
   - Update colors in `tailwind.config.ts`
   - Modify components in `components/`

4. **Add Email Notifications**
   - Install nodemailer: `npm install nodemailer`
   - Configure SMTP in `.env`
   - Update booking API to send confirmations

5. **Deploy to Production**
   - See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Getting Help

- **Documentation:** Check README.md and DEPLOYMENT.md
- **Issues:** Check GitHub Issues
- **Database:** Use Prisma Studio (`npx prisma studio`)
- **Logs:** Check terminal output and browser console

---

**Happy Coding! 🏌️‍♂️⛳**
