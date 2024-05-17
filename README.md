'''
# Coding Challenge Blog Application

This is a simple blog application built with Next.js and MongoDB. The application allows users to create, view, update, and delete blog posts.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## Features

- Create, view, update, and delete blog posts
- User-friendly UI with React and Next.js
- MongoDB for database storage
- Pagination and Search functionalities

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>= 12.x)
- npm or yarn
- MongoDB (local or cloud instance)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/EL-MANANIFatima/Coding-challenge.git
    cd Coding-challenge
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Application

1. Set up your environment variables (see [Environment Variables](#environment-variables)).

2. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3. Build and run the production server:

    ```bash
    npm run build
    npm start
    # or
    yarn build
    yarn start
    ```

## Project Structure

```plaintext
.
├── __tests__              # Test files
├── .next                  # Next.js build files
├── app
│   ├── components         # React components
│   │   ├── layout
│   │   ├── navbar
│   │   ├── pagination
│   │   └── postsTable
│   ├── pages              # Next.js pages
│   │   ├── api            # API routes
│   │   └── posts          # Blog post pages
│   ├── types              # TypeScript interfaces
│   │   └── intercaes.ts
│   ├── favicon.ico        # Favicon
│   ├── globals.css        # Global CSS
│   ├── layout.tsx         # Layout component
│   └── page.tsx           # Home page
├── node_modules           # Node.js modules
├── prisma                 # Prisma files
├── public                 # Public assets
├── utils                  # Utility functions
├── .env                   # Environment variables
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore file
├── jest.config.ts         # Jest configuration
├── jest.setuo.ts          # Jest setup
├── next-env.d.ts          # Next.js environment types
├── next.config.mjs        # Next.js configuration
├── package-lock.json      # NPM lock file
└── package.json           # NPM scripts and dependencies
```

## API Routes

- `GET /api/posts` - Fetch all blog posts
- `GET /api/posts/:id` - Fetch a single blog post by ID
- `POST /api/posts` - Create a new blog post
- `PUT /api/posts/:id` - Update a blog post by ID
- `DELETE /api/posts/:id` - Delete a blog post by ID

## Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```plaintext
DATABASE_URL=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a pull request.

```

