// Get all listings
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

// POST with inputs
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

// PUT change avatar
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
