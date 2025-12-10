# Deployment Guide - MiniGolf Massachusetts

This guide will walk you through deploying your MiniGolf Massachusetts booking platform to production.

## Table of Contents
1. [Database Setup (AWS Aurora RDS)](#database-setup)
2. [Environment Variables](#environment-variables)
3. [Deployment Options](#deployment-options)
4. [Post-Deployment Steps](#post-deployment-steps)

---

## Database Setup (AWS Aurora RDS)

### Step 1: Create Aurora RDS PostgreSQL Instance

1. **Login to AWS Console**
   - Navigate to RDS service
   - Click "Create database"

2. **Database Configuration**
   - Engine type: **Amazon Aurora**
   - Edition: **Amazon Aurora PostgreSQL-Compatible Edition**
   - Capacity type: **Serverless v2** (cost-effective for variable workloads)
   - Version: Latest PostgreSQL 15 compatible version

3. **Settings**
   - DB cluster identifier: `minigolf-massachusetts-db`
   - Master username: `postgres` (or your choice)
   - Master password: Create a strong password (save this!)

4. **Capacity Settings**
   - Minimum ACUs: 0.5 (scales to zero when idle)
   - Maximum ACUs: 2 (adjust based on expected traffic)

5. **Connectivity**
   - VPC: Default VPC or create new
   - Public access: **Yes** (for initial setup; restrict later)
   - VPC security group: Create new or use existing
     - Allow inbound PostgreSQL (port 5432) from your IP and deployment platform

6. **Additional Configuration**
   - Initial database name: `minigolf`
   - Enable encryption
   - Enable automatic backups (7-day retention recommended)

7. **Create Database**
   - Review settings and create
   - Wait 5-10 minutes for provisioning

### Step 2: Configure Security Group

1. Navigate to **EC2 → Security Groups**
2. Find the security group attached to your Aurora cluster
3. Edit inbound rules:
   ```
   Type: PostgreSQL
   Port: 5432
   Source: 
     - Your development IP (for testing)
     - Vercel IPs (if deploying to Vercel)
     - Your production server IPs
   ```

### Step 3: Get Connection String

1. Go back to RDS → Databases → Your cluster
2. Find the **Endpoint** (looks like: `minigolf-cluster.cluster-xxxxx.us-east-1.rds.amazonaws.com`)
3. Construct your DATABASE_URL:
   ```
   postgresql://USERNAME:PASSWORD@ENDPOINT:5432/DATABASE_NAME?schema=public
   ```

Example:
```
postgresql://postgres:YourSecurePassword123@minigolf-cluster.cluster-abc123.us-east-1.rds.amazonaws.com:5432/minigolf?schema=public
```

---

## Environment Variables

### Required Variables

Create a `.env.production` file or configure in your deployment platform:

```bash
# Database
DATABASE_URL="postgresql://username:password@your-aurora-endpoint:5432/minigolf?schema=public"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# AWS (Optional - for S3 image uploads)
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET_NAME="minigolf-images"

# Email (Optional - for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

### Generate NEXTAUTH_SECRET

Run this command:
```bash
openssl rand -base64 32
```

Or in Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero-config Next.js deployment
- Automatic HTTPS
- CDN & edge functions
- Free tier available

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.production`
   - Or use CLI:
   ```bash
   vercel env add DATABASE_URL production
   vercel env add NEXTAUTH_SECRET production
   # ... add all variables
   ```

4. **Deploy**
   ```bash
   cd minigolf-massachusetts
   vercel --prod
   ```

5. **Run Database Migrations**
   ```bash
   # After first deployment
   npm run db:push
   npm run db:seed
   ```

   Or connect via Vercel CLI:
   ```bash
   vercel env pull .env.local
   npm run db:push
   npm run db:seed
   ```

### Option 2: AWS Amplify

1. **Push to GitHub** (already done!)
   
2. **Connect to Amplify**
   - Go to AWS Amplify Console
   - Click "New App" → "Host web app"
   - Connect your GitHub repository
   - Select `Mass_Minigolf_Demo` repo

3. **Configure Build Settings**
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

4. **Add Environment Variables**
   - In Amplify Console → App Settings → Environment Variables
   - Add all variables from `.env.production`

5. **Deploy**
   - Amplify will automatically deploy
   - Future pushes to `main` branch will auto-deploy

### Option 3: Docker + AWS ECS/Fargate

**Create Dockerfile:**

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "server.js"]
```

**Add to next.config.js:**
```javascript
module.exports = {
  output: 'standalone',
}
```

**Build and Push:**
```bash
docker build -t minigolf-app .
docker tag minigolf-app:latest YOUR_ECR_REPO:latest
docker push YOUR_ECR_REPO:latest
```

**Deploy to ECS:**
- Create ECS cluster
- Create task definition with your Docker image
- Configure environment variables in task definition
- Create service with load balancer

---

## Post-Deployment Steps

### 1. Database Migration

```bash
# Connect to your production database
npm run db:push

# Seed with initial data
npm run db:seed
```

### 2. Test Admin Login

1. Visit `https://your-domain.com/admin`
2. Login with:
   - Username: `admin`
   - Password: `admin`
3. **IMPORTANT**: Change password immediately after first login

### 3. Update Admin Password

Connect to database and run:
```sql
-- Generate new hash with: bcrypt.hashSync('new-password', 10)
UPDATE "Admin" 
SET password = '$2b$10$YOUR_NEW_HASHED_PASSWORD'
WHERE username = 'admin';
```

Or use Prisma Studio:
```bash
npx prisma studio
```

### 4. Configure DNS

1. **Get your deployment URL** from Vercel/Amplify
2. **Add custom domain:**
   - In Vercel: Settings → Domains → Add
   - In Amplify: Domain Management → Add domain
3. **Update DNS records** with your registrar:
   ```
   Type: CNAME
   Name: @ (or www)
   Value: your-vercel-url.vercel.app
   ```

### 5. Set up HTTPS

- Vercel/Amplify: Automatic SSL certificates
- Custom server: Use Let's Encrypt with Certbot

### 6. Configure CORS (if needed)

If you have a separate frontend domain, update `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://your-frontend-domain.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        ],
      },
    ]
  },
}
```

### 7. Monitoring & Analytics

**Application Monitoring:**
- Vercel: Built-in analytics
- AWS: CloudWatch logs and metrics
- Third-party: Sentry, LogRocket

**Database Monitoring:**
- AWS RDS Performance Insights
- Enable Enhanced Monitoring

**Set up alerts:**
```bash
# AWS CloudWatch alarms for:
- High CPU utilization (>80%)
- Low available storage (<10GB)
- High connection count
- Failed authentication attempts
```

### 8. Backup Strategy

**Database Backups:**
- AWS Aurora: Automatic daily snapshots (already enabled)
- Manual snapshots before major updates
- Cross-region replication for disaster recovery

**Application Backups:**
- Code: GitHub repository (already done)
- Environment variables: Secure backup in password manager
- User-uploaded images: S3 versioning + lifecycle policies

---

## Performance Optimization

### 1. Enable Caching

```javascript
// In API routes
export async function GET() {
  const courses = await prisma.golfCourse.findMany(...)
  
  return NextResponse.json(courses, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
    }
  })
}
```

### 2. Database Connection Pooling

Update `lib/prisma.ts`:
```typescript
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + '?connection_limit=10&pool_timeout=20',
    },
  },
})
```

### 3. Image Optimization

- Use Next.js Image component
- Upload images to S3 with CloudFront CDN
- Enable WebP format

### 4. Static Generation

```typescript
// In course pages
export const revalidate = 3600 // Revalidate every hour
```

---

## Security Checklist

- [ ] Change default admin password
- [ ] Restrict database security group to production IPs only
- [ ] Enable AWS RDS encryption at rest
- [ ] Use environment variables (never commit secrets)
- [ ] Enable rate limiting on API routes
- [ ] Set up WAF (Web Application Firewall) on CloudFront/ALB
- [ ] Regular security updates: `npm audit fix`
- [ ] Enable AWS GuardDuty for threat detection
- [ ] Set up CloudTrail for audit logs
- [ ] Implement CSP (Content Security Policy) headers

---

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
psql "postgresql://username:password@endpoint:5432/minigolf"

# Check security group rules
aws ec2 describe-security-groups --group-ids sg-xxxxx

# Verify Prisma connection
npx prisma db pull
```

### Build Failures

```bash
# Clear Next.js cache
rm -rf .next

# Regenerate Prisma client
npx prisma generate

# Check for TypeScript errors
npm run type-check
```

### Runtime Errors

Check logs:
- Vercel: Dashboard → Deployments → Logs
- AWS: CloudWatch → Log Groups
- Local: Browser console + terminal

---

## Scaling Considerations

**As traffic grows:**

1. **Database:**
   - Increase Aurora ACU limits
   - Add read replicas for read-heavy operations
   - Implement Redis caching layer

2. **Application:**
   - Vercel auto-scales
   - AWS: Increase ECS task count or Fargate instances

3. **Storage:**
   - Migrate images to S3 + CloudFront
   - Enable S3 Transfer Acceleration

4. **CDN:**
   - Add CloudFlare for additional caching
   - Use CloudFront for static assets

---

## Cost Optimization

**AWS Aurora Serverless v2:**
- Scales to 0 ACUs when idle (only pay for storage)
- Estimated cost: $15-50/month for low traffic

**Reduce costs:**
- Use Aurora Serverless v2 (not provisioned)
- Enable auto-pause for dev/staging
- Set reasonable ACU limits
- Clean up old snapshots
- Use S3 Intelligent-Tiering for images

**Vercel:**
- Free tier: 100GB bandwidth, 6000 build minutes
- Pro tier ($20/month): Unlimited bandwidth

---

## Support & Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **AWS Aurora:** https://docs.aws.amazon.com/aurora
- **Vercel Support:** https://vercel.com/support

---

## Quick Start Checklist

- [ ] Create AWS Aurora RDS instance
- [ ] Configure security group
- [ ] Get DATABASE_URL connection string
- [ ] Generate NEXTAUTH_SECRET
- [ ] Deploy to Vercel/Amplify
- [ ] Run `npm run db:push`
- [ ] Run `npm run db:seed`
- [ ] Test application
- [ ] Change admin password
- [ ] Configure custom domain
- [ ] Set up monitoring
- [ ] Enable backups

**Estimated Setup Time:** 30-60 minutes

---

**Questions?** Contact: info@minigolfmass.com
