// export type Music = {
//     id?: string;
//     date?: string;
//     type?: string | "ost" | "cover" | "single";
//     title?: string;
//     artists?: string | "june" | "enjoy";
//     url?: string;
//     coverImage?: string;
// }
export type MusicRaw = {
  date?: string;
  type?: "ost" | "cover" | "single" | string;
  title?: string;
  artists?: string;
  url?: string;
  coverImage?: string;
};

export type MusicItem = {
  id: string;
  date?: string;                      
  type: string; 
  title: string;
  artist?: string;            
  thumbnail?: string;                 
  platform: string; 
  link: string; 
};
