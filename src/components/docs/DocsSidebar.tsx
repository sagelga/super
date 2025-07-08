import React from 'react';
import Link from 'next/link';
import styles from './DocsSidebar.module.css';

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
        <aside className={styles.sidebar}>
            <h3 className={styles.heading}>Documentation</h3>
            <nav>
                <ul>
                    {items.map((item) => (
                        <li key={item.path} className={styles.linkItem}>
                            <Link
                                href={item.path}
                                className={`${styles.link} ${currentPath === item.path ? styles.activeLink : ''
                                    }`}
                            >
                                {item.title}
                            </Link>
                            {item.children && item.children.length > 0 && (
                                <ul className={styles.childList}>
                                    {item.children.map((child) => (
                                        <li key={child.path} className={styles.childLinkItem}>
                                            <Link
                                                href={child.path}
                                                className={`${styles.childLink} ${currentPath === child.path ? styles.activeLink : ''
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