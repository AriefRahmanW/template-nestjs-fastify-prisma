### Template NestJS

#### Tech Stack
- Fastify
- Prisma ORM

#### Nest Configuration
- Environment variable
- Validation Pipe
- API Docs (Swagger)
- Logger

### Command
#### PNPM
1. Install packages
```pnpm install```
2. Run dev
```pnpm run start:dev```
3. Run production
```
pnpm run build
pnpm run start:prod
```

#### Prisma Command
1. Migrate
```npx prisma migrate dev --name init```
2. Seedig
```npx prisma db seed```

### Refrerence
- https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0