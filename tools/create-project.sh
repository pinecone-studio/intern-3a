#!/bin/bash

# Pinecone Intern Project Generator
# This script helps students create new full-stack Next.js projects with Cypress E2E tests

set -e

echo "Pinecone Intern Project Generator"
echo "======================================"
echo ""

# Ask for project name
read -p "Enter project name (e.g., my-app): " PROJECT_NAME

if [ -z "$PROJECT_NAME" ]; then
  echo "Project name cannot be empty"
  exit 1
fi

# Create Next.js application
echo ""
echo "Creating Next.js full-stack application..."
bunx nx generate @nx/next:application "$PROJECT_NAME" \
  --directory="apps/$PROJECT_NAME" \
  --tags="type:app,scope:$PROJECT_NAME,plugin:next" \
  --style=tailwind \
  --appDir=true \
  --src=false \
  --e2eTestRunner=none \
  --projectNameAndRootFormat=as-provided \
  --simpleName=true

# Fix TypeScript configuration for monorepo with shared UI library
echo "Configuring TypeScript..."

cat > "apps/$PROJECT_NAME/tsconfig.json" << 'TSCONFIG_EOF'
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "preserve",
    "noEmit": true,
    "emitDeclarationOnly": false,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "rootDir": "../..",
    "paths": {
      "@pinecone-intern/ui": ["../../libs/shared/ui/src/index.ts"]
    },
    "outDir": "dist",
    "skipLibCheck": true,
    "types": ["react", "node"]
  },
  "include": [
    "../../libs/shared/ui/src/**/*.ts",
    "../../libs/shared/ui/src/**/*.tsx",
    "app/**/*.js",
    "app/**/*.jsx",
    "app/**/*.ts",
    "app/**/*.tsx",
    "next-env.d.ts",
    ".next/types/**/*.ts"
  ],
  "exclude": ["out-tsc", "dist", "node_modules", "jest.config.ts", "jest.config.cts", "app/**/*.spec.ts", "app/**/*.test.ts", ".next"],
  "references": []
}
TSCONFIG_EOF

echo "TypeScript configured"

# Create tsconfig.spec.json for Jest
echo "Creating test TypeScript configuration..."
cat > "apps/$PROJECT_NAME/tsconfig.spec.json" << 'TSCONFIG_SPEC_EOF'
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/jest",
    "module": "commonjs",
    "types": ["jest", "node", "cypress"],
    "jsx": "react"
  },
  "include": ["**/*"]
}
TSCONFIG_SPEC_EOF

# Remove auto-generated jest.config.cts (NX creates this, but we use .ts)
rm -f "apps/$PROJECT_NAME/jest.config.cts"

# Create Jest configuration
echo "Creating Jest configuration..."
cat > "apps/$PROJECT_NAME/jest.config.ts" << 'JEST_EOF'
/* eslint-disable */
export default {
  displayName: '$PROJECT_NAME',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'], babelrc: false }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-resizable-panels|@pinecone-intern/ui)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePathIgnorePatterns: ['generated', '.next'],
  moduleNameMapper: {
    '^@pinecone-intern/ui$': '<rootDir>/../../libs/shared/ui/src/index.ts',
    '^@pinecone-intern/ui/(.*)$': '<rootDir>/../../libs/shared/ui/src/$1',
  },
  setupFilesAfterEnv: ['jest-canvas-mock'],
  coverageDirectory: '../../coverage/apps/$PROJECT_NAME',
  collectCoverageFrom: [
    '**/app/**/_components/**/*.tsx',
    '**/app/**/_lib/**/*.ts',
    '!jest.config.ts',
  ],
};
JEST_EOF

# Replace $PROJECT_NAME in jest.config.ts
sed -i.bak "s/\$PROJECT_NAME/$PROJECT_NAME/g" "apps/$PROJECT_NAME/jest.config.ts" && rm -f "apps/$PROJECT_NAME/jest.config.ts.bak"

# Create specs directory for unit tests
mkdir -p "apps/$PROJECT_NAME/specs"

# Create example test file
cat > "apps/$PROJECT_NAME/specs/index.spec.tsx" << 'SPEC_EOF'
import React from 'react';
import { render } from '@testing-library/react';
import Page from '../app/page';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Page />);
    expect(baseElement).toBeTruthy();
  });
});
SPEC_EOF

# Create Babel configuration for code coverage instrumentation
echo "Creating Babel configuration for coverage..."
cat > "apps/$PROJECT_NAME/.babelrc" << 'BABELRC_EOF'
{
  "compact": false,
  "presets": ["@babel/preset-react", "@nx/next/babel"],
  "plugins": [
    ["@babel/transform-class-properties", {}, "unique-name"],
    ["istanbul", {}, "unique-name"]
  ]
}
BABELRC_EOF

# Create NYC configuration for coverage reporting
cat > "apps/$PROJECT_NAME/.nycrc" << 'NYCRC_EOF'
{
  "extends": "@istanbuljs/nyc-config-typescript",
  "reporter": ["text", "lcov"],
  "exclude": [
    "coverage",
    "node_modules",
    ".next"
  ],
  "include": ["app/**/*"],
  "excludeAfterRemap": true,
  "all": true,
  "check-coverage": false,
  "extension": [".js", ".cjs", ".mjs", ".ts", ".tsx", ".jsx"],
  "report-dir": "./coverage",
  "cache": false
}
NYCRC_EOF

echo "Coverage configuration created"

# Create .eslintignore to skip .next folder
cat > "apps/$PROJECT_NAME/.eslintignore" << 'ESLINTIGNORE_EOF'
.next
ESLINTIGNORE_EOF

echo "ESLint ignore configured"

# Add cypress/results to .gitignore if not already present
echo "Updating .gitignore for cypress results..."
if ! grep -q "apps/$PROJECT_NAME/cypress/results/" .gitignore 2>/dev/null; then
  echo "apps/$PROJECT_NAME/cypress/results/" >> .gitignore
  echo "Added cypress/results to .gitignore"
fi

# Create Cypress E2E configuration (using JS to avoid ts-node issues with customConditions)
echo "Creating Cypress E2E configuration..."
cat > "apps/$PROJECT_NAME/cypress.config.js" << 'CYPRESS_EOF'
/* eslint-disable @typescript-eslint/no-var-requires */
const { nxE2EPreset } = require('@nx/cypress/plugins/cypress-preset');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    ...nxE2EPreset(__filename),
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      return config;
    },
    supportFolder: './cypress/support',
    supportFile: './cypress/support/e2e.js',
    specPattern: ['./cypress/e2e/**/*.cy.js', './cypress/e2e/**/*.cy.ts'],
    screenshotsFolder: './cypress/results/assets',
    videosFolder: './cypress/results/assets',
    viewportWidth: 1536,
    viewportHeight: 960,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 100000,
    responseTimeout: 120000,
    screenshotOnRunFailure: true,
    numTestsKeptInMemory: 0,
    trashAssetsBeforeRuns: true,
    baseUrl: 'http://localhost:4200/',
    retries: 2,
    reporter: '../../node_modules/cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mochawesome',
      mochawesomeReporterOptions: {
        reportDir: './cypress/results',
        overwrite: false,
        html: true,
        json: true,
      },
    },
  },
});
CYPRESS_EOF

# Create Cypress directory structure
mkdir -p "apps/$PROJECT_NAME/cypress/e2e"
mkdir -p "apps/$PROJECT_NAME/cypress/fixtures"
mkdir -p "apps/$PROJECT_NAME/cypress/support"
mkdir -p "apps/$PROJECT_NAME/cypress/results"

# Create Cypress support files (using JS to avoid ts-node issues)
cat > "apps/$PROJECT_NAME/cypress/support/e2e.js" << 'CYPRESS_SUPPORT_EOF'
// ***********************************************************
// This support file is processed and loaded automatically
// before your test files.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@cypress/code-coverage/support';
import './commands';

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Invariant: cookies() expects to have requestAsyncStorage')) {
    return false;
  }
  if (err.message.includes('ResizeObserver loop limit exceeded') ||
      err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
    return false;
  }
});
CYPRESS_SUPPORT_EOF

cat > "apps/$PROJECT_NAME/cypress/support/commands.js" << 'CYPRESS_COMMANDS_EOF'
/// <reference types="cypress" />

// ***********************************************
// Custom Cypress commands
// https://on.cypress.io/custom-commands
// ***********************************************

// Example custom command:
// Cypress.Commands.add('login', (email, password) => { ... })
CYPRESS_COMMANDS_EOF

# Create Cypress tsconfig (standalone, not extending app tsconfig for ts-node compatibility)
cat > "apps/$PROJECT_NAME/cypress/tsconfig.json" << 'CYPRESS_TSCONFIG_EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": false,
    "allowJs": true,
    "types": ["cypress", "node"],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["**/*.ts", "**/*.tsx"]
}
CYPRESS_TSCONFIG_EOF

# Create example E2E test (using JS)
cat > "apps/$PROJECT_NAME/cypress/e2e/app.cy.js" << 'CYPRESS_TEST_EOF'
describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the welcome page', () => {
    cy.contains('Welcome to Your App').should('be.visible');
    cy.contains('Get Started').should('be.visible');
  });

  it('should have a working button', () => {
    cy.get('button').contains('Get Started').should('exist');
  });
});
CYPRESS_TEST_EOF

# Create example fixture
cat > "apps/$PROJECT_NAME/cypress/fixtures/example.json" << 'FIXTURE_EOF'
{
  "name": "Example fixture",
  "description": "Use fixtures to load test data"
}
FIXTURE_EOF

echo "Cypress E2E tests configured"

# Create project.json for e2e configuration
echo "Creating project configuration..."
cat > "apps/$PROJECT_NAME/project.json" << 'PROJECT_JSON_EOF'
{
  "name": "$PROJECT_NAME",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "apps/$PROJECT_NAME",
  "projectType": "application",
  "tags": ["type:app", "scope:$PROJECT_NAME", "plugin:next"],
  "targets": {
    "dev": {
      "executor": "@nx/next:server",
      "options": {
        "buildTarget": "$PROJECT_NAME:build:development",
        "dev": true,
        "port": 4200
      }
    },
    "serve": {
      "executor": "@nx/next:server",
      "defaultConfiguration": "development",
      "options": {
        "buildTarget": "$PROJECT_NAME:build",
        "dev": true,
        "port": 4200
      },
      "configurations": {
        "development": {
          "buildTarget": "$PROJECT_NAME:build:development",
          "dev": true
        },
        "production": {
          "buildTarget": "$PROJECT_NAME:build:production",
          "dev": false
        }
      }
    },
    "e2e": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "TS_NODE_SKIP_PROJECT=true nx run $PROJECT_NAME:e2e-cypress"
        ],
        "parallel": false
      },
      "configurations": {
        "ci": {
          "commands": [
            "TS_NODE_SKIP_PROJECT=true nx run $PROJECT_NAME:e2e-cypress:ci"
          ]
        }
      }
    },
    "e2e-cypress": {
      "executor": "@nx/cypress:cypress",
      "options": {
        "cypressConfig": "apps/$PROJECT_NAME/cypress.config.js",
        "testingType": "e2e",
        "devServerTarget": "$PROJECT_NAME:serve:development",
        "browser": "electron"
      },
      "configurations": {
        "ci": {
          "headed": false,
          "watch": false
        }
      }
    },
    "deploy": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "mkdir -p .vercel && cp ./apps/$PROJECT_NAME/vercel.config.json .vercel/project.json",
          "vercel build --prod",
          "vercel --prebuilt --prod"
        ],
        "parallel": false
      }
    },
    "preview": {
      "executor": "nx:run-commands",
      "options": {
        "commands": [
          "mkdir -p .vercel && cp ./apps/$PROJECT_NAME/vercel.config.json .vercel/project.json",
          "vercel build",
          "vercel --prebuilt"
        ],
        "parallel": false
      }
    }
  }
}
PROJECT_JSON_EOF

# Replace $PROJECT_NAME in project.json
sed -i.bak "s/\$PROJECT_NAME/$PROJECT_NAME/g" "apps/$PROJECT_NAME/project.json" && rm -f "apps/$PROJECT_NAME/project.json.bak"

# Create Vercel configuration
echo "Creating Vercel configuration..."
cat > "apps/$PROJECT_NAME/vercel.config.json" << 'VERCEL_CONFIG_EOF'
{
  "projectId": "XXXXXX",
  "orgId": "XXXXXX",
  "settings": {
    "framework": "nextjs",
    "installCommand": "bun install",
    "buildCommand": "nx build --skip-nx-cache $PROJECT_NAME",
    "outputDirectory": "./apps/$PROJECT_NAME/.next"
  }
}
VERCEL_CONFIG_EOF

# Replace $PROJECT_NAME in vercel.config.json
sed -i.bak "s/\$PROJECT_NAME/$PROJECT_NAME/g" "apps/$PROJECT_NAME/vercel.config.json" && rm -f "apps/$PROJECT_NAME/vercel.config.json.bak"

echo "Vercel configuration created"

# Create Next.js configuration with webpack alias for shared UI
echo "Configuring Next.js..."
cat > "apps/$PROJECT_NAME/next.config.js" << 'NEXTCONFIG_EOF'
//@ts-check

const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  transpilePackages: ['@pinecone-intern/ui'],
  webpack: (config) => {
    config.resolve.alias['@pinecone-intern/ui'] = path.resolve(__dirname, '../../libs/shared/ui/src/index.ts');
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
NEXTCONFIG_EOF

echo "Next.js configured"

# Fix Tailwind configuration
echo "Configuring Tailwind CSS..."

cat > "apps/$PROJECT_NAME/tailwind.config.js" << 'TAILWIND_EOF'
const rootConfig = require('../../tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...rootConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../libs/shared/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};
TAILWIND_EOF

cat > "apps/$PROJECT_NAME/postcss.config.js" << 'POSTCSS_EOF'
const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
POSTCSS_EOF

# Ensure global CSS uses correct Tailwind directives and shadcn variables
if [ -f "apps/$PROJECT_NAME/app/global.css" ]; then
  cat > "apps/$PROJECT_NAME/app/global.css" << 'CSS_EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;

    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;

    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;

    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;

    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;

    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;

    --ring: 240 5.9% 10%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;

    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;

    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;

    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;

    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;

    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;

    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;

    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
CSS_EOF
fi

echo "Tailwind CSS configured"

# Remove generated CSS module file
echo "Cleaning up generated files..."
rm -f "apps/$PROJECT_NAME/app/page.module.css"

# Create simple Tailwind-styled page with shadcn components
cat > "apps/$PROJECT_NAME/app/page.tsx" << 'PAGE_EOF'
'use client';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@pinecone-intern/ui';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to Your App</CardTitle>
          <CardDescription>
            Get started by editing{' '}
            <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
              app/page.tsx
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
PAGE_EOF

echo "Created homepage with shadcn components"

# Remove project-level package.json (using root package.json for all dependencies)
echo "Removing project-level package.json (using root monorepo dependencies)..."
rm -f "apps/$PROJECT_NAME/package.json"

echo "Next.js app created successfully!"

# Add project to root tsconfig.json references
echo "Updating root tsconfig.json..."
ROOT_TSCONFIG="tsconfig.json"
if [ -f "$ROOT_TSCONFIG" ]; then
  if ! grep -q "\"path\": \"./apps/$PROJECT_NAME\"" "$ROOT_TSCONFIG"; then
    sed -i.bak '/^  \]$/i\
    ,\
    {\
      "path": "./apps/'"$PROJECT_NAME"'"\
    }
' "$ROOT_TSCONFIG" && rm -f "$ROOT_TSCONFIG.bak"
    echo "Added project to tsconfig.json references"
  fi
fi

# Install dependencies to link workspace packages
echo "Linking workspace dependencies..."
bun install

echo ""
echo "Project created successfully!"
echo ""
echo "Available commands:"
echo "  nx dev $PROJECT_NAME          - Start development server"
echo "  nx test $PROJECT_NAME         - Run Jest unit tests"
echo "  nx e2e $PROJECT_NAME          - Run Cypress E2E tests"
echo "  nx preview $PROJECT_NAME      - Deploy preview to Vercel"
echo "  nx deploy $PROJECT_NAME       - Deploy to Vercel production"
echo ""
echo "Next steps:"
echo "1. Run: nx dev $PROJECT_NAME"
echo "2. Open http://localhost:4200"
echo ""
echo "For Vercel deployment:"
echo "1. Create a project on Vercel dashboard"
echo "2. Update apps/$PROJECT_NAME/vercel.config.json with your projectId and orgId"
echo "3. Set VERCEL_TOKEN environment variable"
echo "4. Run: nx preview $PROJECT_NAME (for preview) or nx deploy $PROJECT_NAME (for production)"
echo ""
echo "Happy coding!"
