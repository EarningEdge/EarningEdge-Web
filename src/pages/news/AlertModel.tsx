const AlertModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeWidth="2" d="M12 8v4m0 4h.01" />
          </svg>
          <h3 className="text-lg font-semibold text-white">No Results Found</h3>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          Please enter a valid search query to find news articles.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlertModal;