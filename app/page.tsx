// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link 
            href="/menu"
            className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full text-lg font-medium hover:bg-orange-600 transition-colors"
          >
            View Menu
          </Link>
        </div>

        
  );
}
