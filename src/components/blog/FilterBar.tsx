'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

// Define the props interface for the FilterBar component
interface FilterBarProps {
    categories?: string[]; // Optional array of category strings
    onSelectCategory?: (category: string) => void; // Optional callback function for category selection
    selectedCategory?: string; // Optional prop to highlight the active category
}

// FilterBar functional component
const FilterBar: React.FC<FilterBarProps> = ({ categories = [], onSelectCategory, selectedCategory }) => {
    const t = useTranslations('common');
    return (
        <div className="mb-8 overflow-x-auto px-4 pb-4">
            <div className="flex gap-2 justify-start whitespace-nowrap">
            {/* Button for 'All' category */}
            <button
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                onClick={() => onSelectCategory && onSelectCategory('All')}
            >
                {t('blog.all_categories')}
            </button>
            {/* Map through the categories and render a button for each */}
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
        </div>
    );
};

export default FilterBar;
