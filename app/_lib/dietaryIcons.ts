// app/_lib/dietaryIcons.ts
export type DietaryInfo = {
    vegan: boolean;
    vegetarian: boolean;
    glutenFree: boolean;
    nutFree: boolean;
    dairyFree: boolean;
    spicy: boolean;
  };
  
  export const icons = {
    vegan: '🌱',
    vegetarian: '🥬',
    glutenFree: '🌾',
    nutFree: '🥜',
    dairyFree: '🥛',
    spicy: '🌶️'
  } as const;
  
  export const iconDescriptions = {
    vegan: 'Vegan',
    vegetarian: 'Vegetarian',
    glutenFree: 'Gluten Free',
    nutFree: 'Contains Nuts',
    dairyFree: 'Dairy Free',
    spicy: 'Spicy'
  } as const;

  export const dietaryIcons = {
    vegan: {
      icon: '🌱',
      label: 'Vegan',
      color: 'text-green-600'
    },
    vegetarian: {
      icon: '🥬',
      label: 'Vegetarian',
      color: 'text-green-500'
    },
    glutenFree: {
      icon: '🌾',
      label: 'Gluten Free',
      color: 'text-amber-600'
    },
    nutFree: {
      icon: '🥜',
      label: 'Contains Nuts',
      color: 'text-amber-700'
    },
    dairyFree: {
      icon: '🥛',
      label: 'Dairy Free',
      color: 'text-blue-500'
    },
    spicy: {
      icon: '🌶️',
      label: 'Spicy',
      color: 'text-red-500'
    }
  } as const;