export function formatDate(raw) {
  const date = new Date(raw);
  const currentDate = new Date();
  if (date.toLocaleDateString() === currentDate.toLocaleDateString()) {
    return "Today at " + date.toLocaleTimeString() + " Local time";
  }
  if (date < currentDate) {
    return "Expired";
  }
  return date.toLocaleDateString() + " At " + date.toLocaleTimeString();
}
