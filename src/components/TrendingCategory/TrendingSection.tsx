import Image from "next/image";

export function TrendingCategory() {
    return (
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Trending Category</h2>
          <div className="flex space-x-4 overflow-x-scroll no-scrollbar">
            {['hoodies', 'jackets', 'dress', 'shoes', 'jeans', 'shirt', 'sweater'].map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-60 bg-white rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={`/${category}.jpg`}
                  alt={category}
                  className="w-full h-44 object-cover"
                  width={500}
                  height={500}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }