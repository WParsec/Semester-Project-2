// Get all listings
export function createStandardHeader() {
  return {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
}
