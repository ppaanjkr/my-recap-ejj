"use client";

import type { Profile } from "@/types/profile";
import Badge from "../Badge";
import ProfileSocial from "./ProfileSocial";
import { useMemo, useState } from "react";
import { withBasePath } from "@/lib/basePath";

function getImage(profile: Profile, key: "avatar" | "cover") {
  return profile.ProfileImage?.find((x) => x.name === key)?.image || "";
}

function fullNameTH(p: Profile) {
  const nick = p.nicknameTH ? `(${p.nicknameTH})` : "";
  return `${p.firstnameTH} ${p.lastnameTH} ${nick}`.trim();
}

function fullNameEN(p: Profile) {
  const nick = p.nicknameEN ? `(${p.nicknameEN})` : "";
  return `${p.firstnameEN} ${p.lastnameEN} ${nick}`.trim();
}

type Props = {
  data: Profile;
};

export default function ProfileHeader({ data }: Props) {
  const cover = getImage(data, "cover");

  const defaultAvatar = useMemo(
    () => data.ProfileImage?.[0]?.image || "",
    [data.ProfileImage]
  );
  const [activeAvatar, setActiveAvatar] = useState(defaultAvatar);
  const avatar = activeAvatar;

  return (
    <header className="relative text-blackSoft">
      {/* cover */}
      <div className="relative h-40 md:h-50 overflow-hidden rounded-b-xl">
        {cover ? (
          <img src={withBasePath(cover)}  alt="cover" className="h-full w-full object-cover" />
        ) : (
          <div
            className={`h-full w-full bg-[linear-gradient(135deg,#FCDCEC_0%,#ffffff_45%,#FDD6E1_100%)]`}/>
        )}
        {/* decorations */}
        <div className="absolute top-4 left-6 text-lg opacity-80">✨</div>
        <div className="absolute top-4 right-6 text-lg opacity-80">🍒</div>
        {/* overlay fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30" />
      </div>

      {/* content */}
      <div className="relative px-4 pb-6">
        <div
          className="
            absolute -top-20
            left-1/2 -translate-x-1/2
            md:left-10 md:translate-x-0
          "
        >
          <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-md flex items-center justify-center bg-pinkSoft">
            {avatar ? (
              <img
                src={withBasePath(avatar)}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-5xl">🍓</span>
            )}
          </div>
        </div>

        {/* title group */}
        {data.ProfileImage?.length ? (
          <div className="flex justify-center pt-24 md:pt-3 md:justify-end gap-2 flex-wrap md:pr-6">
            {data.ProfileImage.map((t) => (
              <Badge
                key={t.name}
                title={t.name}
                active={avatar === (t.image || "")}
                onClick={() => setActiveAvatar(t.image || "")}
              />
            ))}
          </div>
        ) : null}

        {/* names */}
        <div className="mt-5 md:mt-16 text-center md:text-left md:px-10">
          <h1 className="text-2xl font-extrabold">{fullNameTH(data)}</h1>
          <p className="font-semibold">{fullNameEN(data)}</p>

          {/* hashtags*/}
          {data.hashtag?.length ? (
            <div className="mt-1 flex flex-wrap justify-center md:justify-start gap-2">
              {data.hashtag.map((t) => (
                <span key={t} className="text-xs">
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {/* social links */}
          {(data.SocialLink?.facebook ||
            data.SocialLink?.instagram ||
            data.SocialLink?.thread ||
            data.SocialLink?.tiktok ||
            data.SocialLink?.twitter) && (
            <ProfileSocial
              urlInstagram={data.SocialLink?.instagram}
              urlFacebook={data.SocialLink?.facebook}
              urlThread={data.SocialLink?.thread}
              urlTwitter={data.SocialLink?.twitter}
              urlTiktok={data.SocialLink?.tiktok}
            />
          )}
        </div>
      </div>
    </header>
  );
}
