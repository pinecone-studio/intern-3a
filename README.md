# Pinecone 2025 Intern Repository

Welcome to the Pinecone Academy Intern Program monorepo! This repository is designed to help intern students learn full-stack development using modern technologies and best practices.

## 🎯 Purpose

This monorepo serves as:
- A learning environment for intern students
- A workspace for creating full-stack applications
- A demonstration of enterprise-grade monorepo architecture
- A foundation for Test-Driven Development (TDD)

## 📚 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - High-quality React components
- **Lucide Icons** - Beautiful icon library

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **TypeScript** - Type-safe backend code

### Tooling
- **NX 22** - Monorepo build system
- **Bun** - Fast JavaScript runtime and package manager
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

### API Options
- **REST API** - Traditional REST architecture
- **GraphQL** - Modern query language (with Apollo)

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- Bun 1.x or higher (`npm install -g bun`)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd intern-3a
\`\`\`

2. Install dependencies:
\`\`\`bash
bun install
\`\`\`

3. Set up MongoDB (see MongoDB Setup section below)

4. Explore the example Todo app:
\`\`\`bash
# Start the full-stack Todo app (includes API routes)
nx dev todo-app
\`\`\`

5. Open http://localhost:3000 to see the Todo app
   - API routes available at http://localhost:3000/api

## 📁 Project Structure

\`\`\`
intern-3a/
├── apps/                          # Application projects
│   └── example/                   # Example applications
│       └── todo-app/             # Next.js full-stack example with API routes
├── libs/                          # Shared libraries
│   └── shared/
│       └── ui/                   # Shared UI component library (ShadCN)
├── tools/                         # Build tools and scripts
│   ├── create-project.sh         # Project generator script
│   └── deploy-prod.js            # Production deployment script
├── .husky/                        # Git hooks
├── .vscode/                       # VS Code configuration
├── nx.json                        # NX configuration
├── package.json                   # Dependencies and scripts
├── tailwind.config.js            # Tailwind configuration
├── .eslintrc.json                # ESLint rules
└── .prettierrc                   # Prettier configuration
\`\`\`

## 🔧 Working with Nx

### What is Nx?

Nx is a powerful build system and monorepo management tool that helps you:
- **Organize multiple projects** in a single repository
- **Share code** between projects through libraries
- **Run tasks efficiently** using intelligent caching
- **Scale** your development workflow as your codebase grows

### Basic Nx Commands

#### Development Server

\`\`\`bash
# Serve a specific app
nx dev <project-name>
nx dev todo-app

# Serve with custom port
nx dev todo-app --port 3001
\`\`\`

#### Build Commands

\`\`\`bash
# Build a specific project
nx build <project-name>
nx build todo-app

# Build all projects
nx run-many -t build

# Build only affected projects (after your changes)
nx affected -t build
\`\`\`

#### Test Commands

\`\`\`bash
# Test a specific project
nx test <project-name>
nx test todo-app

# Test with watch mode
nx test todo-app --watch

# Test all projects
nx run-many -t test

# Test only affected projects
nx affected -t test

# Test with coverage
nx test todo-app --coverage
\`\`\`

#### Lint Commands

\`\`\`bash
# Lint a specific project
nx lint <project-name>

# Lint all projects
nx run-many -t lint

# Lint and auto-fix
nx lint todo-app --fix
\`\`\`

### Advanced Nx Features

#### Dependency Graph

Visualize your project dependencies:

\`\`\`bash
nx graph
\`\`\`

This opens an interactive graph showing:
- All projects in the monorepo
- Dependencies between projects
- Which projects depend on each other

#### Affected Commands

Nx intelligently determines which projects are affected by your changes:

\`\`\`bash
# See what's affected by your changes
nx affected:graph

# Build only affected projects
nx affected -t build

# Test only affected projects
nx affected -t test

# Run affected with specific base branch
nx affected -t build --base=main
\`\`\`

This is powerful for CI/CD - only test and build what actually changed!

#### Running Multiple Tasks

\`\`\`bash
# Run same task across multiple projects
nx run-many -t build -p todo-app,my-app

# Run multiple tasks in sequence
nx run-many -t lint,test,build

# Run tasks in parallel (faster)
nx run-many -t test --parallel=3
\`\`\`

#### Caching

Nx caches task results to speed up subsequent runs:

\`\`\`bash
# Clear cache
nx reset

# Skip cache for a specific run
nx build todo-app --skip-nx-cache
\`\`\`

When you run a task twice without changes, Nx retrieves results from cache instantly!

### Working with Shared Libraries

#### Import from Shared UI Library

\`\`\`typescript
// In your app component
import { Button, Card } from '@pinecone-intern/ui';

export default function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
\`\`\`

#### Create New Shared Components

1. Add component to \`libs/shared/ui/src/components/ui/\`
2. Export from \`libs/shared/ui/src/components/index.ts\`
3. Import in any app using the package name

### Nx Project Information

\`\`\`bash
# List all projects
nx show projects

# Show project details
nx show project my-app --json

# Show project configuration
nx show project my-app
\`\`\`

### Nx Configuration

Key files:
- **nx.json** - Workspace configuration, task pipeline, caching
- **project.json** - Project-specific configuration (in each app/lib)
- **tsconfig.base.json** - Base TypeScript paths for all projects

## 🎓 Creating Your Project

Use the project generator to create a new full-stack application:

\`\`\`bash
bun create-project
\`\`\`

The script will ask you:
1. Project name (e.g., `my-awesome-app`)
2. API architecture:
   - REST API
   - GraphQL

It will create a **full-stack Next.js application** with:
- Frontend UI components
- API routes in `src/app/api/`
- MongoDB integration
- TypeScript types and models

### Example

\`\`\`bash
$ bun create-project
🎓 Pinecone Intern Project Generator
======================================

Enter project name (e.g., my-app): student-portal

Select API architecture:
1) REST API
2) GraphQL
Enter choice (1-2): 1

✅ Using REST API
📦 Creating Next.js full-stack application...
📁 Creating project structure...
📦 Adding MongoDB dependencies...
✅ Next.js full-stack app created successfully!
🎉 Project created successfully!
\`\`\`

## 🧪 Testing

### Running Tests

\`\`\`bash
# Run all tests
nx test <project-name>

# Run tests in watch mode
nx test <project-name> --watch

# Run tests with coverage
nx test <project-name> --coverage
\`\`\`

### Writing Tests

Follow Test-Driven Development (TDD):
1. Write tests first
2. Implement the feature
3. Refactor if needed
4. Ensure all tests pass before committing

## 🔍 Code Quality

### Pre-commit Hooks

Husky is configured to automatically run on every commit:
- Lint affected projects
- Run tests on affected projects
- Ensure code quality before committing

### Linting

\`\`\`bash
# Lint your code
nx lint <project-name>

# Lint and auto-fix
nx lint <project-name> --fix
\`\`\`

### Formatting

\`\`\`bash
# Format code with Prettier
bun prettier --write .
\`\`\`

## 🏗️ Building

\`\`\`bash
# Build a specific project
nx build <project-name>

# Build all affected projects
nx affected -t build

# Build production optimized
NODE_ENV=production nx build <project-name>
\`\`\`

## 🚢 Deployment

### Setting Up Vercel

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI: `bun add -g vercel`
3. Create a new project in Vercel dashboard
4. Get your Team ID and Project ID from project settings
5. Add them to your `.env.production` file:

\`\`\`env
VERCEL_ORG_ID=your-team-id
VERCEL_PROJECT_ID=your-project-id
\`\`\`

### Deploying to Production

\`\`\`bash
# Deploy your project
bun deploy-prod <project-name>
\`\`\`

This command will:
1. Copy `.env.production` to `.env`
2. Build your project
3. Deploy to Vercel

### MongoDB Setup for Production

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Add it to your `.env.production` file:

\`\`\`env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
\`\`\`

## 📖 Learning Resources

### NX Documentation
- [NX Official Docs](https://nx.dev)
- [NX Tutorial](https://nx.dev/getting-started/intro)
- [NX Project Graph](https://nx.dev/features/explore-graph)

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js App Router](https://nextjs.org/docs/app)

### React
- [React Documentation](https://react.dev)
- [React Hooks](https://react.dev/reference/react)

### TypeScript
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### MongoDB & Mongoose
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com/docs)

### Testing
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🎨 Shared UI Library

This monorepo includes a shared UI library with pre-built ShadCN components:

\`\`\`tsx
import { Button, Card, Input, Dialog } from '@pinecone-intern/ui';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
\`\`\`

## 🌳 Git Workflow

1. Create a feature branch:
   \`\`\`bash
   git checkout -b feature/my-new-feature
   \`\`\`

2. Make your changes and commit:
   \`\`\`bash
   git add .
   git commit -m "feat: add new feature"
   \`\`\`
   (Pre-commit hooks will automatically run tests and linting)

3. Push to remote:
   \`\`\`bash
   git push origin feature/my-new-feature
   \`\`\`

4. Create a Pull Request

## 🐛 Common Issues

### MongoDB Connection Error

**Problem:** Can't connect to MongoDB

**Solution:**
- Ensure MongoDB is running locally: `mongod`
- Or check your MongoDB Atlas connection string
- Verify firewall settings allow MongoDB connections

### Port Already in Use

**Problem:** Port 3000 or 3333 is already in use

**Solution:**
\`\`\`bash
# Find and kill the process using the port
lsof -ti:3000 | xargs kill -9
lsof -ti:3333 | xargs kill -9
\`\`\`

### TypeScript Type Definition Errors

**Problem:** Cannot find type definition file for 'minimatch' or other packages

**Solution:**
The project generator automatically adds `skipLibCheck: true` to new projects. For existing projects:
\`\`\`json
// In your tsconfig.json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
\`\`\`

### ESLint Errors

**Problem:** ESLint errors preventing commit

**Solution:**
\`\`\`bash
# Auto-fix ESLint issues
nx lint <project-name> --fix

# If issues persist, review and fix manually
\`\`\`

### Nx Cache Issues

**Problem:** Stale build artifacts or weird behavior

**Solution:**
\`\`\`bash
# Clear all caches
nx reset

# Clear Next.js cache
rm -rf apps/your-app/.next

# Reinstall dependencies
rm -rf node_modules
bun install
\`\`\`

## 📞 Support

If you encounter any issues or have questions:

1. Check the example Todo app for reference implementation
2. Review the documentation links above
3. Ask your mentor or team lead
4. Create an issue in this repository (if applicable)

## 🎯 Best Practices

1. **Follow TDD**: Write tests before implementing features
2. **Use TypeScript**: Leverage type safety
3. **Keep components small**: Single Responsibility Principle
4. **Write meaningful commit messages**: Use conventional commits
5. **Review code before committing**: Use the pre-commit hooks
6. **Document your code**: Add comments for complex logic
7. **Use shared libraries**: Reuse components from `@pinecone-intern/ui`

## 📝 License

This project is for educational purposes as part of the Pinecone Academy Intern Program.

---

**Happy Coding! 🚀**

© 2025 Pinecone Academy