import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-500 dark:text-gray-300 mt-2">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Go back home
      </Link>
    </div>
  );
}
