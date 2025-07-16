import React from 'react';
import Link from 'next/link';


// Define the interface for a single sidebar item
interface SidebarItem {
    title: string; // The display title of the sidebar item
    path: string; // The path (URL) associated with the sidebar item
    children?: SidebarItem[]; // Optional array of child sidebar items for nested navigation
}

// Define the props interface for the DocsSidebar component
interface DocsSidebarProps {
    items: SidebarItem[]; // An array of sidebar items to display
    currentPath: string; // The current path to highlight the active item
}

// DocsSidebar functional component responsible for rendering the documentation sidebar
const DocsSidebar: React.FC<DocsSidebarProps> = ({ items, currentPath }) => {
    return (
        <aside className="w-64 bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Documentation</h3>
            <nav>
                <ul>
                    {/* Map through the main sidebar items */}
                    {items.map((item) => (
                        <li key={item.path} className="mb-2">
                            <Link
                                href={item.path}
                                className={`block hover:text-blue-600 ${currentPath === item.path ? 'font-bold text-blue-600' : ''
                                    }`}
                            >
                                {item.title}
                            </Link>
                            {/* Render nested children if they exist */}
                            {item.children && item.children.length > 0 && (
                                <ul className="ml-4 mt-1">
                                    {item.children.map((child) => (
                                        <li key={child.path} className="mb-1">
                                            <Link
                                                href={child.path}
                                                className={`block text-sm hover:text-blue-600 ${currentPath === child.path ? 'font-bold text-blue-600' : ''
                                                    }`}
                                            >
                                                {child.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default DocsSidebar;