import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function DropboxPage() {
  const { data, error } = useSWR('/api/dropbox/list', fetcher);

  if (error) return <div className="p-6">Failed to load Dropbox: {error.message}</div>;
  if (!data) return <div className="p-6">Loading Dropbox…</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dropbox</h1>
      <ul className="space-y-2">
        {data.entries?.map((f) => (
          <li key={f.id || f.path_lower} className="flex justify-between bg-white dark:bg-gray-800 p-3 rounded">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{f.name || f.path_display}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{f['.tag']}</div>
            </div>
            <div>
              {/* No direct download link implemented here; requires Dropbox API /shared_links/create or /files/download */}
              <span className="text-gray-400">—</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
