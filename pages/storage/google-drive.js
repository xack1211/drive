import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function GoogleDrivePage() {
  const { data, error } = useSWR('/api/drive/list', fetcher);

  if (error) return <div className="p-6">Failed to load Google Drive: {error.message}</div>;
  if (!data) return <div className="p-6">Loading Google Drive…</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Google Drive</h1>
      <ul className="space-y-2">
        {data.files?.map((f) => (
          <li key={f.id} className="flex justify-between bg-white dark:bg-gray-800 p-3 rounded">
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{f.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{f.mimeType} — {f.size || '—'}</div>
            </div>
            <div>
              <a href={`https://drive.google.com/uc?id=${f.id}&export=download`} className="text-indigo-600 dark:text-indigo-400">Download</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
