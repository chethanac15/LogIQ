export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatStatusLabel(value: string) {
  if (!value) {
    return "Unknown";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}
