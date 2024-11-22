// app/_lib/seed.ts
import { prisma } from './db';

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
        image: "/images/chorizo.jpg"
      },
      {
        name: "Pulpo a la Gallega",
        description: "Galician-style octopus with paprika and potatoes",
        price: 14.99,
        category: "SEAFOOD",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Calamares Fritos",
        description: "Crispy fried squid rings with lemon and aioli",
        price: 10.99,
        category: "SEAFOOD",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Mejillones en Escabeche",
        description: "Marinated mussels in paprika and vinegar sauce",
        price: 9.99,
        category: "SEAFOOD",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Boquerones en Vinagre",
        description: "Marinated fresh anchovies with garlic and parsley",
        price: 8.99,
        category: "SEAFOOD",
        image: "/images/chorizo.jpg"
      },

      // Meat Tapas
      {
        name: "Chorizo al Vino",
        description: "Spanish chorizo cooked in red wine",
        price: 9.99,
        category: "MEAT",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Albóndigas en Salsa",
        description: "Spanish meatballs in rich tomato sauce",
        price: 10.99,
        category: "MEAT",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Jamón Ibérico",
        description: "Premium Iberian ham sliced thin",
        price: 18.99,
        category: "MEAT",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Croquetas de Jamón",
        description: "Creamy ham croquettes with béchamel",
        price: 8.99,
        category: "MEAT",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Pintxos Morunos",
        description: "Spiced pork skewers with Moorish influences",
        price: 11.99,
        category: "MEAT",
        image: "/images/chorizo.jpg"
      },

      // Vegetarian Tapas
      {
        name: "Patatas Bravas",
        description: "Crispy potatoes with spicy tomato sauce and aioli",
        price: 7.99,
        category: "VEGETARIAN",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Tortilla Española",
        description: "Traditional Spanish potato and onion omelette",
        price: 8.99,
        category: "VEGETARIAN",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Pimientos de Padrón",
        description: "Blistered Padrón peppers with sea salt",
        price: 8.99,
        category: "VEGETARIAN",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Berenjenas con Miel",
        description: "Fried eggplant drizzled with honey",
        price: 8.99,
        category: "VEGETARIAN",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Espinacas con Garbanzos",
        description: "Sautéed spinach with chickpeas and cumin",
        price: 7.99,
        category: "VEGETARIAN",
        image: "/images/chorizo.jpg"
      },

      // Cheese Tapas
      {
        name: "Queso Manchego",
        description: "Aged sheep's milk cheese from La Mancha",
        price: 9.99,
        category: "CHEESE",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Queso de Cabra con Miel",
        description: "Goat cheese with honey and walnuts",
        price: 10.99,
        category: "CHEESE",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Tabla de Quesos",
        description: "Selection of Spanish cheeses with membrillo",
        price: 16.99,
        category: "CHEESE",
        image: "/images/chorizo.jpg"
      },

      // Cold Tapas
      {
        name: "Gazpacho Andaluz",
        description: "Classic cold tomato soup with garnishes",
        price: 6.99,
        category: "COLD",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Ensaladilla Rusa",
        description: "Spanish potato salad with tuna and vegetables",
        price: 7.99,
        category: "COLD",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Pan con Tomate",
        description: "Toasted bread with tomato, garlic, and olive oil",
        price: 5.99,
        category: "COLD",
        image: "/images/chorizo.jpg"
      },

      // Regional Specialties
      {
        name: "Paella Tapas",
        description: "Mini paella with saffron rice and seafood",
        price: 13.99,
        category: "SPECIALTIES",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Fabada Asturiana",
        description: "Rich bean stew with chorizo and morcilla",
        price: 11.99,
        category: "SPECIALTIES",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Pimientos del Piquillo Rellenos",
        description: "Stuffed piquillo peppers with cod brandade",
        price: 10.99,
        category: "SPECIALTIES",
        image: "/images/chorizo.jpg"
      },

      // Modern Tapas
      {
        name: "Ceviche de Corvina",
        description: "Sea bass ceviche with ají amarillo",
        price: 13.99,
        category: "MODERN",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Carrillada Ibérica",
        description: "Slow-cooked Iberian pork cheeks in wine sauce",
        price: 14.99,
        category: "MODERN",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Huevos Rotos con Jamón",
        description: "Broken eggs over fries with Iberian ham",
        price: 12.99,
        category: "MODERN",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Tartar de Atún",
        description: "Tuna tartare with avocado and soy-citrus dressing",
        price: 15.99,
        category: "MODERN",
        image: "/images/chorizo.jpg"
      },
      {
        name: "Alcachofas Confitadas",
        description: "Confit artichokes with jamón shavings",
        price: 11.99,
        category: "MODERN",
        image: "/images/chorizo.jpg"
      }
    ]
  });

  console.log('Database has been seeded with 30 tapas dishes! 🥘');
}

seed()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });