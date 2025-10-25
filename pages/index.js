import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  FolderIcon,
  CloudIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';

const storageOptions = [
  {
    name: 'Local Storage',
    icon: FolderIcon,
    href: '/storage/local',
    description: 'Access files from your local machine',
  },
  {
    name: 'Google Drive',
    icon: CloudIcon,
    href: '/storage/google-drive',
    description: 'Connect and manage your Google Drive files',
  },
  {
    name: 'Dropbox',
    icon: CloudIcon,
    href: '/storage/dropbox',
    description: 'Access your Dropbox files seamlessly',
  },
  {
    name: 'Raspberry Pi',
    icon: ServerIcon,
    href: '/storage/raspi',
    description: 'Connect to your Raspberry Pi storage',
  },
];

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome to Cloud Drive
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Please sign in to continue
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Choose Your Storage
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Access and manage your files from multiple storage providers
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {storageOptions.map((option) => (
              <motion.div
                key={option.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={option.href}
                  className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-800 rounded-md">
                    <option.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white text-center">
                    {option.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                    {option.description}
                  </p>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}