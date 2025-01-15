'use client'
import { Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = React.useState<boolean>(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">
            <Image src='/platformLogo.jpg' alt='logo' width={100} height={100} className='w-[100%] h-[100%]'/>
          </div>

          {/* Nav Items */}
          <ul className="hidden md:flex space-x-6">
            <li className="dropdown relative">
              <button className="hover:underline">Man/Woman</button>
              <div className="dropdown-menu absolute hidden bg-white shadow-lg rounded mt-2">
                <Link href="#" className="block px-4 py-2 hover:bg-gray-200">Man</Link>
                <Link href="#" className="block px-4 py-2 hover:bg-gray-200">Woman</Link>
              </div>
            </li>
            <li><Link href="#" className="hover:underline">Trending</Link></li>
            <li><Link href="#" className="hover:underline">Sale</Link></li>
          </ul>
        </div>

        {/* Search and Account Options */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
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
              <div className="absolute top-0 left-full transform -translate-x-full flex items-center space-x-2 bg-white rounded-lg shadow px-4 py-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-0 focus:outline-none focus:ring-0"
                />
                <button className="text-white bg-blue-500 px-2 py-1 rounded-full">Filter</button>
              </div>
            </Transition>
          </div>

          <button className="text-lg font-medium hover:underline">Login</button>
          <button className="text-lg font-medium hover:underline">Sign Up</button>
          <button className="text-xl p-2 rounded-full bg-gray-200">🛒</button>
        </div>
      </div>
    </nav>
  );
}