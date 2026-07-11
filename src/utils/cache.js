const cache = new Map();

const setCache = (key, data, ttl = 60000) => {
  cache.set(key, data);

  setTimeout(() => {
    cache.delete(key);
  }, ttl);
};

const getCache = (key) => {
  return cache.get(key);
};

const clearCache = (key) => {
  cache.delete(key);
};

module.exports = {
  setCache,
  getCache,
  clearCache,
};