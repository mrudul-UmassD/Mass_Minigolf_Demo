# 🏌️ MiniGolf Massachusetts

A comprehensive booking and directory website for mini golf courses across Massachusetts. Built with Next.js 14, TypeScript, Prisma ORM, and AWS Aurora RDS.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://your-domain.com)
[![GitHub](https://img.shields.io/badge/repo-GitHub-blue)](https://github.com/mrudul-UmassD/Mass_Minigolf_Demo)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ What's Implemented

This is a **fully functional** booking platform with:

✅ **Complete Public Website**
- Responsive homepage with hero section and featured courses
- Courses listing page with search and filters
- Individual course detail pages with galleries, tracks, and contact info
- 4-step booking wizard with session selection
- Contact form with submission tracking
- Mobile-responsive navigation and footer

✅ **Full Admin Panel** (`/admin`)
- Secure login with NextAuth.js (credentials: `admin`/`admin`)
- Dashboard with statistics and recent activity
- Bookings management with search and filters
- Contact submissions viewer
- Protected routes with session management

✅ **Complete API Layer**
- RESTful API routes for all operations
- Courses, tracks, sessions endpoints
- Booking creation with validation
- Contact form submission
- Error handling and data validation

✅ **Production-Ready Database**
- Comprehensive Prisma schema (8 models)
- Relationships and constraints
- Seed script with sample data
- Migration-ready for AWS Aurora RDS

✅ **Developer Experience**
- TypeScript throughout
- Tailwind CSS for styling
- CodeRabbit integration for code review
- Comprehensive documentation

## 🚀 Features

### Public Features
- **Course Directory** - Browse all mini golf courses in Massachusetts with images and details
- **Course Details** - View tracks, pricing, amenities, Google Maps integration
- **Session Booking** - 4-step booking wizard (Course → Track → Session → Details)
- **Contact Form** - Submit inquiries with subject categorization

### Admin Features (Protected `/admin` route)
- **Dashboard** - Real-time stats: total courses, bookings, revenue, upcoming sessions
- **Booking Management** - View all bookings with search, filters, and status tracking
- **Contact Submissions** - Manage inquiries with status updates (New/Read/Responded/Resolved)
- **Secure Authentication** - Login/logout with NextAuth.js session management

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: AWS Aurora RDS (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod
- **Image Storage**: AWS S3 (optional)

## 📋 Prerequisites

- Node.js 18+ installed
- AWS Aurora RDS PostgreSQL instance
- npm or yarn package manager

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd minigolf-massachusetts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and update with your credentials:

```bash
# Database - AWS Aurora RDS
DATABASE_URL="postgresql://username:password@your-aurora-endpoint.rds.amazonaws.com:5432/minigolf_ma?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-in-production"

# AWS (Optional - for image uploads)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET="minigolf-ma-images"

# Admin Credentials
DEFAULT_ADMIN_USERNAME="admin"
DEFAULT_ADMIN_PASSWORD="admin"
```

### 4. Push database schema

```bash
npm run db:push
```

### 5. Seed the database

```bash
npm run db:seed
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
minigolf-massachusetts/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth configuration
│   │   ├── courses/      # Course endpoints
│   │   ├── bookings/     # Booking endpoints
│   │   └── admin/        # Admin endpoints
│   ├── admin/            # Admin panel pages
│   ├── courses/          # Public course pages
│   ├── bookings/         # Booking pages
│   ├── contact/          # Contact page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Reusable components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── ...
├── lib/                  # Utility functions
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeder
├── .coderabbit.yaml      # CodeRabbit configuration
└── package.json
```

## 🔐 Admin Access

- **URL**: `/admin`
- **Default Username**: `admin`
- **Default Password**: `admin`

⚠️ **Important**: Change the default credentials in production!

## 🗄️ Database Schema

### Models
- **Admin** - Admin users with hashed passwords
- **GolfCourse** - Golf course locations with details
- **CourseImage** - Images for courses
- **Track** - Different courses/tracks at each location
- **Session** - Available booking time slots
- **Booking** - Customer bookings
- **WebsiteContent** - Editable website content
- **ContactSubmission** - Contact form submissions

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Database
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio

# Build
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🤖 CodeRabbit Integration

This project is configured with CodeRabbit for automated code reviews. The configuration file (`.coderabbit.yaml`) includes:

- Security checks (SQL injection, XSS, authentication)
- Performance optimization suggestions
- Best practices enforcement
- Type safety verification
- Accessibility checks
- React and Next.js specific patterns

## 🚀 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete deployment guide including:
- AWS Aurora RDS setup instructions
- Vercel/AWS Amplify deployment steps
- Environment variable configuration
- Database migration and seeding
- DNS and SSL setup
- Monitoring and scaling
- Security checklist

### Quick Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Set environment variables in Vercel Dashboard, then run:
```bash
npm run db:push
npm run db:seed
```

## 🧑‍💻 Local Development

See **[DEVELOPMENT.md](./DEVELOPMENT.md)** for detailed development guide including:
- Local database setup (PostgreSQL or Aurora)
- Environment configuration
- Project structure overview
- API endpoints documentation
- Admin panel features
- Testing workflow
- Troubleshooting tips

### Quick Start for Development

```bash
# 1. Install dependencies
npm install

# 2. Set up .env file (see .env.example)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/minigolf?schema=public"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# 3. Initialize database
npm run db:push
npm run db:seed

# 4. Start dev server
npm run dev
```

Visit http://localhost:3000 and login to `/admin` with `admin`/`admin`.

## 🔒 Security Features

- ✅ NextAuth.js authentication with secure sessions
- ✅ Bcrypt password hashing (10 rounds)
- ✅ Protected admin routes with middleware
- ✅ Prisma ORM for SQL injection prevention
- ✅ Input validation and sanitization
- ✅ CSRF protection via NextAuth
- ✅ Environment variables for secrets
- ⚠️ **TODO**: Add rate limiting for production
- ⚠️ **TODO**: Implement password reset flow

## 📊 Project Status

### Completed Features ✅

**Public Website:**
- ✅ Homepage with hero section and featured courses
- ✅ Courses listing page with responsive grid
- ✅ Individual course detail pages with galleries
- ✅ 4-step booking wizard with validation
- ✅ Contact form with database storage
- ✅ Responsive navigation and footer

**Admin Panel:**
- ✅ Secure login/logout with NextAuth.js
- ✅ Dashboard with real-time statistics
- ✅ Bookings management with search/filters
- ✅ Contact submissions viewer
- ✅ Protected routes and session management

**Backend:**
- ✅ Complete Prisma schema (8 models)
- ✅ All API endpoints implemented
- ✅ Database seeding script
- ✅ Error handling and validation

**DevOps:**
- ✅ CodeRabbit integration for automated code review
- ✅ Deployment guide (AWS Aurora RDS + Vercel/Amplify)
- ✅ Development documentation
- ✅ TypeScript + ESLint configured

### Potential Enhancements 🚀

**High Priority:**
- Add email notifications for bookings (Nodemailer/SendGrid)
- Implement admin CRUD for courses, tracks, sessions
- Add image upload to AWS S3
- Payment integration (Stripe)

**Medium Priority:**
- Rate limiting for API routes
- Password reset flow for admins
- Booking cancellation/rescheduling
- Calendar view for sessions
- Analytics dashboard

**Nice to Have:**
- Multi-language support (i18n)
- Social login (Google/Facebook)
- Review and rating system
- Weather integration
- SMS notifications

## 🤝 Contributing

### Code Review Process

This project uses **CodeRabbit** for automated code reviews. When you:
1. Create a pull request
2. CodeRabbit automatically reviews your code
3. Provides suggestions for improvements
4. Checks for security issues and best practices

Configuration is in `.coderabbit.yaml`.

### Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "Add feature"`
3. Push and create PR: `git push origin feature/your-feature`
4. CodeRabbit will review automatically
5. Address feedback and merge

## 📚 Documentation

- **[README.md](./README.md)** - This file, project overview
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Local development setup
- **[Prisma Schema](./prisma/schema.prisma)** - Database structure

## 📧 Contact & Support

- **Email**: info@minigolfmass.com
- **GitHub**: [Mass_Minigolf_Demo](https://github.com/mrudul-UmassD/Mass_Minigolf_Demo)
- **Issues**: Use GitHub Issues for bug reports

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for Massachusetts Mini Golf enthusiasts**

---

Built with ❤️ for Massachusetts mini golf enthusiasts!
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
