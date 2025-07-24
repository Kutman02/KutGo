export function searchParamsYoutube(url) {
  const videoUrl = new URL(url);
  const paramUrl = videoUrl.searchParams.get('v');
  return paramUrl;
}
