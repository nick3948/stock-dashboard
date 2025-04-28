import React from 'react';

function Navbar({ searchQuery, setSearchQuery }) {
  return (
    <nav className="flex justify-between items-center p-4 bg-indigo-600 text-white shadow-md">
      <h1 className="text-2xl font-bold">Stock Dashboard</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search symbol"
          className="p-2 pl-4 pr-10 rounded-md text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
            onClick={() => setSearchQuery('')}
          >
            ✖️
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;