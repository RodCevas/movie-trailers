export interface Movie {
  id: string;
  youtube_video_id: string;
  youtube_channel_id: string;
  youtube_thumbnail: string;
  title: string;
  url: string;
  thumbnail: string;
  language: string;
  categories: string[];
  genres: string[];
  published: string;
  views: number;
}

export interface Metadata {
  limit: number;
  page: number;
  total_pages: number;
  total_count: number;
}
