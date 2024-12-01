// app/(routes)/menu/loading.tsx
export default function MenuLoading() {
    return (
      <div className="min-h-screen bg-warmWhite pb-20">
        <div className="bg-gradient-to-r from-terracotta-600 to-terracotta-700 text-white shadow-lg animate-pulse">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center">
              <div className="h-10 w-48 bg-white/20 rounded-lg"></div>
              <div className="h-10 w-24 bg-white/20 rounded-full"></div>
            </div>
            <div className="mt-2 h-6 w-64 bg-white/20 rounded-lg"></div>
          </div>
          <div className="mt-4 bg-warmWhite/10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-32 bg-white/20 rounded-full flex-shrink-0"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }