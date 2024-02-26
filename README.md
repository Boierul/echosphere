# Echosphere.

Minimalistic full-stack webapplication that connect users around the world and spread their ideas.

[![Echosphere1.png](https://i.postimg.cc/dtnG11jd/Echosphere1.png)](https://postimg.cc/bsDZVqMN)
[![Echosphere2.png](https://i.postimg.cc/NGncw8Wr/Echosphere6.png)](https://postimg.cc/gr35VhcY)
[![Echosphere3.png](https://i.postimg.cc/vB1Nwt0Z/Echosphere7.png)](https://postimg.cc/N9c41mh3)
[![Echosphere4.png](https://i.postimg.cc/m248m4WD/Echosphere12.png)](https://postimg.cc/fkHcb6Ln)

## Demo


## Installation Instructions

1. Clone the repository
````markdown
git clone https://github.com/Boierul/echosphere.git
````
2. Navigate to the project folder
````markdown
cd eth-arbitrage-backend
````
3. Install dependencies
````markdown
npm install
````
4. Start the development server
````markdown
npm run dev
````
5. Set up the environment variables by creating a `.env` file in the project root folder.
Fill in the required values based on the example below.

6. Open [http://localhost:3000](http://localhost:3000) to access the development website

## Environtent variables

```.env
# -----------------------------------------------------------------------------
# Application
# -----------------------------------------------------------------------------
BASE_URL=http://localhost:3000

# -----------------------------------------------------------------------------
# Authentication (NextAuth.js)
# -----------------------------------------------------------------------------
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=""

GITHUB_ID=""
GITHUB_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# -----------------------------------------------------------------------------
# Database (PostgreSQL - Railway)
# -----------------------------------------------------------------------------
DATABASE_URL=postgresql://
# If you get the Error: P1002 while npm run migrate:dev
PRISMA_SCHEMA_DISABLE_ADVISORY_LOCK=false

# -----------------------------------------------------------------------------
# OpenAI ChatGPT
# -----------------------------------------------------------------------------
OPENAI_API_KEY=""

# -----------------------------------------------------------------------------
# Stripe
# -----------------------------------------------------------------------------
STRIPE_API_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_SUBSCRIPTION_PRICE_ID=""
```

## Features
1. View post from user all around the internet
2. Share ideas in form of posts
3. Maybe get some post suggestion from the ChatGPT suggestion button
4. Comment every possible post
5. Like posts that you enjoy
6. Delete posts that you may think are not good enough
7. Make a Stripe payment to get an awesome badge
8. Login easily with GitHub or Google account
9. Light/Dark Mode

## Technologies

1. Next.js, TypeScript, TailwindCSS & shadcn/ui for minimalistic yet modern look
2. PostgreSQL, PrismaORM for DB management
3. Vercel & RailwayDB for cloud hosting
4. OAuth 2.0 with Next-Auth for seamless authentication/authorization
5. Stripe payments 
6. OAuth 2.0 with Next-Auth
7. ChatGPT integration for quick post suggestions
