'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchBox = () => {
  const [value, setValue] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto px-4">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          className="flex-grow px-4 py-2 text-gray-800 outline-none"
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
        >
          Search
        </button>
      </div>
    </form>
  );
};


export default SearchBox;