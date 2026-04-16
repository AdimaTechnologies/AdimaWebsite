const { connectLambda, getStore } = require('@netlify/blobs');

/** Must match MIN_VISITOR_DISPLAY in ClosingSection.tsx */
const MIN_BASELINE = 7600;
const STORE_NAME = 'adima-site-visitors';
const COUNT_KEY = 'total';

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: jsonHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: jsonHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    if (event.blobs) {
      connectLambda(event);
    }

    const store = getStore(STORE_NAME);
    const previous = await store.get(COUNT_KEY, { type: 'json' });
    let count =
      typeof previous === 'number' && Number.isFinite(previous) ? previous : MIN_BASELINE;
    count += 1;
    await store.setJSON(COUNT_KEY, count);

    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({ totalCount: count }),
    };
  } catch (err) {
    console.error('record-visit:', err);
    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({ totalCount: MIN_BASELINE }),
    };
  }
};
