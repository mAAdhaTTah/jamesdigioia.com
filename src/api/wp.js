import axios from 'axios';
import { shared, server } from '../config';

const deepReplaceDomain = value => {
  // Ignore empty strings, null, undefined, functions, & numbers.
  if (!value || typeof value === 'number' || typeof value === 'function') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(deepReplaceDomain);
  }

  if (typeof value === 'object') {
    for (const key in value) {
      value[key] = deepReplaceDomain(value[key]);
    }
  }

  // Rewrite strings that don't point to the API.
  if (typeof value === 'string' && !value.includes('wp-json')) {
    return value.replaceAll(
      shared.WP_API_DOMAIN,
      shared.WP_API_DOMAIN.replace('backend.', ''),
    );
  }

  return value;
};

export const wp = axios.create({
  baseURL: `https://${shared.WP_API_DOMAIN}`,
});

wp.interceptors.request.use(value => {
  value.headers['Authorization'] = `Basic ${Buffer.from(
    `${server.WP_API_USERNAME}:${server.WP_API_PASSWORD}`,
    'binary',
  ).toString('base64')}`;

  return value;
});

wp.interceptors.response.use(value => {
  value.data = deepReplaceDomain(value.data);
  return value;
});
