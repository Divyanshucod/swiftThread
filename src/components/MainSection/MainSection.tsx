import "@/components/MainSection/mainStyle.css"

export function MainSection() {
    return (
      <header className="bg-white py-16 text-center">
        <div className="relative mt-8 inline-block">
          <button className="px-6 py-2 text-sm text-gray-200 rounded-full border-2 border-gray-400 relative overflow-hidden">
            <span className="relative z-10">New spring collection 2023</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent animate-shimmer"></div>
          </button>
        </div>
        <h1 className="text-4xl font-extrabold">Where Style Speaks, Trends Resonate</h1>
        <p className="mt-4 text-lg">Unveiling a fashion destination where trends blend seamlessly with your style aspirations.</p>
        <button className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700">New Collection</button>
      </header>
    );
  }
