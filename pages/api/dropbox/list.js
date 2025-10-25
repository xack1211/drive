import { Dropbox } from 'dropbox';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const dbx = new Dropbox({
      accessToken: session.dropboxToken
    });

    const response = await dbx.filesListFolder({
      path: req.query.path || '',
      limit: 100
    });

    res.status(200).json(response.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}