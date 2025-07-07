import React from 'react';

interface FilterBarProps {
    // Add props for filtering logic if needed
}

const FilterBar: React.FC<FilterBarProps> = () => {
    return (
        <div className="flex justify-center space-x-4 mb-8">
            <button className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">All</button>
            <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300">Technology</button>
            <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300">Web Development</button>
            <button className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300">Design</button>
        </div>
    );
};

export default FilterBar;
