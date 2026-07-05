export function parseVideoUrl(url) {
  if (!url?.trim()) return null;

  const value = url.trim();

  if (value.startsWith('/api/media/')) {
    return { type: 'file', src: value };
  }

  const youtubeMatch = value.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (youtubeMatch) {
    return {
      type: 'youtube',
      src: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&rel=0`,
    };
  }

  const vimeoMatch = value.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return {
      type: 'vimeo',
      src: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  if (/\.(mp4|webm|ogg)(\?|$)/i.test(value) || value.startsWith('/uploads/')) {
    return { type: 'file', src: value };
  }

  return { type: 'file', src: value };
}