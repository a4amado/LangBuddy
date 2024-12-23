# LangBuddy

A language learning platform that connects users for language exchange and practice.

## Features

- User authentication with NextAuth
- Real-time chat using Pusher
- Language proficiency tracking
- User profiles and recommendations
- Post sharing and interactions
- Responsive design with Tailwind CSS

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- tRPC for type-safe APIs
- Prisma with PostgreSQL
- NextAuth.js for authentication
- Pusher for real-time features
- Tailwind CSS for styling

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd langbuddy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Fill in the environment variables in .env
```

4. Set up the database:
```bash
# Start your PostgreSQL database
npm run db:generate
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── ui/             # UI components
│   ├── layout/         # Layout components
│   ├── forms/          # Form components
│   └── ...
├── lib/                # Utility libraries
├── server/             # Server-side code
│   ├── api/           # tRPC routers
│   ├── auth/          # Authentication
│   └── db/            # Database config
├── styles/            # Global styles
├── types/             # TypeScript types
└── utils/             # Utility functions
```

## Development

- Run tests: `npm test`
- Format code: `npm run format`
- Type check: `npm run type-check`
- Lint: `npm run lint`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License. 