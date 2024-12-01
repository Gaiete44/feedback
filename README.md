# Tapas Restaurant Application

A modern, full-stack restaurant application built with Next.js 15, Prisma, and PostgreSQL. This application allows customers to browse menus, place orders, and provide feedback, while giving restaurant staff access to customer feedback through a dedicated dashboard.

## Features

- 🏠 **Homepage**: Welcoming landing page with restaurant information
- 🍽️ **Menu System**: 
  - Browse menu items by category
  - Dynamic menu item cards with images
  - Real-time cart updates
- 🛒 **Order Management**:
  - Add/remove items from cart
  - Adjust quantities
  - Checkout process
- ⭐ **Feedback System**:
  - Rate individual menu items
  - Provide written feedback
  - View aggregated feedback in chef's dashboard
- 👨‍🍳 **Chef's Dashboard**:
  - View all customer feedback
  - Filter feedback by timeframe
  - See average ratings and comments
- 🎨 **Responsive Design**:
  - Mobile-first approach
  - Dark/Light mode support
  - Clean, modern UI

## Tech Stack

- **Frontend**:
  - Next.js 15.0.3
  - React
  - TailwindCSS
  - Radix UI Components

- **Backend**:
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL (Vercel)

## Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- npm or yarn package manager

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=[your url]
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/feedback.git
cd feedback
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Seed the database:
```bash
npx tsx app/_lib/seed.ts
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
app/
  ├─ _components/      # Shared React components
  ├─ _context/         # React context providers
  ├─ _lib/            # Utility functions and database client
  ├─ _types/          # TypeScript type definitions
  ├─ (routes)/        # Application routes
  │   ├─ menu/
  │   ├─ chef-dashboard/
  │   ├─ feedback/
  │   └─ thank-you/
  ├─ api/             # API routes
  └─ public/          # Static assets
      └─ images/      # Menu images
-
```

## API Routes

- `GET /api/menu` - Fetch all menu items
- `POST /api/orders` - Create a new order
- `GET /api/orders/[orderId]` - Fetch specific order details
- `POST /api/feedback` - Submit feedback for menu items
- `GET /api/feedback/summary` - Get aggregated feedback data

## Deployment

This project is configured for deployment on Vercel. The build process includes:

1. Prisma client generation
2. Database schema push
3. Next.js build

Configure these build settings in your Vercel project:

```json
{
  "buildCommand": "prisma generate && prisma db push && next build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is unlicensed

## Acknowledgments

- Next.js team for the fantastic framework
- Vercel for the hosting platform
- Radix UI for the component library
- All contributors and users of the application