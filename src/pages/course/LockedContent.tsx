import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Type definitions
interface Playlist {
  playlist: {
    _id: string;
    title: string;
    description: string;
    videoCount: number;
  }
}

interface PlaylistsData {
  data: Playlist[];
}

interface LockedContentProps {
  playlists: PlaylistsData | undefined;
  stripePromise: Promise<Stripe | null>;
  setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
  isSubscribed: boolean;
}

const LockedContent: React.FC<LockedContentProps> = ({
  playlists,
  stripePromise,
  setIsSubscribed,
  isSubscribed
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (showCheckout) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6">
        <Elements stripe={stripePromise}>
          <CheckoutForm
            setIsSubscribed={setIsSubscribed}
            isSubscribed={isSubscribed}
          />
        </Elements>
      </div>
    );
  }

  return (
    <div className="relative h-[50vh]">
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="bg-black/80 p-8 rounded-xl text-center max-w-md mx-4 ">
          <div
            className="inline-block mb-6 text-[#637CFF]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Lock
              size={48}
              className={`transition-all duration-300 ${isHovered ? 'rotate-12 scale-110' : ''
                } animate-pulse`}
            />
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Course Locked
          </h2>

          <p className="text-gray-300 mb-6">
            Get access to all courses and premium content by completing your enrollment process.
          </p>

          <button
            onClick={() => setShowCheckout(true)}
            className="group bg-transparent border-2 border-[#637CFF] 
               text-white font-semibold px-6 py-3 rounded-lg
               transition-all duration-300 
               hover:bg-[#637CFF] hover:text-black 
               hover:shadow-lg hover:shadow-[#637CFF]/20
               active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <Unlock size={20} className="transition-transform duration-300 group-hover:-rotate-12" />
              Proceed to Payment
            </span>
          </button>

        </div>
      </div>


      {/* CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default LockedContent;
