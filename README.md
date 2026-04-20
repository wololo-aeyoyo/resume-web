# Humberto Resume Web

A personal resume website built with Next.js, styled with Tailwind CSS and shadcn/ui, and deployed via Docker.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui, tw-animate-css
- **Icons:** Lucide React
- **Runtime:** Node.js 24
- **Containerization:** Docker (multi-stage build)
- **CI/CD:** GitHub Actions → Docker Hub

## Getting Started

### Local Development (npm)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Local Development (Docker)

```bash
docker compose up dev
```

Open [http://localhost:3001](http://localhost:3001). Source files are mounted as a volume for hot reload.

### Production Build (Docker)

```bash
docker compose up app
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Start Next.js dev server             |
| `npm run build` | Build for production                 |
| `npm run start` | Start production server              |
| `npm run lint`  | Run ESLint                           |
| `npm run typecheck` | Run TypeScript type checking     |
| `npm run check` | Lint + typecheck + build             |

## CI/CD

Pushes to `master` or version tags (`v*`) trigger a GitHub Actions workflow that builds and pushes a Docker image to Docker Hub.

Required repository secrets:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

The published image is tagged with the branch name, semver version, and short commit SHA.

## Project Structure

```
src/
├── app/          # Next.js App Router pages and layouts
├── components/   # Reusable UI components
├── data/         # Static resume data
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
└── types/        # TypeScript type definitions
```

## License

MIT
