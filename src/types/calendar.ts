export type CalendarItem = {
  id: string;          // generate 
  date: string;
  title: string;
  desc?: string;
  images?: string[];
  artists?: string[];
  meeting?: boolean;
  keyword?: string;
  hashtag?: string[];
  urlYoutube?: string;
  urlFacebook?: string;
  urlInstagram?: string;
  urlTwitter?: string;
  urlTiktok?: string;
};
