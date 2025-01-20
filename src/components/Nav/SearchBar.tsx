'use client'
import { Transition } from '@headlessui/react';
import React, { useEffect, useRef } from 'react';
type Props = {}

const SearchBar = (props: Props) => {
    const [genderOpen, setGenderOpen] = React.useState(false);
    const [colorOpen, setColorOpen] = React.useState(false);
    const [selectedGender, setSelectedGender] = React.useState('');
    const [selectedColor, setSelectedColor] = React.useState('');
    const [priceRange, setPriceRange] = React.useState(50);
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
   const colors = ['red', 'blue', 'green', 'yellow', 'black'];
  


  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event:any) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="relative">
            <button onClick={() => setSearchOpen(!searchOpen)} className="text-xl p-2 rounded-full bg-gray-200">
              🔍
            </button>
            <Transition
              show={searchOpen}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 left-full transform -translate-x-full flex items-center space-x-2 bg-white rounded-lg shadow px-4 py-2 w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-0 focus:outline-none focus:ring-0 w-full"
                />
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="text-white bg-blue-500 px-2 py-1 rounded-full"
                >
                  Filter
                </button>
              </div>
            </Transition>

            {/* Filter Options */}
            <Transition
              show={filterOpen}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div ref={filterRef} className="absolute left-0 mt-4 bg-white shadow-lg rounded-lg p-4 w-80">
                {/* Gender Filter */}
                <div className="mb-4">
                  <button
                    onClick={() => setGenderOpen(!genderOpen)}
                    className="w-full text-left font-medium mb-2"
                  >
                    Gender
                  </button>
                  {genderOpen && (
                    <div className="ml-4">
                      {['Men', 'Women', 'Both'].map((gender) => (
                        <div key={gender} className="mb-1">
                          <label>
                            <input
                              type="radio"
                              name="gender"
                              value={gender}
                              checked={selectedGender === gender}
                              onChange={() => setSelectedGender(gender)}
                              className="mr-2"
                            />
                            {gender}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Color Filter */}
                <div className="mb-4">
                  <button
                    onClick={() => setColorOpen(!colorOpen)}
                    className="w-full text-left font-medium mb-2"
                  >
                    Color
                  </button>
                  {colorOpen && (
                    <div className="grid grid-cols-5 gap-2">
                      {colors.map((color) => (
                        <div
                          key={color}
                          className={`w-6 h-6 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'border-gray-700' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block font-medium mb-2">Price</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-right">${priceRange}</div>
                </div>
              </div>
            </Transition>
          </div>
  )
}

export default SearchBar