'use client';

import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';


export default function Navbar() {

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">
            <Link href='/'>
              <Image src='/PlatformLogo.png' alt='logo' width={100} height={100} className='w-[70%] h-[70%]' />
            </Link>
          </div>

          {/* Nav Items */}
          <ul className="hidden md:flex space-x-6 text-lg gap-2">
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
        <div className="flex items-center space-x-4 gap-3">
          {/* Search Bar */}
          <SearchBar/>

          <button className="text-lg font-medium hover:underline">Login</button>
          <button className="text-lg font-medium hover:underline">Sign Up</button>
          <button className="text-xl p-2 rounded-full bg-gray-200">🛒</button>
        </div>
      </div>
    </nav>
  );
}
