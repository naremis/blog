import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { url } from 'inspector';
import logo from '../public/naremis.png';
const Header = () => {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/" as="/" passHref={true} prefetch={true}>
          <Image
            className="object-contain cursor-pointer"
            src={require('../public/naremis.png')}
            width={180}
            height={50}
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5 mt-3">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-orange-600 px-4 py-1 rounded-full">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-orange-600 mt-3">
        <h3>Sign In</h3>
        <h3 className="border px-4 py-1 rounded-full border-orange-600">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
