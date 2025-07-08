import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.brand}>
                    Kunanon Srisuntiroj
                </Link>
                <div>
                    <Link href="/" className={styles.navLink}>
                        Home
                    </Link>
                    <Link href="/blog" className={styles.navLink}>
                        Blog
                    </Link>
                    <Link href="/gallery" className={styles.navLink}>
                        Gallery
                    </Link>
                    <Link href="/docs" className={styles.navLink}>
                        Docs
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
