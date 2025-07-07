import React from 'react';
import Link from 'next/link';

interface SidebarItem {
    title: string;
    path: string;
    children?: SidebarItem[];
}

interface DocsSidebarProps {
    items: SidebarItem[];
    currentPath: string;
}

const DocsSidebar: React.FC<DocsSidebarProps> = ({ items, currentPath }) => {
    return (
        <aside className="w-64 p-4 border-r bg-gray-50">
            <h3 className="text-xl font-semibold mb-4">Documentation</h3>
            <nav>
                <ul>
                    {items.map((item) => (
                        <li key={item.path} className="mb-2">
                            <Link
                                href={item.path}
                                className={`block hover:text-blue-600 ${currentPath === item.path ? 'font-bold text-blue-600' : ''
                                    }`}
                            >
                                {item.title}
                            </Link>
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
