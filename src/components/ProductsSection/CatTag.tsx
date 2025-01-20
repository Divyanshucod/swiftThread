// catTag.tsx
type CatTagProps = {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
  };
  
  export default function CatTag({ categories, activeCategory, onCategoryChange }: CatTagProps) {
    return (
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full border-2 ${
              activeCategory === category ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
            } transition hover:bg-green-700 hover:text-white`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  }