// app/_components/DietaryLegend.tsx
import { dietaryIcons } from '@/app/_lib/dietaryIcons';

export const DietaryLegend = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-joti text-gray-800 mb-4 text-center">Dietary Information</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {Object.entries(dietaryIcons).map(([key, config]) => (
          <div 
            key={key}
            className="flex items-center gap-2 justify-center bg-gray-50 p-3 rounded-lg"
          >
            <span className={`text-2xl ${config.color}`}>{config.icon}</span>
            <span className="text-sm text-gray-700 font-medium">
              {config.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};