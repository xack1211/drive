import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const { data: session } = useSession();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Cloud Drive</h1>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {isDark ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
            {session ? (
              <button
                onClick={() => signOut()}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}