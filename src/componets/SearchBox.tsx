'use client'; // যদি Next.js 13+ app directory ব্যবহার করো

import { useState } from "react";

interface SearchBoxProps {
  onSearch?: (query: string) => void; // Optional external handler
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto  px-4">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-red-500">
        <input
          type="text"
          placeholder="Search YouTube videos..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-grow px-4 py-1text-gray-800 outline-none"
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
