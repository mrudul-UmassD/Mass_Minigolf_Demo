# 🏌️ MiniGolf Massachusetts

A comprehensive booking and directory website for mini golf courses across Massachusetts. Built with Next.js 14, TypeScript, Prisma ORM, and AWS Aurora RDS.

## 🚀 Features

### Public Features
- **Course Directory** - Browse all mini golf courses in Massachusetts
- **Course Details** - View detailed information, images, tracks, and location
- **Session Booking** - Book tee times online for specific courses and tracks
- **Contact Us** - Contact form for inquiries

### Admin Features (Protected `/admin` route)
- **Dashboard** - Overview of bookings, courses, and submissions
- **Course Management** - CRUD operations for golf courses
- **Track Management** - Manage different courses/tracks at each location
- **Session Management** - Create and manage available booking slots
- **Booking Management** - View and manage customer bookings
- **Content Management** - Edit website content dynamically
- **Contact Submissions** - View and manage contact form submissions

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

### AWS Deployment (Recommended)

1. **Database**: Already using AWS Aurora RDS
2. **Application**: Deploy to AWS Amplify or Elastic Beanstalk
3. **Images**: Store in AWS S3

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

## 📝 Environment Variables for Production

Ensure all sensitive environment variables are set:

- Generate a strong `NEXTAUTH_SECRET`: `openssl rand -base64 32`
- Use AWS RDS connection string with SSL
- Set proper CORS and security headers
- Enable rate limiting on API routes

## 🔒 Security Best Practices

- All admin routes protected with NextAuth
- Passwords hashed with bcrypt
- Input validation with Zod
- SQL injection protection via Prisma
- CSRF protection via NextAuth
- Rate limiting (recommended to add)

## 📧 Contact

For questions or support, please use the contact form on the website or reach out to contact@minigolfma.com.

## 📄 License

This project is private and proprietary.

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
