# Full Stack User Management Application

This application is a full-stack user management system built with Next.js for the frontend and NestJS for the backend. It features a multi-step form for user registration, data validation, and complete CRUD operations.

## Technology Stack

### Frontend

- Next.js 14
- TypeScript
- React Hook Form
- Zod Validation
- Tailwind CSS
- RTK Query
- React Hot Toast

### Backend

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Class Validator
- Jest (Testing)

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)

## Getting Started

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the server root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database_name

# Application Configuration
PORT=3000
NODE_ENV=development
```

4. Run database migrations:

```bash
npm run typeorm:run-migrations
```

5. Start the development server:

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The backend server will be running at `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the client root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Start the development server:

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

The frontend application will be running at `http://localhost:3001`

## Features

- Multi-step user registration form
- Real-time form validation
- File upload for profile photos
- Academic history management
- User profile management
- Responsive design
- Toast notifications for user feedback

## API Endpoints

### Users

- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `PATCH /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

## Testing

### Backend Tests

```bash
cd server

# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

### Frontend Tests

```bash
cd client

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## Development Guidelines

### Code Style

- Follow the ESLint configuration
- Use Prettier for code formatting
- Follow TypeScript best practices
- Write meaningful commit messages

### Branch Strategy

- `main` - Production branch
- `develop` - Development branch
- Feature branches should follow the format: `feature/feature-name`
- Bug fix branches should follow the format: `fix/bug-name`

## Deployment

### Backend Deployment

1. Build the application:

```bash
npm run build
```

2. Set up production environment variables
3. Run database migrations
4. Start the server:

```bash
npm run start:prod
```

### Frontend Deployment

1. Build the application:

```bash
npm run build
```

2. Set up production environment variables
3. Start the server:

```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. Database Connection Issues

   - Check if PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. Migration Issues

   - Run `npm run typeorm:show-migrations` to see pending migrations
   - Check migration files for errors

3. Frontend API Connection Issues
   - Verify API URL in `.env.local`
   - Check CORS settings in backend
   - Check network requests in browser dev tools

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Support

For support, please email [your-email@example.com](mailto:your-email@example.com) or open an issue in the repository.
