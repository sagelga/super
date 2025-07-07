'use client';

import React from 'react';

interface FilterBarProps {
    categories?: string[];
    onSelectCategory?: (category: string) => void;
    selectedCategory?: string; // Added to highlight active category
}

const FilterBar: React.FC<FilterBarProps> = ({ categories = [], onSelectCategory, selectedCategory }) => {
    const baseClasses = "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200";
    const defaultClasses = "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
    const activeClasses = "bg-blue-600 text-white dark:bg-blue-500";

    return (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
                className={`${baseClasses} ${selectedCategory === 'All' ? activeClasses : defaultClasses}`}
                onClick={() => onSelectCategory && onSelectCategory('All')}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`${baseClasses} ${selectedCategory === category ? activeClasses : defaultClasses}`}
                    onClick={() => onSelectCategory && onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
