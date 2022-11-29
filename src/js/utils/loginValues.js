// Function for creating loginValues from the variable values
export function createLoginValues(values) {
  delete values.name;
  return values;
}
