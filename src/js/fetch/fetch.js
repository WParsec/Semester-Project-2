/**
 * A fetch that can be used multiple places.
 * @param {string} url
 * @param {string} body
 * @returns response object
 */
export async function standardFetch(url, body) {
  const response = await fetch(url, body);
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
}
