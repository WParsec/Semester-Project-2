// Get all listings
export function createStandardHeader() {
  return {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
}

// Get all listings
export function createHeaderWithInputs(values) {
  return {
    method: "POST",
    body: JSON.stringify({ ...values }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
}
