export function getDevice(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)/.test(ua)) return "tablet";
  if (/mobi|android|iphone|ipod|blackberry|opera mini|iemobile/.test(ua)) return "mobile";
  if (ua.includes("android") && !ua.includes("mobi")) return "tablet";
  return "desktop";
}

export function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera/")) return "Opera";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
  if (ua.includes("Firefox/")) return "Firefox";
  return "Unknown";
}

export function collectTrackingData() {
  return {
    device: getDevice(),
    browser: getBrowser(),
    screen_size: `${screen.width}x${screen.height}`,
    language: navigator.language,
    referrer: document.referrer || "",
  };
}
