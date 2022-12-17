/**
 * Function with GET method to create header based on parameters
 * If accessToken is true, return with authorization.
 * @param {string} accessToken accessToken
 */
export function createStandardHeader(accessToken) {
  if (accessToken) {
    return {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }
  return {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
}

/**
 * Function with POST method to create header based on parameters with input values.
 * If accessToken is true, return with authorization.
 * @param {object} values Input values
 * @param {string} accessToken AccessToken
 */
export function createHeaderWithInputs(values, accessToken) {
  if (accessToken) {
    return {
      method: "POST",
      body: JSON.stringify({ ...values }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }
  return {
    method: "POST",
    body: JSON.stringify({ ...values }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
}

/**
 * Function with PUT method to create header based on parameters with input values.
 * If accessToken is true, return with authorization.
 * @param {object} values Input values
 * @param {string} accessToken AccessToken
 */
export function editProfile(values, accessToken) {
  return {
    method: "PUT",
    body: JSON.stringify({ ...values }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
    },
  };
}
