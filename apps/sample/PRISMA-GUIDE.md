# Prisma Тохиргоо - Sample App

Энэ app нь monorepo дахь бусад app-уудаас бие даасан өөрийн Prisma schema-тай.

## Шинэ Project Дээр Prisma Тохируулах

Өөрийн project дээр Prisma тохируулахын тулд дараах алхмуудыг дагана уу:

### Алхам 1: Dependencies Нэмэх

`apps/your-project/package.json` файлд дараах dependencies-ийг нэм:

```json
{
  "dependencies": {
    "@prisma/adapter-pg": "^7.2.0",
    "@prisma/client": "^7.2.0",
    "dotenv": "^17.2.3",
    "pg": "^8.16.3",
    "prisma": "^7.2.0",
    "tsx": "^4.21.0"
  }
}
```

Дараа нь:
```bash
npm install --legacy-peer-deps
```

### Алхам 2: Prisma Folder Үүсгэх

```bash
cd apps/your-project
mkdir prisma
```

### Алхам 3: Schema File Үүсгэх

`apps/your-project/prisma/schema.prisma` файл үүсгэ:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

// Өөрийн models энд бич
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Алхам 4: Prisma Config Үүсгэх

`apps/your-project/prisma.config.ts` файл үүсгэ:

```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

### Алхам 5: Environment Variables

`apps/your-project/.env` файл үүсгэ:

```bash
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

**Чухал:** `.gitignore` файлд `.env` нэмсэн эсэхийг шалга:

```
# .env файлуудыг commit хийхгүй
.env
.env.local

# Prisma generated файлууд
/src/generated/
```

### Алхам 6: Prisma Client Singleton Үүсгэх

`apps/your-project/src/lib/prisma.ts` файл үүсгэ:

```typescript
import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// PostgreSQL connection pool үүсгэх
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Prisma adapter үүсгэх
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### Алхам 7: Nx Targets Нэмэх

`apps/your-project/project.json` файлд Prisma targets нэм:

```json
{
  "targets": {
    "prisma:generate": {
      "executor": "nx:run-commands",
      "options": {
        "command": "prisma generate",
        "cwd": "apps/your-project"
      }
    },
    "prisma:migrate": {
      "executor": "nx:run-commands",
      "options": {
        "command": "prisma migrate dev",
        "cwd": "apps/your-project"
      }
    },
    "prisma:studio": {
      "executor": "nx:run-commands",
      "options": {
        "command": "prisma studio",
        "cwd": "apps/your-project"
      }
    },
    "prisma:push": {
      "executor": "nx:run-commands",
      "options": {
        "command": "prisma db push",
        "cwd": "apps/your-project"
      }
    },
    "build": {
      "executor": "@nx/next:build",
      "outputs": ["{options.outputPath}"],
      "dependsOn": ["prisma:generate"],
      "options": {
        "root": "apps/your-project",
        "outputPath": "dist/apps/your-project"
      }
    },
    "dev": {
      "executor": "@nx/next:server",
      "dependsOn": ["prisma:generate"],
      "options": {
        "buildTarget": "your-project:build",
        "dev": true
      }
    },
    "test": {
      "dependsOn": ["prisma:generate"]
    },
    "lint": {
      "dependsOn": ["prisma:generate"]
    }
  }
}
```

### Алхам 8: Эхний Client Generate Хийх

```bash
nx run your-project:prisma:generate
```

### Алхам 9: Database Бэлтгэх

**Сонголт A: Migration ашиглах (Production-д зориулсан)**
```bash
nx run your-project:prisma:migrate
```

**Сонголт B: Push ашиглах (Development-д хурдан туршилт)**
```bash
nx run your-project:prisma:push
```

### Алхам 10: Code Дээр Ашиглах

API route дээр Prisma ашиглах:

```typescript
// apps/your-project/src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
```

### Нийтлэг Алдаа Болон Шийдэл

**Алдаа 1:** `PrismaClient is unable to run in this browser environment`
- **Шийдэл:** API routes дээр л Prisma ашиглах, client components дээр биш

**Алдаа 2:** `Can't reach database server`
- **Шийдэл:** DATABASE_URL зөв эсэхийг шалгах, database ажиллаж байгаа эсэхийг шалгах

**Алдаа 3:** `Module not found: Can't resolve '../generated/prisma'`
- **Шийдэл:** `prisma generate` ажиллуулах

**Алдаа 4:** Schema өөрчлөсөн ч хуучин бүтэц харагдах
- **Шийдэл:** `prisma generate` дахин ажиллуулах, dev server restart хийх

---

## Sample App-ийн Файлуудын Бүтэц

- `prisma/schema.prisma` - Database schema тодорхойлолт
- `prisma.config.ts` - Prisma тохиргоо
- `.env` - Орчны хувьсагчид (DATABASE_URL)
- `src/lib/prisma.ts` - Prisma client singleton
- `specs/todos-api.spec.ts` - Todo API тестүүд
- `specs/todos-id-api.spec.ts` - Todo [id] API тестүүд

## Орчны Тохиргоо

1. `.env.example`-ийг `.env` болгож хуулах (аль хэдийн үүссэн)
2. `.env` файл дахь `DATABASE_URL`-ийг өөрийн database холболтын мэдээллээр шинэчлэх

```bash
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

## Нийтлэг Командууд

Бүх Prisma командууд monorepo-ийн үндсэн folder-оос Nx ашиглан ажиллуулна:

```bash
# Prisma Client үүсгэх
nx run sample:prisma:generate

# Migration үүсгэж ажиллуулах
nx run sample:prisma:migrate

# Schema өөрчлөлтийг database руу шууд оруулах (migration-гүйгээр)
nx run sample:prisma:push

# Prisma Studio нээх
nx run sample:prisma:studio
```

Эсвэл `apps/sample` folder-оос шууд ажиллуулж болно:

```bash
cd apps/sample
npx prisma generate
npx prisma migrate dev
npx prisma db push
npx prisma studio
```

## Автоматаар Generate Хийх

Build, dev, test, lint командууд автоматаар `prisma:generate` ажиллуулдаг:

```bash
nx build sample    # Prisma generate → Build
nx dev sample      # Prisma generate → Dev server
nx test sample     # Prisma generate → Tests
nx lint sample     # Prisma generate → Linter
```

Энэ нь таны Prisma client үргэлж schema-тай синхронд байхыг баталгаажуулна.

## Үүсгэгдсэн Файлууд

Prisma Client нь `src/generated/prisma` folder руу үүсдэг (schema.prisma дээр тохируулсан).

## Холболт Турших

Test API route `/api/prisma-test` дээр байна:

```bash
# Dev server эхлүүлэх
nx run sample:dev

# Холболт турших (өөр terminal дээр)
curl http://localhost:3001/api/prisma-test

# Test бичлэгүүдийг устгах
curl -X DELETE http://localhost:3001/api/prisma-test
```

Эсвэл `http://localhost:3001/api/prisma-test` руу browser дээрээ ор.

## Code Дээр Ашиглах

Prisma client singleton-ийг `src/lib/prisma.ts`-аас импортлох:

```typescript
import { prisma } from '../lib/prisma';

// Database query хийх
const todos = await prisma.todo.findMany();
```

## Database Schema

Schema нь `apps/sample/prisma/schema.prisma` дээр байна. Шинэ model-үүдээ тэнд нэмнэ.

### Одоогийн Models

**Todo Model:**
```prisma
model Todo {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Monorepo дахь app бүр өөрийн Prisma schema болон database-тай байж болно.

## Todo Application

Бүрэн ажилладаг Todo app жишээ үүссэн:

### API Endpoints

**GET /api/todos** - Бүх todo-г авах
```bash
curl http://localhost:3001/api/todos
```

**POST /api/todos** - Шинэ todo үүсгэх
```bash
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Миний ажил", "description": "Дэлгэрэнгүй тайлбар"}'
```

**PATCH /api/todos/:id** - Todo засварлах
```bash
curl -X PATCH http://localhost:3001/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**DELETE /api/todos/:id** - Todo устгах
```bash
curl -X DELETE http://localhost:3001/api/todos/1
```

### UI Хуудас

Todo app-ийн интерактив хуудас:
- URL: `http://localhost:3001/todos`
- Features:
  - ✓ Шинэ todo үүсгэх
  - ✓ Todo-г гүйцэтгэсэн/гүйцэтгээгүй гэж тэмдэглэх
  - ✓ Todo устгах
  - ✓ Үүсгэсэн огноо харах
  - ✓ Нийт болон гүйцэтгэсэн todo-г тоолох

## Тестүүд

### Test Файлууд

Jest тестүүд `specs/` folder дээр байна:
- `specs/todos-api.spec.ts` - GET & POST /api/todos тестүүд
- `specs/todos-id-api.spec.ts` - PATCH & DELETE /api/todos/:id тестүүд

### Тест Ажиллуулах

```bash
# Бүх тестийг ажиллуулах
nx test sample

# Зөвхөн Todo API тестүүд
nx test sample -- todos-api

# Тодорхой файл
nx test sample -- todos-id-api
```

### Test Coverage

**GET /api/todos:**
- ✓ Бүх todo-г амжилттай буцаах
- ✓ Хоосон array буцаах
- ✓ Database алдаануудыг зөв дамжуулах

**POST /api/todos:**
- ✓ Title болон description-тай todo үүсгэх
- ✓ Description-гүй todo үүсгэх
- ✓ Title, description-ий хоосон зайг арилгах
- ✓ Хоосон title-ийг татгалзах
- ✓ Зөвхөн хоосон зайтай title-ийг татгалзах
- ✓ Database алдаануудыг зөв дамжуулах

**PATCH /api/todos/:id:**
- ✓ Todo title шинэчлэх
- ✓ Description шинэчлэх
- ✓ Completed status өөрчлөх
- ✓ Олон талбарыг нэгэн зэрэг шинэчлэх
- ✓ Description-ийг null болгох
- ✓ Хоосон зайг арилгах
- ✓ Буруу ID-г татгалзах
- ✓ Байхгүй todo-г зөв дамжуулах
- ✓ Database алдаануудыг зөв дамжуулах

**DELETE /api/todos/:id:**
- ✓ Todo-г амжилттай устгах
- ✓ Буруу ID-г татгалзах
- ✓ Байхгүй todo-г зөв дамжуулах
- ✓ Database алдаануудыг зөв дамжуулах

### Test Бичих

Шинэ API route-д тест нэмэхийн тулд:

1. `specs/` folder дээр `.spec.ts` файл үүсгэ
2. Prisma client-ийг mock хий:
```typescript
/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { prisma } from '../src/lib/prisma';

jest.mock('../src/lib/prisma', () => ({
  prisma: {
    todo: {
      findMany: jest.fn(),
      // ...
    },
  },
}));
```

3. Test case-үүд бич:
```typescript
it('should handle success case', async () => {
  (prisma.todo.findMany as jest.Mock).mockResolvedValue([]);

  const request = new NextRequest('http://localhost:3000/api/todos');
  const response = await GET(request);
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data.success).toBe(true);
});
```

### Огноо Шалгах

JSON-ээр дамжиж буй огноо талбаруудыг шалгахдаа `expect.any(String)` ашигла:

```typescript
expect(data.data).toEqual({
  id: 1,
  title: 'Test',
  createdAt: expect.any(String),  // Огноо string болж хувирдаг
  updatedAt: expect.any(String),
});
```

## Зөвлөмжүүд

- Schema өөрчлөх бүрт `prisma generate` ажиллуул
- Production дээр migration ашигла (`prisma migrate`), `db push` биш
- Prisma Studio-г database дата харахад ашигла
- Test бичихдээ Prisma client-ийг үргэлж mock хий
- Commit хийхийн өмнө бүх тестүүдийг ажиллуулж шалга
