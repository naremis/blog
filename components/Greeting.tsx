import React from 'react';
import Image from 'next/image';
function Greeting() {
  return (
    <div className="flex justify-between items-center bg-orange-400 border-y border-black py-10 my-10 lg:my-0">
      <div className="px-10 space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">
          <span className="underline decoration-black decoration-4 mr-5">
            Naremis
          </span>
          Blog is a place to write, read, and connect
        </h1>
        <h2>
          It's easy and free to post your thinking on any topic and connect with
          millions of readers.
        </h2>
      </div>
      <div>
        <Image
          className="hidden md:inline-flex h-32 lg:h-full"
          src="/naremis_m.svg"
          alt="Naremis"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}

export default Greeting;
