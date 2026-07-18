export function getCurrentRole() {
  const token = localStorage.getItem("token");
  let role;

  try {
    const payload = token?.split(".")[1];
    const paddedPayload = payload?.padEnd(Math.ceil(payload.length / 4) * 4, "=");
    role = paddedPayload && JSON.parse(atob(paddedPayload.replace(/-/g, "+").replace(/_/g, "/"))).role;
  } catch {
    role = null;
  }

  const normalizedRole = String(role || localStorage.getItem("role") || "")
    .replace(/^ROLE_/, "")
    .trim()
    .toUpperCase();

  return normalizedRole === "USER" ? "VIEWER" : normalizedRole;
}
