import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  rating: number;
  reviews: number;
}>;

const StarRating = ({ rating, reviews }: Props) => {
  const filledStars = Math.floor(rating); // Fully filled stars
  const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half-filled star
  const totalStars = 5;

  return (
    <div className="flex items-center mb-2">
      <span className="text-yellow-500 flex">
        {[...Array(totalStars)].map((_, i) => {
          if (i < filledStars) {
            // Fully filled star
            return (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            );
          } else if (i === filledStars && hasHalfStar) {
            // Half-filled star
            return (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <defs>
                  <linearGradient id={`halfStar${i}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  fill={`url(#halfStar${i})`}
                />
              </svg>
            );
          } else {
            // Unfilled star
            return (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            );
          }
        })}
      </span>
      <span className="text-gray-500 ml-2">({reviews} reviews)</span>
    </div>
  );
};

export default StarRating;
