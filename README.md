# Airbnb Admin Dashboard

A full-stack admin dashboard application for managing an Airbnb-style property rental platform. Built with modern web technologies and production-ready architecture patterns.

## 🎯 Project Overview

This is a comprehensive admin dashboard that allows administrators to manage properties (listings), users, and bookings for a vacation rental platform. The application demonstrates senior-level full-stack development skills with a focus on clean architecture, type safety, and maintainable code.

## ✨ Key Features

### Dashboard

- **Real-time Statistics**: Overview cards showing total listings, users, bookings, and revenue
- **Activity Monitoring**: Recent system activity and quick action panels

### Listings Management

- **CRUD Operations**: Create, read, update, and delete property listings
- **Status Management**: Control listing status (Active, Inactive, Archived)
- **Detailed Information**: Manage property details including location, pricing, capacity, and amenities
- **Pagination**: Efficient server-side pagination for large datasets

### User Management

- **User Administration**: View and manage all registered users
- **Role Management**: Assign and manage user roles (Admin, User)
- **User Status**: Block/unblock users as needed
- **User Analytics**: View user statistics including listing and booking counts

### Booking Management

- **Booking Overview**: View all reservations with detailed information
- **Status Updates**: Update booking statuses (Pending, Confirmed, Completed, Cancelled)
- **Guest Information**: Access guest details and contact information
- **Revenue Tracking**: Monitor booking revenue and pricing

### Authentication & Security

- **Secure Login**: JWT-based authentication system
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Secure session handling

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** (App Router) - React framework with server-side rendering
- **TypeScript** (Strict Mode) - Type-safe development
- **shadcn/ui** - Accessible, customizable component library
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Powerful data synchronization for React
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### Backend

- **Next.js API Routes** - RESTful API endpoints
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Relational database
- **JWT (jose)** - Secure token-based authentication
- **bcryptjs** - Password hashing

### Development Tools

- **ESLint** - Code linting with strict rules
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **TypeScript** - Static type checking

## 🏗️ Architecture Highlights

### Feature-Based Organization

The codebase follows a feature-based architecture where each domain (bookings, listings, users, auth) owns its:

- Components
- API calls
- Types
- Validation schemas
- Custom hooks

This ensures clear boundaries and maintainability.

### Absolute Imports

All imports use absolute paths with TypeScript path aliases:

```typescript
import { Button } from '@components/ui/button'
import { useBookings } from '@features/bookings/hooks/use-bookings'
```

### Type Safety

- Strict TypeScript configuration
- Shared Zod schemas between frontend and backend
- Type-safe API clients
- No `any` types allowed

### Server-Side Pagination

Efficient pagination implemented at both API and frontend levels:

- Database queries use `skip` and `take` for optimal performance
- React Query caches each page separately
- Only current page data is fetched and displayed

### Component Architecture

- Reusable UI components built on shadcn/ui
- Feature-specific components are self-contained
- Testable components with clear prop interfaces
- No business logic in UI components

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   └── api/               # API route handlers
├── components/            # Shared UI components
│   ├── ui/                # shadcn/ui components
│   └── providers/         # React context providers
├── features/              # Feature modules
│   ├── auth/              # Authentication feature
│   ├── bookings/          # Bookings feature
│   ├── listings/         # Listings feature
│   └── users/            # Users feature
├── lib/                   # Shared utilities
│   ├── api/              # API client configuration
│   ├── auth.ts           # Authentication utilities
│   ├── prisma.ts         # Prisma client
│   └── validations/      # Zod schemas
└── tests/                 # Test files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd airbnb-admin-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/airbnb_admin"
   JWT_SECRET="your-secret-key-here"
   NODE_ENV="development"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   npx prisma db seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Default Login Credentials

After seeding the database, you can log in with:

- Email: `admin@example.com`
- Password: `admin123` (or check seed file for current password)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🎨 Design & UI

The application uses **shadcn/ui** components built on Radix UI primitives, ensuring:

- **Accessibility**: WCAG compliant components
- **Customization**: Easy theming and styling
- **Consistency**: Unified design system
- **Modern UX**: Clean, professional interface

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based auth
- **Route Protection**: Middleware-based route guards
- **Input Validation**: Zod schemas validate all inputs
- **SQL Injection Prevention**: Prisma ORM parameterized queries

## 📊 Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: Admin and customer accounts with role-based access
- **Listings**: Property listings with details and status
- **Bookings**: Reservations linking users to listings

See `prisma/schema.prisma` for the complete schema definition.

## 🧪 Testing

The project includes Jest and React Testing Library for:

- Component testing
- Unit tests
- Integration tests

Run tests with:

```bash
npm test
```

## 🎯 What Makes This Portfolio-Worthy

### Production-Ready Code

- Strict TypeScript configuration
- Comprehensive error handling
- Input validation on both client and server
- Type-safe API contracts

### Scalable Architecture

- Feature-based organization for easy scaling
- Efficient pagination for large datasets
- Optimized database queries
- Proper separation of concerns

### Best Practices

- ESLint strict mode enforcement
- Consistent code formatting with Prettier
- Absolute imports for maintainability
- Reusable component patterns

### Modern Stack

- Latest Next.js App Router
- Type-safe ORM with Prisma
- Modern React patterns (hooks, context)
- Server-side rendering capabilities

### Developer Experience

- Clear project structure
- Comprehensive type safety
- Easy to extend and maintain
- Well-documented code

## 🔮 Future Enhancements

Potential improvements for production deployment:

- Real-time updates with WebSockets
- Advanced filtering and search
- Export functionality (CSV, PDF)
- Email notifications
- Analytics dashboard
- Image upload and management
- Multi-language support
- Role-based permissions system

## 📄 License

This project is part of a portfolio and is available for review purposes.

## 👤 Author

Built as a portfolio project to demonstrate full-stack development capabilities.

---

**Note**: This is a portfolio project demonstrating production-ready development practices. For production use, additional considerations such as error monitoring, logging, and deployment infrastructure would be required.
