"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './TopMenu.module.css';

function TopMenu() {
	const pathname = usePathname();
	return ( 
		<div className={styles.search}>
			<Link href="/" className={pathname === '/' ? styles.active : ''}>Create</Link>
			<Link href="/wallet" className={pathname === '/manage' ? styles.active : ''}>Manage</Link>
			<Link href="/orders" className={pathname === '/wallet' ? styles.active : ''}>Wallet</Link>
			<Link href="/info" className={pathname === '/info' ? styles.active : ''}>Info</Link>
			<Link href="/favorites" className={pathname === '/statistics' ? styles.active : ''}>Statistics</Link>
		</div>
	);
}

export default TopMenu;