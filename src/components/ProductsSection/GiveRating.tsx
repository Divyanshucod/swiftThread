import React from 'react';

type Props = {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
};

function GiveRating({ rating, setRating }: Props) {
  const handleStarClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="py-2 px-3 absolute -bottom-12 left-0 bg-white rounded-lg shadow-md flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`cursor-pointer text-2xl ${
            value <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          onMouseDown={(e) => e.preventDefault()} // Prevents losing focus
          onClick={() => handleStarClick(value)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default GiveRating;
