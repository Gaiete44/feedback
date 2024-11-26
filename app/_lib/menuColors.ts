// app/_lib/menuColors.ts
type ColorScheme = {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    hover: string;
    light: string;
  };
  
  export const categoryColors: { [key: string]: ColorScheme } = {
    SEAFOOD: {
      primary: 'bg-sky-600',
      secondary: 'bg-sky-700',
      accent: 'bg-sky-500',
      text: 'text-sky-600',
      hover: 'hover:bg-sky-700',
      light: 'bg-sky-50',
    },
    MEAT: {
      primary: 'bg-red-600',
      secondary: 'bg-red-700',
      accent: 'bg-red-500',
      text: 'text-red-600',
      hover: 'hover:bg-red-700',
      light: 'bg-red-50',
    },
    VEGETARIAN: {
      primary: 'bg-emerald-600',
      secondary: 'bg-emerald-700',
      accent: 'bg-emerald-500',
      text: 'text-emerald-600',
      hover: 'hover:bg-emerald-700',
      light: 'bg-emerald-50',
    },
    CHEESE: {
      primary: 'bg-amber-600',
      secondary: 'bg-amber-700',
      accent: 'bg-amber-500',
      text: 'text-amber-600',
      hover: 'hover:bg-amber-700',
      light: 'bg-amber-50',
    },
    COLD: {
      primary: 'bg-indigo-600',
      secondary: 'bg-indigo-700',
      accent: 'bg-indigo-500',
      text: 'text-indigo-600',
      hover: 'hover:bg-indigo-700',
      light: 'bg-indigo-50',
    },
    SPECIALTIES: {
      primary: 'bg-violet-600',
      secondary: 'bg-violet-700',
      accent: 'bg-violet-500',
      text: 'text-violet-600',
      hover: 'hover:bg-violet-700',
      light: 'bg-violet-50',
    },
    MODERN: {
      primary: 'bg-fuchsia-600',
      secondary: 'bg-fuchsia-700',
      accent: 'bg-fuchsia-500',
      text: 'text-fuchsia-600',
      hover: 'hover:bg-fuchsia-700',
      light: 'bg-fuchsia-50',
    }
  };
  
  export const getColorScheme = (category: string): ColorScheme => {
    return categoryColors[category] || categoryColors.SPECIALTIES;
  };