import express from 'express';

const app = express();
app.use(express.json());

let runtimeCustomKey = 'qxnOrKjHBf8dGB042C2BjFsK3xJHQJ4zvNca0JdLRMNwvJY2dZChqMdl';

// Helper to obtain active Pexels API key
const getApiKey = (req: express.Request): string => {
  const clientKey = req.headers['x-pexels-api-key'] as string;
  if (clientKey && clientKey.trim().length > 5) {
    return clientKey.trim();
  }
  if (runtimeCustomKey && runtimeCustomKey.trim().length > 5) {
    return runtimeCustomKey.trim();
  }
  return (process.env.PEXELS_API_KEY || '').trim();
};

// API Status & Configuration Endpoint
app.get('/api/pexels/status', (req, res) => {
  const key = getApiKey(req);
  const hasKey = key.length > 5;
  const masked = hasKey ? `${key.substring(0, 4)}...${key.substring(key.length - 4)}` : '';
  res.json({
    hasKey,
    keyMasked: masked,
    status: hasKey ? 'connected' : 'unconfigured_fallback_active',
    message: hasKey
      ? 'Pexels Live API Connected'
      : 'Running in High-Fidelity Curated Mode. Add your free Pexels API key in Settings or .env to search 3M+ live visuals.'
  });
});

app.post('/api/pexels/set-key', (req, res) => {
  const { apiKey } = req.body;
  if (typeof apiKey === 'string') {
    runtimeCustomKey = apiKey.trim();
    res.json({ success: true, hasKey: runtimeCustomKey.length > 5 });
  } else {
    res.status(400).json({ error: 'Invalid API key format' });
  }
});

// Proxy: Photos Curated
app.get('/api/pexels/curated', async (req, res) => {
  const apiKey = getApiKey(req);
  const page = req.query.page || '1';
  const per_page = req.query.per_page || '30';

  if (!apiKey) {
    return res.status(200).json({
      fallback: true,
      source: 'curated_seed',
      page: Number(page),
      per_page: Number(per_page),
      photos: [],
      total_results: 0,
      message: 'No Pexels API key configured'
    });
  }

  try {
    const url = `https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': apiKey,
        'User-Agent': 'VisualFlow-Applet/1.0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `Pexels API error: ${response.statusText}`,
        status: response.status,
        details: errorText
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch curated photos from Pexels API', details: err?.message });
  }
});

// Proxy: Photos Search
app.get('/api/pexels/search', async (req, res) => {
  const apiKey = getApiKey(req);
  const query = req.query.query as string;
  const page = req.query.page || '1';
  const per_page = req.query.per_page || '30';
  const orientation = req.query.orientation as string;
  const size = req.query.size as string;
  const color = req.query.color as string;

  if (!query) {
    return res.status(400).json({ error: 'Search query parameter is required' });
  }

  if (!apiKey) {
    return res.status(200).json({
      fallback: true,
      source: 'search_seed',
      page: Number(page),
      per_page: Number(per_page),
      photos: [],
      total_results: 0,
      message: 'No Pexels API key configured'
    });
  }

  try {
    const params = new URLSearchParams();
    params.append('query', query);
    params.append('page', String(page));
    params.append('per_page', String(per_page));
    if (orientation && orientation !== 'all') params.append('orientation', orientation);
    if (size && size !== 'all') params.append('size', size);
    if (color && color !== 'all') params.append('color', color);

    const url = `https://api.pexels.com/v1/search?${params.toString()}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': apiKey,
        'User-Agent': 'VisualFlow-Applet/1.0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `Pexels API error: ${response.statusText}`,
        status: response.status,
        details: errorText
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to search photos from Pexels API', details: err?.message });
  }
});

// Proxy: Videos Popular
app.get('/api/pexels/videos/popular', async (req, res) => {
  const apiKey = getApiKey(req);
  const page = req.query.page || '1';
  const per_page = req.query.per_page || '24';
  const min_width = req.query.min_width;
  const min_duration = req.query.min_duration;
  const max_duration = req.query.max_duration;

  if (!apiKey) {
    return res.status(200).json({
      fallback: true,
      source: 'videos_seed',
      page: Number(page),
      per_page: Number(per_page),
      videos: [],
      total_results: 0,
      message: 'No Pexels API key configured'
    });
  }

  try {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('per_page', String(per_page));
    if (min_width) params.append('min_width', String(min_width));
    if (min_duration) params.append('min_duration', String(min_duration));
    if (max_duration) params.append('max_duration', String(max_duration));

    const url = `https://api.pexels.com/videos/popular?${params.toString()}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': apiKey,
        'User-Agent': 'VisualFlow-Applet/1.0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `Pexels API error: ${response.statusText}`,
        status: response.status,
        details: errorText
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch popular videos from Pexels API', details: err?.message });
  }
});

// Proxy: Videos Search
app.get('/api/pexels/videos/search', async (req, res) => {
  const apiKey = getApiKey(req);
  const query = req.query.query as string;
  const page = req.query.page || '1';
  const per_page = req.query.per_page || '24';
  const orientation = req.query.orientation as string;
  const size = req.query.size as string;

  if (!query) {
    return res.status(400).json({ error: 'Search query parameter is required' });
  }

  if (!apiKey) {
    return res.status(200).json({
      fallback: true,
      source: 'videos_search_seed',
      page: Number(page),
      per_page: Number(per_page),
      videos: [],
      total_results: 0,
      message: 'No Pexels API key configured'
    });
  }

  try {
    const params = new URLSearchParams();
    params.append('query', query);
    params.append('page', String(page));
    params.append('per_page', String(per_page));
    if (orientation && orientation !== 'all') params.append('orientation', orientation);
    if (size && size !== 'all') params.append('size', size);

    const url = `https://api.pexels.com/videos/search?${params.toString()}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': apiKey,
        'User-Agent': 'VisualFlow-Applet/1.0'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `Pexels API error: ${response.statusText}`,
        status: response.status,
        details: errorText
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to search videos from Pexels API', details: err?.message });
  }
});

// Proxy: Single Photo by ID
app.get('/api/pexels/photos/:id', async (req, res) => {
  const apiKey = getApiKey(req);
  const { id } = req.params;

  if (!apiKey) {
    return res.status(404).json({ error: 'No Pexels API key' });
  }

  try {
    const url = `https://api.pexels.com/v1/photos/${id}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': apiKey,
        'User-Agent': 'VisualFlow-Applet/1.0'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Photo not found' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch photo details', details: err?.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'VisualFlow', timestamp: new Date().toISOString() });
});

export default app;
