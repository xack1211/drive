import fs from 'fs/promises';
import path from 'path';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const dirPath = req.query.path || process.env.LOCAL_STORAGE_PATH || '.';
    const items = await fs.readdir(dirPath, { withFileTypes: true });

    const files = await Promise.all(
      items.map(async (item) => {
        const fullPath = path.join(dirPath, item.name);
        const stats = await fs.stat(fullPath);

        return {
          name: item.name,
          path: fullPath,
          type: item.isDirectory() ? 'folder' : 'file',
          size: stats.size,
          modifiedTime: stats.mtime
        };
      })
    );

    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}