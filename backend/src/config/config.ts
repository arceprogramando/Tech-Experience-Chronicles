export const PORT = process.env.PORT || '3000';
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
export const JWT_SECRET_KEY =
  process.env.JWT_SECRET_KEY || 'default_secret_key';

export default {
  CORS_ORIGIN,
  JWT_SECRET_KEY,
};
