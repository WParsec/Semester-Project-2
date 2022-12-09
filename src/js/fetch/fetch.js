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
  throw new Error(data.errors[0].message);
}

/**
 * A fetch that can be used multiple places.
 * @param {string} url
 * @param {string} body
 * @returns response object
 */
export async function loginFetch(url, body) {
  const response = await fetch(url, body);
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    const { name, accessToken, credits } = data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("usernameGavelbay", name);
    localStorage.setItem("credits", credits);
    window.location.href = "../../../dist/index.html";
    return data;
  }
  throw new Error(data.errors[0].message);
}
