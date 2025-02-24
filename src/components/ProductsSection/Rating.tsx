export const Rating = ({ stars, count, color }) => {
    return (
      <div className="flex items-center gap-2">
        <span className="w-4 text-sm">{stars}★</span>
        <div className="flex-1 bg-gray-200 rounded h-2">
          <div
            className={`h-2 rounded ${color}`}
            style={{ width: `${(count / 237) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm">{count}</span>
      </div>
    );
  };

