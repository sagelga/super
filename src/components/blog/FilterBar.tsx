'use client';

import React from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
    categories?: string[];
    onSelectCategory?: (category: string) => void;
    selectedCategory?: string; // Added to highlight active category
}

const FilterBar: React.FC<FilterBarProps> = ({ categories = [], onSelectCategory, selectedCategory }) => {
    return (
        <div className={styles.filterBarContainer}>
            <button
                className={`${styles.baseButton} ${selectedCategory === 'All' ? styles.activeButton : styles.defaultButton}`}
                onClick={() => onSelectCategory && onSelectCategory('All')}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`${styles.baseButton} ${selectedCategory === category ? styles.activeButton : styles.defaultButton}`}
                    onClick={() => onSelectCategory && onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
