import fs from 'fs';
import path from 'path';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const filePath = path.join(process.env.LOCAL_STORAGE_PATH || '.', req.query.path);
    
    // Security check to prevent directory traversal
    if (!filePath.startsWith(process.env.LOCAL_STORAGE_PATH || '.')) {
      throw new Error('Invalid file path');
    }

    const fileStream = fs.createReadStream(filePath);
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': stat.size,
      'Content-Disposition': `attachment; filename=${path.basename(filePath)}`
    });

    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}