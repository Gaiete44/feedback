// app/_lib/seed.ts
import { prisma } from './db';

async function seed() {
  await prisma.menuItem.createMany({
    data: [
      {
        name: "Patatas Bravas",
        description: "Crispy potatoes with spicy tomato sauce and aioli",
        price: 6.99,
        category: "TAPAS",
        image: "/images/patatas-bravas.jpg"
      },
      {
        name: "Gambas al Ajillo",
        description: "Garlic shrimp with olive oil and chili flakes",
        price: 9.99,
        category: "TAPAS",
        image: "/images/gambas.jpg"
      },
      {
        name: "Croquetas de Jamón",
        description: "Creamy ham croquettes with crispy breadcrumb coating",
        price: 7.99,
        category: "TAPAS",
        image: "/images/croquetas.jpg"
      },
      {
        name: "Tortilla Española",
        description: "Traditional Spanish omelet with potatoes and onions",
        price: 6.99,
        category: "TAPAS",
        image: "/images/tortilla.jpg"
      },
      {
        name: "Chorizo al Vino",
        description: "Sautéed chorizo in red wine sauce",
        price: 8.99,
        category: "TAPAS",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Pimientos de Padrón",
        description: "Blistered Padrón peppers with sea salt",
        price: 6.99,
        category: "TAPAS",
        image: "/images/padron.jpg"
      }
    ]
  });
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());