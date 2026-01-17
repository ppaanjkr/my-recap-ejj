export type VideoItem = {
  id: string;
  date?: string;                      
  title: string; 
  parentTitle: string;
  artists?: string;                         
  platform: string; 
  link: string; 
  thumbnail?: string;
};

export type VideoEpisode = VideoItem & {
  videoId?: string;
};

export type VideoSeries = {
  platform: string;
  parentTitle: string;
  episodes: VideoEpisode[];
};