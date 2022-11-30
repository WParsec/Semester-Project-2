export function formatDate(raw) {
  const date = new Date(raw);
  const currentDate = new Date();
  if (date === currentDate) {
    return "Today at" + date.toLocaleTimeString();
  }
  if (date < currentDate) {
    return "Expired";
  }
  return "Ends at: " + date.toLocaleDateString();
}
