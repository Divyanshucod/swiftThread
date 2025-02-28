'use client'
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { FaUserCircle } from 'react-icons/fa';
import { PiTShirtDuotone } from 'react-icons/pi';

export default function Navbar() {
  const [menWomenVisible, setMenWomenVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setUserId(Cookies.get('userId') || null);
  }, []);

  const handleLogOut = () => {
    Cookies.remove('userId');
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50 h-24 flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between w-full">
        {/* Logo */}
        <div>
          <Link href='/'><Image src='/PlatformLogo.png' alt='logo' width={100} height={100} className='w-[70%] h-[70%]'/></Link>
        </div>

        {/* Mobile View Icons */}
        <div className="flex items-center space-x-4 md:hidden">
          {!searchOpen && (
            <button onClick={() => setSearchOpen(true)} className="text-xl p-2 rounded-full bg-gray-200">🔍</button>
          )}
          <Link href='/cart' className="text-xl p-2 rounded-full bg-gray-200">🛒</Link>
          <PiTShirtDuotone className="text-2xl cursor-pointer" onClick={() => setMenuOpen(true)} />
        </div>

        {/* Desktop View Navigation */}
        <ul className="hidden md:flex space-x-6 text-lg gap-2">
          <li className="relative">
            <button onClick={() => setMenWomenVisible(!menWomenVisible)} className="hover:underline">Men/Women</button>
            {menWomenVisible && (
              <div className="absolute bg-white shadow-lg rounded mt-2">
                <Link href="/products/query?gender=Men" className="block px-4 py-2 hover:bg-gray-200">Men</Link>
                <Link href="/products/query?gender=Women" className="block px-4 py-2 hover:bg-gray-200">Women</Link>
              </div>
            )}
          </li>
          <li><Link href="#" className="hover:underline">Trending</Link></li>
          <li><Link href="#" className="hover:underline">Sale</Link></li>
        </ul>

        {/* Account & Search Options */}
        <div className="hidden md:flex items-center space-x-4 gap-3">
          <SearchBar />
          {!userId ? (
            <>
              <Link href='/login' className="text-lg font-medium hover:underline">Login</Link>
              <Link href='/signup' className="text-lg font-medium hover:underline">Sign Up</Link>
            </>
          ) : (
            <FaUserCircle className="rounded-full h-10 w-10 cursor-pointer" onClick={handleLogOut} />
          )}
          <Link href='/cart' className="text-xl p-2 rounded-full bg-gray-200">🛒</Link>
        </div>
      </div>

      {/* Floating Search Bar for Small Screens */}
      {searchOpen && (
        <div className="fixed top-16 left-0 w-full flex justify-center bg-white py-2 shadow-lg">
          <div className="w-full max-w-md flex items-center px-4">
            <SearchBar />
            <button onClick={() => setSearchOpen(false)} className="ml-2 text-gray-600 text-xl">✖</button>
          </div>
        </div>
      )}

      {/* Mobile Side Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-full h-full bg-white shadow-lg transition-transform transform translate-x-0 z-50">
          <button onClick={() => setMenuOpen(false)} className="absolute top-4 left-4 text-xl">✖</button>
          <div className="flex flex-col items-center justify-center h-full space-y-6 text-lg">
            <Link href="/products/query?gender=Men" className="hover:underline" onClick={() => setMenuOpen(false)}>Men</Link>
            <Link href="/products/query?gender=Women" className="hover:underline" onClick={() => setMenuOpen(false)}>Women</Link>
            <Link href="#" className="hover:underline" onClick={() => setMenuOpen(false)}>Trending</Link>
            <Link href="#" className="hover:underline" onClick={() => setMenuOpen(false)}>Sale</Link>
            {!userId ? (
              <>
                <Link href='/login' className="hover:underline" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link href='/signup' className="hover:underline" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            ) : (
              <FaUserCircle className="rounded-full h-10 w-10 cursor-pointer" onClick={handleLogOut} />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
