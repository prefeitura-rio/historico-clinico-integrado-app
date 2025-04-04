'use client';

import React from 'react';

interface FeedbackButtonProps {
  onClick?: () => void;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-1/2 right-0 -translate-y-1/2 -translate-x-4 origin-right -rotate-90 bg-blue-600 text-white px-4 py-2 rounded-t-md shadow-lg hover:bg-blue-700 transition-all z-50"
      data-tally-open="mY9zqd"
    >
      Feedback
    </button>
  );
};

export default FeedbackButton;