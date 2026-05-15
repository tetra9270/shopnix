export const getImageUrl = (url) => {
    if (!url) return '/images/sample.jpg';
    if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('blob:')) return url;
    if (url.startsWith('/uploads')) return `http://localhost:5000${url}`;
    return url;
};
