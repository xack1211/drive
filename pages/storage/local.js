import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function LocalStoragePage() {
  const { data, error } = useSWR('/api/local/list', fetcher);

  if (error) return <div className="p-6">Failed to load local files: {error.message}</div>;
  if (!data) return <div className="p-6">Loading local files…</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Local Files</h1>
      <ul className="space-y-2">
        {data.files?.map((f) => (
          <li key={f.path} className="flex justify-between bg-white dark:bg-gray-800 p-3 rounded">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{f.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{f.type} — {f.size} bytes</div>
            </div>
            <div>
              <a href={`/api/local/download?path=${encodeURIComponent(f.path)}`} className="text-indigo-600 dark:text-indigo-400">Download</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
