'use client';

import React from 'react';



interface FilterBarProps {
    categories?: string[];
    onSelectCategory?: (category: string) => void;
    selectedCategory?: string; // Added to highlight active category
}

const FilterBar: React.FC<FilterBarProps> = ({ categories = [], onSelectCategory, selectedCategory }) => {
    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                onClick={() => onSelectCategory && onSelectCategory('All')}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                    onClick={() => onSelectCategory && onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
