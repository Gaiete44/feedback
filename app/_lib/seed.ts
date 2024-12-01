// app/_lib/seed.ts
import { prisma } from "./db";

async function seed() {
  // First, delete all existing data
  await prisma.feedback.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();

  // Seed new menu items
  await prisma.menuItem.createMany({
    data: [
      // Seafood Tapas
      {
        name: "Gambas al Ajillo",
        description: "Sizzling shrimp sautéed with garlic, chili, and olive oil",
        price: 12.99,
        category: "SEAFOOD",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
        nutFree: true,
        dairyFree: true,
        spicy: true
      },
      {
        name: "Pulpo a la Gallega",
        description: "Galician-style octopus with paprika and potatoes",
        price: 14.99,
        category: "SEAFOOD",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
        nutFree: true,
        dairyFree: true,
        spicy: false
      },
      {
        name: "Calamares Fritos",
        description: "Crispy fried squid rings with lemon and aioli",
        price: 10.99,
        category: "SEAFOOD",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        nutFree: true,
        dairyFree: false,
        spicy: false
      },

      // Meat Tapas
      {
        name: "Chorizo al Vino",
        description: "Spanish chorizo cooked in red wine",
        price: 9.99,
        category: "MEAT",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
        nutFree: true,
        dairyFree: true,
        spicy: true
      },
      {
        name: "Albóndigas en Salsa",
        description: "Spanish meatballs in rich tomato sauce",
        price: 10.99,
        category: "MEAT",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        nutFree: true,
        dairyFree: false,
        spicy: false
      },
      {
        name: "Jamón Ibérico",
        description: "Premium Iberian ham sliced thin",
        price: 18.99,
        category: "MEAT",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
        nutFree: true,
        dairyFree: true,
        spicy: false
      },

      // Vegetarian Tapas
      {
        name: "Patatas Bravas",
        description: "Crispy potatoes with spicy tomato sauce and aioli",
        price: 7.99,
        category: "VEGETARIAN",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: true,
        glutenFree: true,
        nutFree: true,
        dairyFree: false,
        spicy: true
      },
      {
        name: "Tortilla Española",
        description: "Traditional Spanish potato and onion omelette",
        price: 8.99,
        category: "VEGETARIAN",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: true,
        glutenFree: true,
        nutFree: true,
        dairyFree: false,
        spicy: false
      },
      {
        name: "Pimientos de Padrón",
        description: "Blistered Padrón peppers with sea salt",
        price: 8.99,
        category: "VEGETARIAN",
        image: "/images/chorizo.jpg",
        vegan: true,
        vegetarian: true,
        glutenFree: true,
        nutFree: true,
        dairyFree: true,
        spicy: true
      },

      // Cheese Tapas
      {
        name: "Queso Manchego",
        description: "Aged sheep's milk cheese from La Mancha",
        price: 9.99,
        category: "CHEESE",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: true,
        glutenFree: true,
        nutFree: true,
        dairyFree: false,
        spicy: false
      },
      {
        name: "Queso de Cabra con Miel",
        description: "Goat cheese with honey and walnuts",
        price: 10.99,
        category: "CHEESE",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: true,
        glutenFree: true,
        nutFree: false,
        dairyFree: false,
        spicy: false
      },

      // Specialties
      {
        name: "Paella Tapas",
        description: "Mini paella with saffron rice and seafood",
        price: 13.99,
        category: "SPECIALTIES",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
        nutFree: true,
        dairyFree: true,
        spicy: false
      },
      {
        name: "Fabada Asturiana",
        description: "Rich bean stew with chorizo and morcilla",
        price: 11.99,
        category: "SPECIALTIES",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
        nutFree: true,
        dairyFree: true,
        spicy: false
      },
      {
        name: "Pimientos del Piquillo Rellenos",
        description: "Stuffed piquillo peppers with cod brandade",
        price: 10.99,
        category: "SPECIALTIES",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
        nutFree: true,
        dairyFree: false,
        spicy: true
      },

      // Modern Tapas
      {
        name: "Ceviche de Corvina",
        description: "Sea bass ceviche with ají amarillo",
        price: 13.99,
        category: "MODERN",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
        nutFree: true,
        dairyFree: true,
        spicy: true
      },
      {
        name: "Carrillada Ibérica",
        description: "Slow-cooked Iberian pork cheeks in wine sauce",
        price: 14.99,
        category: "MODERN",
        image: "/images/chorizo.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
        nutFree: true,
        dairyFree: true,
        spicy: false
      }
    ]
  });

  console.log('Database has been seeded with tapas dishes! 🥘');
}

seed()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });