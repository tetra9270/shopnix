// Returns a fully-qualified image URL regardless of environment.
// - Cloudinary / external URLs (http/https) → returned as-is
// - blob: / data: (local previews) → returned as-is
// - Legacy /uploads paths (old local disk uploads) → prefixed with API base URL
// - Anything else → returned as-is
const API_BASE = import.meta.env.VITE_API_URL || '';

export const getImageUrl = (url) => {
    if (!url) return '/images/sample.jpg';
    if (url.startsWith('http') || url.startsWith('https') || url.startsWith('data:') || url.startsWith('blob:')) return url;
    if (url.startsWith('/uploads')) return `${API_BASE}${url}`;
    return url;
};
