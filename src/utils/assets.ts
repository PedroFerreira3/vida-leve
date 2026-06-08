export function getAssetPath(path: string) {
  if (!path) {
    return "";
  }

  if (/^(https?:|data:|blob:)/.test(path)) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const normalizedPath = path.replace(/^\/+/, "");

  return `${baseUrl}${normalizedPath}`;
}
