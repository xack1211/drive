import { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';

export default function SignIn() {
  const [providers, setProviders] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    getProviders().then((p) => setProviders(p));
  }, []);

  const handleCredentials = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await signIn('credentials', { redirect: false, username, password });
    if (res?.error) setError(res.error);
    if (res?.ok) window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Choose a provider or use credentials</p>
        </div>

        <form onSubmit={handleCredentials} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600" />
          </div>
          <div>
            <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white">Sign in with credentials</button>
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
        </form>

        <div className="mt-6 space-y-3">
          {providers && Object.values(providers).filter(p => p.id !== 'credentials').map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id)}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>For demo credentials, use username: <code className="bg-gray-100 px-1 rounded dark:bg-gray-700">demo</code> and password: <code className="bg-gray-100 px-1 rounded dark:bg-gray-700">demo</code>.</p>
        </div>
      </div>
    </div>
  );
}
