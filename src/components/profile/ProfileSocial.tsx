type Props = {
  urlYoutube?: string;
  urlFacebook?: string;
  urlInstagram?: string;
  urlTwitter?: string;
  urlTiktok?: string;
  urlThread?: string;
};

const ICON_CLASS =
  "h-11 w-11 rounded-xl border border-pinkLight bg-white flex items-center justify-center " +
  "hover:bg-pinkSoft hover:-translate-y-0.5 hover:shadow-md transition-all duration-200";

const IMG_CLASS = "h-5 w-5 object-contain";

export default function ProfileSocial({
  urlYoutube,
  urlFacebook,
  urlInstagram,
  urlTwitter,
  urlTiktok,
  urlThread
}: Props) {
  if (
    !urlYoutube &&
    !urlFacebook &&
    !urlInstagram &&
    !urlTwitter &&
    !urlTiktok &&
    !urlThread
  ) {
    return null;
  }

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {urlYoutube && (
          <a
            href={urlYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className={ICON_CLASS}
            title="YouTube"
          >
            <img src={"/social/youtube.png"} alt="YouTube" className={IMG_CLASS} /> 
          </a>
        )}

        {urlTwitter && (
          <a
            href={urlTwitter}
            target="_blank"
            rel="noopener noreferrer"
            className={ICON_CLASS}
            title="Twitter / X"
          >
            <img src={"/social/twitter.png"} alt="Twitter" className={IMG_CLASS} />
          </a>
        )}

        {urlInstagram && (
          <a
            href={urlInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className={ICON_CLASS}
            title="Instagram"
          >
            <img
              src={"/social/instagram.png"}
              alt="Instagram"
              className={IMG_CLASS}
            />
          </a>
        )}

        {urlThread && (
          <a
            href={urlThread}
            target="_blank"
            rel="noopener noreferrer"
            className={ICON_CLASS}
            title="urlThread"
          >
            <img
              src={"/social/threads.png"}
              alt="Threads"
              className={IMG_CLASS}
            />
          </a>
        )}

        {urlTiktok && (
          <a
            href={urlTiktok}
            target="_blank"
            rel="noopener noreferrer"
            className={ICON_CLASS}
            title="TikTok"
          >
            <img src={"/social/tiktok.png"} alt="TikTok" className={IMG_CLASS} />
          </a>
        )}

        {urlFacebook && (
          <a
            href={urlFacebook}
            target="_blank"
            rel="noopener noreferrer"
            className={ICON_CLASS}
            title="Facebook"
          >
            <img src={"/social/facebook.png"} alt="Facebook" className={IMG_CLASS} />
          </a>
        )}

      </div>
    </div>
  );
}
