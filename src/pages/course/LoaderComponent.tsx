import { Loader2 } from 'lucide-react';

const LoaderComponent = () => {
  return (
    <div className="min-h-screen z-10 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 animate-fadeIn">
        <Loader2 className="w-16 h-16 text-yellow-500 animate-spin mx-auto" />

        {/* Shimmer loading cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mt-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg h-32 animate-pulse"
            />
          ))}
        </div>

        <p className="text-gray-400 text-lg animate-pulse">
          Loading your courses...
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoaderComponent;