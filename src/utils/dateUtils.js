export function formatDateValue(dateValue) {
  if (!dateValue) {
    return "Not set";
  }

  const date = new Date(`${dateValue}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getStoredRequestData() {
  const rawData = window.localStorage.getItem("date-request-data");
  if (!rawData) {
    return null;
  }

  try {
    return JSON.parse(rawData);
  } catch {
    return null;
  }
}

export function persistRequestData(data) {
  window.localStorage.setItem("date-request-data", JSON.stringify(data));
}
